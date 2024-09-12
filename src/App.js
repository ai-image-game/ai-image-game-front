import { useState, useEffect } from 'react';
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
  const MAX_TRY = 10;
  const MAX_LEVEL = 2;

  const [ totalInfo, setTotalInfo ] = useState({
    gameInfo : { level : 1, questions : 2, corrects : 0 },
    imageInfo : {
      mobileImage : "image_mobile.jpg",
      pcImage : "image.png",
      id : "ABCD"
    }
  });

  const [ currentStageInfo, setCurrentStageInfo ] = useState( {
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
  const [url, setUrl ] = useState(window.location.href + totalInfo.imageInfo.id);

  const onInputLetter = (event) => {
    Guess(event.target.innerText, totalInfo, currentStageInfo, setTotalInfo, setCurrentStageInfo);
  }


  useEffect(() => {
    setCurrentStageInfo(prevState => ({
      ...prevState,
      status : {
        ...prevState,
        isGameOver : currentStageInfo.guessInfo.wrongLetters.length === MAX_TRY
      }
    }));
  }, [currentStageInfo.guessInfo.wrongLetters]);

  useEffect(() => {
    if (!currentStageInfo.questionInfo.answer.includes("*")) {
      setCurrentStageInfo(prevState => ({
        ...prevState,
          status : {
              ...prevState,
              isCorrect : true,
              isLevelUp: (totalInfo.gameInfo.questions - 1) === 0
          }
        })
      );
      setTimeout( () => {
        NextStage(setCurrentStageInfo, setTotalInfo);
        setCurrentStageInfo(prevState => ({
          ...prevState,
          status : {
            ...prevState,
            isCorrect: false
          }
        }));
      }, 5000);
    }
  }, [currentStageInfo.questionInfo.answer]);

  useEffect(() => {
    if (totalInfo.gameInfo.questions === 0 && totalInfo.gameInfo.level === MAX_LEVEL) {
      setCurrentStageInfo(prevState=> ({
        ...prevState,
        stage : {
          ...prevState,
          isClear : true
        }
      }));
    }
  }, [totalInfo.gameInfo]);

  function onRestart() {
    console.log("todo restart!");
  }

  return (
    <div className="App">
      <div className="container">
        <div className="adsense adsense-left">Google Adsense Area</div>
        <div className="main-content">
          <div className="game-title">
            <h1>AI IMAGE GAME</h1>
          </div>
          <div className="game-area">
            <Info gameInfo={totalInfo.gameInfo}/>
            <ImageInfo currentStageInfo={currentStageInfo} setCurrentStageInfo={setCurrentStageInfo} imageInfo={totalInfo.imageInfo} onRestart={onRestart}/>
          </div>
          <div className="game-footer">
            <p>This image created by Chat GPT. Chat GPT titled </p>
              <GuessResult questionInfo={currentStageInfo.questionInfo}/>
          </div>
          <div className="bottom-area">
            <div className="guess-area">
                <HangManArea guessInfo={currentStageInfo.guessInfo}/>
                <AlphabetInput letters={currentStageInfo.letters} onInputLetter={onInputLetter}/>
            </div>
            <Footer stageStatus={currentStageInfo.status} url={url}/>
          </div>
        </div>
        <div className="adsense adsense-right"></div>
      </div>
    </div>
  );
}

export default App;
