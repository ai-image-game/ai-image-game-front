import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;
let isConnected = false;

export function initSocket(imageGameInfo, setImageGameInfo, processImageGameInfo) {
    if (client != null) return;

    const sockJS = new SockJS('http://localhost/connect');

    client = new Client({
        webSocketFactory: () => sockJS,
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 5000,
    });

    client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        isConnected = true;

        client.subscribe('/user/queue/guess', (message) => {
            const response = JSON.parse(message.body);
            console.log('Received message from server:', response);
            processGuessResult(response, setImageGameInfo);
        });

        client.subscribe('/user/queue/next', (message) => {
            const response = JSON.parse(message.body);
            console.log('Received message from server:', response);
            processImageGameInfo(response);
        });

        client.subscribe('/user/queue/retry', (message => {
            const response = JSON.parse(message.body);
            processRetryResult(response, setImageGameInfo);
        }))

        client.publish({
            destination: '/image-game/init',
            body: JSON.stringify(imageGameInfo),
        });
    };

    client.onDisconnect = () => {
        isConnected = false;
        alert("DisConnected. This page will redirect first page.");
    };

    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    client.onWebSocketClose = function(evt) {
        isConnected = false;
        console.log(evt);
    };

    client.activate();

    return () => {
        if (client) {
            client.deactivate()
                .then(() => {
                    console.log('Disconnected from server');
                });
        }
    };
}

export function guess (guessInfo) {
    if (client && isConnected) {
        client.publish({
            destination: '/image-game/guess',
            body: JSON.stringify(guessInfo),
        });
    } else {
        alert("Disconnected from Server when guess answer");
        window.location.href = "/";
    }
}

export function retry() {
    if (client && isConnected) {
        client.publish({
            destination: '/image-game/retry',
        });
    } else {
        alert("Disconnected from Server when retry.");
        window.location.href = "/";
    }
}

export function goNextStage () {
    if (client && isConnected) {
        client.publish({
            destination: '/image-game/next'
        });
    } else {
        alert("Disconnected from Server when go to next");
        window.location.href = "/";
    }
}

function processGuessResult(response, setImageGameInfo) {
        setImageGameInfo(prevState => ({
            ...prevState,
            guessInfo : {
                ...prevState.guessInfo,
                input: response.guessResult.input,
                answerIndexList: response.guessResult.answerIndexList,
                wrongLetters: response.guessResult.wrongLetters
            }
            ,questionInfo : {
                ...prevState.questionInfo,
                maskedAnswer : response.questionInfo.maskedAnswer
            }
            ,statusInfo : response.statusInfo
            , letters :
                prevState.letters.map(letterInfo =>
                    letterInfo.letter === response.guessResult.input ? { letter : letterInfo.letter, correct : response.guessResult.answerIndexList.length > 0 } : letterInfo
                )
        }));
}

function processRetryResult(response, setImageGameInfo) {
    setImageGameInfo((prev) => ({
        ...prev,
            gameInfo : response,
            statusInfo : {
                correct : false,
                levelUp : false,
                clear : false,
                gameOver : false,
                share : false
            }
    }));
}

export function disconnect() {
    if (client && isConnected) {
        client.deactivate().then(r => {
            window.location.href = "/"
        });
    }
}
