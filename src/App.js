import React, { useState } from 'react';
import './style.css';
import Info from './info.jsx';
import ImageInfo from './ImageInfo.jsx';
import GuessResult from './GuessResult.jsx';
import HangManArea from './HangMan.jsx';
import AlphabetInput from './AlphabetInput.jsx';
import QuestionInfoProvider from './context/QuestionInfoContext.js';
import GuessInfoProvider from './context/GuessInfoContext.js';
import LettersProvider from './context/LettersContext.js';

function App() {
  const [imageInfo, setImageInfo] = useState({
    mobileImage : "image_mobile.jpg",
    pcImage : "image.png"
  });

  const [gameInfo, setGameInfo] = useState({
    "level" : 1,
    "questions" : 10,
    "corrects" : 0
  });

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
          <QuestionInfoProvider>
            <div className="game-footer">
              <p>This image created by Chat GPT. Chat GPT titled </p>
                <GuessResult/>
            </div>
            <div className="bottom-area">
              <div className="guess-area">
                <GuessInfoProvider>
                  <HangManArea />
                  <LettersProvider>
                      <AlphabetInput/>
                  </LettersProvider>
                </GuessInfoProvider>
              </div>
              <div className="footer">
                <p>Bug report to <a href="mailto:blarblar@gmail.com">blarblar@gmail.com</a></p>
              </div>
            </div>
          </QuestionInfoProvider>
        </div>
        <div className="adsense adsense-right">Google Adsense Area</div>
      </div>
    </div>
  );
}

export default App;
