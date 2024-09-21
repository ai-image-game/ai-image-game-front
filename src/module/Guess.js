import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

let client = null;
let isConnected = false;
export function initSocket(imageGameInfo, setImageGameInfo) {
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

        client.subscribe('/user/queue/init', (message) => {
            const response = JSON.parse(message.body);
            console.log('Received message from server:', response);
        });

        client.subscribe('/user/queue/guess', (message) => {
            const response = JSON.parse(message.body);
            console.log('Received message from server:', response);
            receiveMessage(response, setImageGameInfo);
        });

        client.publish({
            destination: '/image-game/init',
            body: JSON.stringify(imageGameInfo),
        });
    };

    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };
    client.activate();

    return () => {
        if (client) {
            client.deactivate()
                .then(() => {
                    console.log('Disconnected from STOMP server');
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
    }
}

function receiveMessage(response, setImageGameInfo) {
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
                maskedAnswer : prevState.questionInfo.maskedAnswer.split('').map((char, index) => {
                    return response.guessResult.answerIndexList.includes(index) ? response.guessResult.input : char
                }).join('')
            }
            , letters :
                prevState.letters.map(letterInfo =>
                    letterInfo.letter === response.guessResult.input ? { letter : letterInfo.letter, correct : response.guessResult.answerIndexList.length > 0 } : letterInfo
                )
        }));
}