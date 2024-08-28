import React, { useState, useCallback } from 'react';
import './style.css';
import Info from './info.jsx';
import ImageInfo from './ImageInfo.jsx';
import GuessResult from './GuessResult.jsx';
import HangManArea from './HangMan.jsx';
import AlphabetInput from './AlphabetInput.jsx';
import QuestionInfoProvider from './QuestionInfoContext.js';

function App() {
  const [guessInfo, setGuessInfo] = useState({
      currentGuess : "",
      inputLetters : [],
      answerIndexList: []
  });

  const [imageInfo, setImageInfo] = useState({
    uuid : "",
    pcImage : `${process.env.PUBLIC_URL}/image.png`,
    mobileImage : `${process.env.PUBLIC_URL}/image_mobile.jpg`
  });

  const [gameInfo, setGameInfo] = useState({
    "level" : 1,
    "questions" : 10,
    "corrects" : 0
  });

  const initLetters = "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => 
      ({
        letter : letter,
        clicked : false,
        correct : false
      })
  );
  const [letters, setLetters] = useState(initLetters);

  const onInputLetter = useCallback((index) => {
  const currentGuess = letters[index].letter;
    
    setGuessInfo(prevState => ({
      ...prevState, 
      currentGuess: currentGuess,
      inputLetters: [...prevState.inputLetters]}));

    const correctIndexList = ["s","n","o","r","i","n","g"].map((c, index) => c === currentGuess ? index : null)
                              .filter(index => index != null);// TODO 맞는지 확인

    const isCorrect = correctIndexList.length > 0;
    
    setGuessInfo(prevState => ({
    ...prevState, 
    currentGuess: currentGuess,
    answerIndexList: isCorrect ? [correctIndexList] : [],
    inputLetters: isCorrect ? [...prevState.inputLetters] : [...prevState.inputLetters, currentGuess]}));
    
    setQuestionInfo(prevState => ({
      ...prevState,
      answer : !isCorrect? prevState.answer : updateAnswer(prevState, correctIndexList, currentGuess)
    }));
    
    setLetters(prevState => [
    ...prevState.slice(0, index),
    {
      letter : prevState[index].letter,
      correct: isCorrect,
      clicked : true
    },
    ...prevState.slice(index + 1)
    ])
  }, []);

  const updateAnswer = (prevState, correctIndexList, currentGuess) => {
    return prevState.answer.split('').map((char, index) => correctIndexList.includes(index) ? currentGuess : char).join('');
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
            <Info gameInfo={gameInfo}/>
            <div className="image-area">
              <ImageInfo imageInfo={imageInfo}/>
            </div>
            <div className="share-buttons">
                <button className="share-button instagram-button">Instagram</button>
                <button className="share-button twitter-button">X</button>
              </div>
          </div>
          <div className="game-footer">
            <p>This image created by Chat GPT. Chat GPT titled </p>
            <QuestionInfoProvider>
              <GuessResult/>
            </QuestionInfoProvider>
          </div>
          <div className="bottom-area">
            <div className="guess-area">
              <HangManArea wrongCount={guessInfo.inputLetters.length} />
              <QuestionInfoProvider>
                <AlphabetInput letters={letters} onInputLetter={onInputLetter}/>
              </QuestionInfoProvider>
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
