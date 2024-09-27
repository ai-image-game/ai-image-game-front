import { useState, useEffect, useRef } from 'react';
import Info from './info.jsx';
import ImageInfo from './ImageInfo.jsx';
import GuessResult from './GuessResult.jsx';
import HangManArea from './HangMan.jsx';
import AlphabetInput from './AlphabetInput.jsx';
import { guess, initSocket, goNextStage } from "../common/Websocket";
import Footer from "./Footer";
import axios from 'axios';
import CookieBanner from "./CookieBanner";
import styles from './App.module.css';


function App() {
  const appRef = useRef(null);
  const initRef = useRef(false);
  const [url, setUrl] = useState('');

  const MAX_TRY = 10;

  const [ imageGameInfo, setImageGameInfo ] = useState( {
    gameInfo : { level : 1, questions : 0, corrects : 0 },
    imageInfo : { mobileImage : "", pcImage : "", uuid : "" },
    questionInfo : { maskedAnswer : "", prefix : null, postfix : null },
    guessInfo : initGuessInfo(),
    letters : initLetters(),
    statusInfo : { correct : false, levelUp : false, clear : false, gameOver : false, share : false }
  });

  const apiClient = axios.create({
    baseURL: 'http://localhost', // API의 기본 URL
    timeout: 10000, // 요청 제한 시간 (ms)
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    withCredentials : true
  });

  useEffect(() => {
    if (initRef.current) return;
    initImageGame(window);
    initRef.current = true;
  }, []);

  function initGuessInfo() {
    return { input : "", wrongLetters : [], answerIndexList: [] };
  }
  function initLetters() {
    return "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => ({letter : letter, correct : null}));
  }

  function initImageGame(window) {
    setUrl(window.location.href);

    if (window.location.pathname.includes("share")) {
      const pathParts = window.location.pathname.split('/');
      const uuid = pathParts[pathParts.length - 1];
      apiClient.get("/api/v1/image-game/" + uuid)
          .then((response) => {
            processImageGameInfo(response.data);
            initSocket(response.data, setImageGameInfo, processImageGameInfo);
          }).catch((e) => console.log(e));
    } else {
      apiClient.put("/api/v1/image-game", imageGameInfo)
        .then((response) => {
          processImageGameInfo(response.data);
          initSocket(response.data, setImageGameInfo, processImageGameInfo);
        }).catch((e) => console.log(e));
    }
  }

  function processImageGameInfo(response) {
    response.statusInfo = {
      levelUp : response.statusInfo.levelUp,
      clear : response.statusInfo.clear,
      correct : false,
      gameOver : false,
      isShare : false
    };
    response.guessInfo = initGuessInfo();
    response.letters = initLetters();
    setImageGameInfo(response);
  }

  const onClickLetter = (event) => {
    changeInput(event.target.innerText);
  }

  const onInputLetter = (event) => {
    if (!imageGameInfo.statusInfo.gameOver
        && imageGameInfo.letters.find((letterInfo) => letterInfo.letter === event.key) !== undefined) {
      changeInput(event.key);
    }
  }

  const changeInput = (input) => {
    setImageGameInfo(prevState => ({
      ...prevState,
      guessInfo : {
        ...prevState.guessInfo,
        input: input
      }
    }));
  }

  useEffect(() => {
    if (imageGameInfo.guessInfo.input === '') return;
    guess(imageGameInfo.guessInfo);
  }, [imageGameInfo.guessInfo.input]);

  useEffect(() => {
    setImageGameInfo(prevState => ({
      ...prevState,
      statusInfo : {
        ...prevState.statusInfo,
        isGameOver : imageGameInfo.guessInfo.wrongLetters.length === MAX_TRY
      }
    }));
  }, [imageGameInfo.guessInfo.wrongLetters]);

  useEffect(() => {
    if (imageGameInfo.statusInfo.correct) {
      setTimeout( () => {
        if (window.location.pathname.includes("/share")) {
          window.location.href = "/";
        } else {
          goNextStage();
        }
      }, 5000);
    }
  }, [imageGameInfo.statusInfo.correct]);

  function onRestart() {
    console.log("todo restart!");
  }

  useEffect(() => {
    if (appRef.current) {
      appRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.app} ref={appRef} tabIndex="0" onKeyDown={onInputLetter}>
      <div className={styles.container}>
        <div className={`${styles.adsense} ${styles.adsenseLeft}`}>Google Adsense Area</div>
        <div className={styles.mainContent}>
          <div className={styles.gameTitle}>
            <h1>AI IMAGE GAME</h1>
          </div>
          <div className={styles.gameArea}>
            <Info gameInfo={imageGameInfo.gameInfo}/>
            <ImageInfo imageGameInfo={imageGameInfo} setImageGameInfo={setImageGameInfo} onRestart={onRestart}/>
          </div>
          <div className={styles.gameFooter}>
            <p>This image created by Chat GPT. Chat GPT titled </p>
              <GuessResult questionInfo={imageGameInfo.questionInfo}/>
          </div>
          <div className={styles.bottomArea}>
            <div className={styles.guessArea}>
                <HangManArea guessInfo={imageGameInfo.guessInfo}/>
                <AlphabetInput letters={imageGameInfo.letters} onInputLetter={onClickLetter}/>
            </div>
            <Footer stageStatus={imageGameInfo.statusInfo} url={url}/>
          </div>
        </div>
        <div className={`${styles.adsense} ${styles.adsenseRight}`}></div>
        <CookieBanner />
      </div>
    </div>
  );
}

export default App;
