import { useState, useEffect, useRef } from 'react';
import './css/App.css';
import Info from './jsx/info.jsx';
import ImageInfo from './jsx/ImageInfo.jsx';
import GuessResult from './jsx/GuessResult.jsx';
import HangManArea from './jsx/HangMan.jsx';
import AlphabetInput from './jsx/AlphabetInput.jsx';
import { guess, initSocket, goNextStage } from "./module/Websocket";
import Footer from "./jsx/Footer";
import axios from 'axios';
import CookieBanner from "./jsx/CookieBanner";


function App() {
  const appRef = useRef(null);
  const initRef = useRef(false);

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
    initImageGame();
    initRef.current = true;
  }, []);

  function initGuessInfo() {
    return { input : "", wrongLetters : [], answerIndexList: [] };
  }
  function initLetters() {
    return "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => ({letter : letter, correct : null}));
  }

  function initImageGame() {

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

  const [url, setUrl ] = useState(window.location.href);

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
    <div className="App" ref={appRef} tabIndex="0" onKeyDown={onInputLetter}>
      <div className="container">
        <div className="adsense adsense-left">Google Adsense Area</div>
        <div className="main-content">
          <div className="game-title">
            <h1>AI IMAGE GAME</h1>
          </div>
          <div className="game-area">
            <Info gameInfo={imageGameInfo.gameInfo}/>
            <ImageInfo imageGameInfo={imageGameInfo} setImageGameInfo={setImageGameInfo} onRestart={onRestart}/>
          </div>
          <div className="game-footer">
            <p>This image created by Chat GPT. Chat GPT titled </p>
              <GuessResult questionInfo={imageGameInfo.questionInfo}/>
          </div>
          <div className="bottom-area">
            <div className="guess-area">
                <HangManArea guessInfo={imageGameInfo.guessInfo}/>
                <AlphabetInput letters={imageGameInfo.letters} onInputLetter={onClickLetter}/>
            </div>
            <Footer stageStatus={imageGameInfo.statusInfo} url={url}/>
          </div>
        </div>
        <div className="adsense adsense-right"></div>
        <CookieBanner />
      </div>
    </div>
  );
}

export default App;
