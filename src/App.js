import { useState, useEffect, useRef } from 'react';
import './css/App.css';
import Info from './jsx/info.jsx';
import ImageInfo from './jsx/ImageInfo.jsx';
import GuessResult from './jsx/GuessResult.jsx';
import HangManArea from './jsx/HangMan.jsx';
import AlphabetInput from './jsx/AlphabetInput.jsx';
import Guess from "./module/Guess";
import Footer from "./jsx/Footer";
import axios from 'axios';


function App() {
  const appRef = useRef(null);

  const MAX_TRY = 10;

  const [ answer, setAnswer ] = useState("");
  const [ imageGameInfo, setImageGameInfo ] = useState( {
    gameInfo : { level : 1, questions : 0, corrects : 0 },
    imageInfo : { mobileImage : "", pcImage : "", id : "" },
    questionInfo : { answer : "", prefix : null, postfix : null },
    guessInfo : initGuessInfo(),
    letters : initLetters(),
    statusInfo : { isCorrect : false, isLevelUp : false, isClear : false, isGameOver : false, isShare : false }
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

  useEffect(() => getImageGame(), []);

  function initGuessInfo() {
    return { currentGuess : "", wrongLetters : [], answerIndexList: [] };
  }
  function initLetters() {
    return "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => ({letter : letter, correct : null}));
  }

  function getImageGame() {
    apiClient.put("/api/v1/image-game", imageGameInfo)
        .then((response) => {
          console.log(" imageGameInfo.imageInfo.uuid : " + imageGameInfo.imageInfo.uuid);
          console.log(" response.data.imageInfo.uuid : " + response.data.imageInfo.uuid);
          if (imageGameInfo.imageInfo.uuid === response.data.imageInfo.uuid) {
            getImageGame();
            return;
          }

          let answer = response.data.questionInfo.answer;
          setAnswer(answer);
          response.data.questionInfo.answer = answer.split("").map((letter) => letter === ' ' ? ' ' : '*').join("");

          response.data.statusInfo = {
            isLevelUp : response.data.statusInfo.levelUp,
            isClear : response.data.statusInfo.clear,
            isCorrect : false,
            isGameOver : false,
            isShare : false
          };
          response.data.guessInfo = initGuessInfo();
          response.data.letters = initLetters();
          setImageGameInfo(response.data);
        }).catch((e) => console.log(e));
  }

  const [url, setUrl ] = useState(window.location.href);

  const onClickLetter = (event) => {
    Guess(answer, event.target.innerText, imageGameInfo, setImageGameInfo);
  }

  const onInputLetter = (event) => {
    if (!imageGameInfo.statusInfo.isGameOver
        && imageGameInfo.letters.find((letterInfo) => letterInfo.letter === event.key) !== undefined) {
      Guess(answer, event.key, imageGameInfo, setImageGameInfo);
    }
  }

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
    if (imageGameInfo.questionInfo.answer !== '' && !imageGameInfo.questionInfo.answer.includes("*")) {
      setImageGameInfo(prevState => ({
        ...prevState,
        statusInfo : {
              ...prevState.statusInfo,
              isCorrect : true
          }
        })
      );
      setTimeout( () => {
        getImageGame();
      }, 5000);
    }
  }, [imageGameInfo.questionInfo.answer]);

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
      </div>
    </div>
  );
}

export default App;
