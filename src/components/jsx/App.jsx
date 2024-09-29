import { useState, useEffect, useRef } from 'react';
import {initSocket, goNextStage, disconnect} from '../../common/Websocket';
import { initGuessInfo, initLetters } from '../../common/InitImageGame';
import Info from './info.jsx';
import ImageInfo from './ImageInfo.jsx';
import GuessResult from './GuessResult.jsx';
import HangManArea from './HangMan.jsx';
import AlphabetInput from './AlphabetInput.jsx';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import styles from '../css/App.module.css';


function App({imageGame, currentUrl}) {
  const appRef = useRef(null);
  const initRef = useRef(false);

  const [ imageGameInfo, setImageGameInfo ] = useState( {
    gameInfo : { level : 1, questions : 0, corrects : 0 },
    imageInfo : { mobileImage : "", pcImage : "", uuid : "" },
    questionInfo : { maskedAnswer : "", prefix : null, postfix : null },
    guessInfo : initGuessInfo(),
    letters : initLetters(),
    statusInfo : { correct : false, levelUp : false, clear : false, gameOver : false, share : false }
  });

  useEffect(() => {
    if (initRef.current) return;
    processImageGameInfo(imageGame);
    initSocket(imageGame, setImageGameInfo, processImageGameInfo);
    initRef.current = true;
  }, []);

  function processImageGameInfo(response) {
    response.statusInfo = {
      levelUp : response.statusInfo.levelUp,
      clear : response.statusInfo.clear,
      correct : false,
      gameOver : false,
      share : false
    };
    response.guessInfo = initGuessInfo();
    response.letters = initLetters();
    setImageGameInfo(response);
  }

  useEffect(() => {
    if (imageGameInfo.statusInfo.correct) {
      setTimeout( () => {
        if (currentUrl.includes("?")) {
          window.location.href = "/";
        } else {
          goNextStage();
        }
      }, 5000);
    }
  }, [imageGameInfo.statusInfo.correct]);

  function onRestart() {
    disconnect();
  }

  function onSkip() {
    goNextStage();
  }

  return (
    <div className={styles.app} ref={appRef} tabIndex="0">
      <div className={styles.container}>
        <div className={`${styles.adsense} ${styles.adsenseLeft}`}>Google Adsense Area</div>
        <div className={styles.mainContent}>
          <div className={styles.gameTitle}>
            <h1>AI IMAGE GAME</h1>
          </div>
          <div className={styles.gameArea}>
            <Info gameInfo={imageGameInfo.gameInfo}/>
            <ImageInfo imageGameInfo={imageGameInfo} setImageGameInfo={setImageGameInfo} onRestart={onRestart} onSkip={onSkip}/>
          </div>
          <div className={styles.gameFooter}>
            <p>This image created by Chat GPT. Chat GPT titled </p>
              <GuessResult questionInfo={imageGameInfo.questionInfo}/>
          </div>
          <div className={styles.bottomArea}>
            <div className={styles.guessArea}>
                <HangManArea gameInfo={imageGameInfo.gameInfo} guessInfo={imageGameInfo.guessInfo}/>
                <AlphabetInput letters={imageGameInfo.letters} imageGameInfo={imageGameInfo} setImageGameInfo={setImageGameInfo}/>
            </div>
            <Footer stageStatus={imageGameInfo.statusInfo} url={currentUrl}/>
          </div>
        </div>
        <div className={`${styles.adsense} ${styles.adsenseRight}`}></div>
        <CookieBanner />
      </div>
    </div>
  );
}

export default App;
