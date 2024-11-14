import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;
let isConnected = false;

export function initSocket(imageGameInfo, setImageGameInfo, processImageGameInfo, setIsDisconnect) {
    if (client != null) return;

    const sockJS = new SockJS('http://192.168.219.100/connect');

    client = new Client({
        webSocketFactory: () => sockJS,
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 300000,
        heartbeatIncoming : 10000,
        heartbeatOutgoing : 10000
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
        setIsDisconnect(true);
    };

    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    client.onWebSocketClose = function(evt) {
        isConnected = false;
        console.log(evt);
        setIsDisconnect(true);
    };

    client.activate();

    return () => {
        if (client) {
            client.deactivate()
                .then(() => {
                    console.log('Disconnected from server');
                    setIsDisconnect(true);
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
        console.log("Disconnected from server while guessing the answer.");
        window.location.href = "/";
    }
}

export function retry() {
    if (client && isConnected) {
        client.publish({
            destination: '/image-game/retry',
        });
    } else {
        console.log("Disconnected from server while retrying.");
        window.location.href = "/";
    }
}

export function goNextStage () {
    if (client && isConnected) {
        client.publish({
            destination: '/image-game/next'
        });
    } else {
        console.log("Disconnected from server while moving to the next.");
        window.location.href = "/";
    }
}

function processGuessResult(response, setImageGameInfo) {
        setImageGameInfo(prevState => ({
            ...prevState,
            gameInfo : response.gameInfo,
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
            ,letters :
                prevState.letters.map(letterInfo =>
                    letterInfo.letter === response.guessResult.input ? { letter : letterInfo.letter, correct : response.guessResult.answerIndexList.length > 0 } : letterInfo
                )
            ,imgHistory : response.statusInfo.levelUp ? [] : [...prevState.imgHistory]
        }));
}

function processRetryResult(response, setImageGameInfo) {
    setImageGameInfo((prevState) => ({
        ...prevState,
            gameInfo : response.gameInfo
            ,guessInfo : {input : "" , wrongLetters : [], answerIndexList : []}
            ,questionInfo : response.questionInfo
            ,statusInfo : {
                correct : false,
                levelUp : false,
                clear : false,
                gameOver : false,
                share : false
            }
            , letters :
                prevState.letters.map(letterInfo => ({ letter : letterInfo.letter, correct : null}))
    }));
}