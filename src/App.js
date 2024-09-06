import { useState, useEffect } from 'react';
import './css/App.css';
import Info from './jsx/info.jsx';
import ImageInfo from './jsx/ImageInfo.jsx';
import GuessResult from './jsx/GuessResult.jsx';
import HangManArea from './jsx/HangMan.jsx';
import AlphabetInput from './jsx/AlphabetInput.jsx';
import Guess from "./module/Guess";
import NextStage from "./module/NextStage";

function App() {
  const [ totalInfo, setTotalInfo ] = useState({
    gameInfo : {
      level : 1,
      questions : 2,
      corrects : 0
    },
    imageInfo : {
      mobileImage : "image_mobile.jpg",
      pcImage : "image.png"
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
      inputLetters : [],
      answerIndexList: []
    },
    letters : "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) =>
    ({
      letter : letter,
      correct : null
    })),
    isCorrect : false
  });

  const [isCorrect, setIsCorrect] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);

  const onInputLetter = (event) => {
    Guess(event.target.innerText, totalInfo, currentStageInfo, setTotalInfo, setCurrentStageInfo);
  }

  useEffect(() => {
    if (!currentStageInfo.questionInfo.answer.includes("*")) {
      setIsCorrect(true);
      setIsLevelUp(totalInfo.gameInfo.questions - 1 === 0)
      setTimeout( () => {
        NextStage(setCurrentStageInfo, setTotalInfo);
        setIsCorrect(false);
      }, 5000);
    }
  }, [currentStageInfo.questionInfo.answer]);

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
            <ImageInfo isCorrect={isCorrect} isLevelUp={isLevelUp} imageInfo={totalInfo.imageInfo}/>
            <div className="share-buttons">
                <button className="share-button instagram-button">Instagram</button>
                <button className="share-button twitter-button">X</button>
              </div>
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
            <div className="footer">
              <p>Bug report to <a href="mailto:blarblar@gmail.com">blarblar@gmail.com</a></p>
            </div>
          </div>
        </div>
        <div className="adsense adsense-right">Google Adsense Area</div>
      </div>
    </div>
  );
}

export default App;
