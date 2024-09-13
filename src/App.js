import { useState, useEffect, useRef } from 'react';
import './css/App.css';
import Info from './jsx/info.jsx';
import ImageInfo from './jsx/ImageInfo.jsx';
import GuessResult from './jsx/GuessResult.jsx';
import HangManArea from './jsx/HangMan.jsx';
import AlphabetInput from './jsx/AlphabetInput.jsx';
import Guess from "./module/Guess";
import NextStage from "./module/NextStage";
import Footer from "./jsx/Footer";

function App() {
  const appRef = useRef(null);

  const MAX_TRY = 10;
  const MAX_LEVEL = 1;

  const [ imageGameInfo, setImageGameInfo ] = useState( {
    gameInfo : { level : 1, questions : 2, corrects : 0 },
    imageInfo : {
      mobileImage : "image_mobile.jpg",
      pcImage : "image.png",
      id : "ABCD"
    },
    questionInfo : {
      answer : "*******",
      prefix : null,
      postfix : " Dad"
    },
    guessInfo : {
      currentGuess : "",
      wrongLetters : [],
      answerIndexList: []
    },
    letters : "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) =>
    ({
      letter : letter,
      correct : null
    })),
    status : {
      isCorrect : false,
      isLevelUp : false,
      isClear : false,
      isGameOver : false,
      isShare : false
    }
  });
  const [url, setUrl ] = useState(window.location.href + imageGameInfo.imageInfo.id);

  const onClickLetter = (event) => {
    Guess(event.target.innerText, imageGameInfo, setImageGameInfo);
  }

  const onInputLetter = (event) => {
    if (!imageGameInfo.status.isGameOver
        && imageGameInfo.letters.find((letterInfo) => letterInfo.letter === event.key) !== undefined) {
      Guess(event.key, imageGameInfo, setImageGameInfo);
    }
  }

  useEffect(() => {
    setImageGameInfo(prevState => ({
      ...prevState,
      status : {
        ...prevState,
        isGameOver : imageGameInfo.guessInfo.wrongLetters.length === MAX_TRY
      }
    }));
  }, [imageGameInfo.guessInfo.wrongLetters]);

  useEffect(() => {
    const isLastQuestion = (imageGameInfo.gameInfo.questions - 1) === 0;
    const isClear = isLastQuestion && imageGameInfo.gameInfo.level === MAX_LEVEL;
    if (!imageGameInfo.questionInfo.answer.includes("*")) {
      setImageGameInfo(prevState => ({
        ...prevState,
          status : {
              ...prevState,
              isCorrect : true,
              isClear : isClear,
              isLevelUp: isLastQuestion
          }
        })
      );
      setTimeout( () => {
        NextStage(setImageGameInfo);
        setImageGameInfo(prevState => ({
          ...prevState,
          status : {
            ...prevState,
            isCorrect: false
          }
        }));
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
            <Footer stageStatus={imageGameInfo.status} url={url}/>
          </div>
        </div>
        <div className="adsense adsense-right"></div>
      </div>
    </div>
  );
}

export default App;
