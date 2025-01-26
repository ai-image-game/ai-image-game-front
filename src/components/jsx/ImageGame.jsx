import { useState, useEffect, useRef } from 'react';
import { initSocket, goNextStage } from '../../common/Websocket';
import { initGuessInfo, initLetters } from '../../common/InitImageGame';
import { Luckiest_Guy } from 'next/font/google'
import Info from './Info.jsx';
import ImageArea from './ImageArea.jsx';
import GuessResult from './GuessResult.jsx';
import HangManArea from './HangMan.jsx';
import AlphabetInput from './AlphabetInput.jsx';
import Footer from './Footer';
import Share from './Share.jsx'
import styles from '../css/App.module.css';
import { changeCookie } from "./CookieBanner";

const luckiestGuyFont = Luckiest_Guy({
    weight : "400",
    subsets : ["latin"]
});

export default function ImageGame({imageGame, currentUrl, serverUrl, isMobile, analyticsCookies}) {
    const initRef = useRef(false);
    const [isDisconnect, setIsDisconnect] = useState (false);
    const [ imageGameInfo, setImageGameInfo ] = useState( {
        gameInfo : { level : 1, questions : 10, corrects : 0, retry : 3 },
        imageInfo : { uuid : "", mobileImage : "", pcImage : "", snsImage : "" },
        questionInfo : { maskedAnswer : "", prefix : null, postfix : null },
        guessInfo : initGuessInfo(),
        letters : initLetters(),
        statusInfo : { correct : false, levelUp : false, clear : false, gameOver : false, share : false },
        imgHistory : [],
        version : 1
    });
    const shareUrl = currentUrl.includes("?id=") ? `${currentUrl}` : `${currentUrl}?id=${imageGameInfo.imageInfo.uuid}`;

    useEffect(() => {
        if (initRef.current) return;
        processImageGameInfo(imageGame);
        initSocket(serverUrl, imageGame, setImageGameInfo, processImageGameInfo, setIsDisconnect);
        initRef.current = true;
    }, []);

    function processImageGameInfo(response) {
        setImageGameInfo((prevState) => {
            if (prevState.imgHistory.includes(response.imageInfo.uuid)) {
                console.log("refreshed.");
                goNextStage();
                return prevState;
            }

            return {
                ...prevState,
                ...response,
                statusInfo : {
                    levelUp : response.statusInfo.levelUp,
                    clear : response.statusInfo.clear,
                    correct : false,
                    gameOver : false,
                    share : false
                },
                guessInfo : response.guessResult === undefined || response.guessResult === null ?  initGuessInfo(response) : response.guessResult,
                letters : response.letters === undefined ? initLetters(response) : response.letters,
                imgHistory : response.imgHistory === undefined ? [...prevState.imgHistory, response.imageInfo.uuid] : response.imgHistory
            }});
    }

    useEffect(() => {
        if (isDisconnect) {
            changeCookie(serverUrl, imageGameInfo);
        }
    }, [isDisconnect]);

    useEffect(() => {
        if (imageGameInfo.statusInfo.correct) {
            setTimeout( () => {
                if (currentUrl.includes("?id=")) {
                    window.location.href = "/";
                } else {
                    goNextStage();
                }
            }, 5000);
        }
        if (!currentUrl.includes("?id=")) {
            changeCookie(serverUrl, imageGameInfo);
        }
    }, [imageGameInfo.statusInfo.correct]);

    if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', (event) => {
            if (analyticsCookies) {
                window.gtag('event', 'close_game', {
                    'event_category': 'user_interaction',
                    'img_uuid': imageGameInfo.imageInfo.uuid,
                    'level': imageGameInfo.gameInfo.level
                });
            }
        });
    }

    return (
        <div className={styles.mainContent}>
            <div className={`${styles.gameTitle} ${luckiestGuyFont.className}`}>
                <h1 onClick={() => window.location.reload()}>AI IMAGE GAME</h1>
            </div>
            <div className={styles.gameArea}>
                <Info gameInfo={imageGameInfo.gameInfo}/>
                <ImageArea imageGameInfo={imageGameInfo} setImageGameInfo={setImageGameInfo} isMobile={isMobile} analyticsCookies={analyticsCookies}/>
                <Share stageStatus={imageGameInfo.statusInfo} url={shareUrl}/>
            </div>
            <div className={styles.gameFooter}>
                <span className={styles.imageCreatedBy}>Created by Chat GPT. Chat GPT titled </span>
                <GuessResult questionInfo={imageGameInfo.questionInfo}/>
            </div>
            <div className={styles.bottomArea}>
                <div className={styles.guessArea}>
                    <HangManArea guessInfo={imageGameInfo.guessInfo}/>
                    <AlphabetInput letters={imageGameInfo.letters} imageGameInfo={imageGameInfo}
                                   setImageGameInfo={setImageGameInfo}/>
                </div>
                <Footer/>
            </div>
        </div>);
}