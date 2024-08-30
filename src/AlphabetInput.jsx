import React, { useContext, useCallback } from 'react';
import { GuessInfoContext } from './context/GuessInfoContext.js';
import { QuestionInfoContext } from './context/QuestionInfoContext.js';
import { LettersContext } from './context/LettersContext.js';

function AlphabetInput() {
    const { questionInfo, setQuestionInfo } = useContext(QuestionInfoContext);
    const { letters, setLetters } = useContext(LettersContext);
    const { guessInfo, setGuessInfo } = useContext(GuessInfoContext);

    const onInputLetter = useCallback((event) => {
        const currentGuess = event.target.innerText;
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
            answer : !isCorrect ? prevState.answer : newAnswer(prevState, correctIndexList, currentGuess)
        }));

        setLetters(prevState =>
            prevState.map(letterInfo =>
                letterInfo.letter === currentGuess ? { letter : currentGuess, correct :  isCorrect , clicked : true } : letterInfo
            )
        );
        
    }, []);
  
    const newAnswer = (prevState, correctIndexList, currentGuess) => {
      return prevState.answer.split('').map((char, index) => correctIndexList.includes(index) ? currentGuess : char).join('');
    }

    return (
        <div className="alphabet-area">
            {letters.map((letterInfo, index) => (
                <span key={index} className={`alphabet-letter ${letterInfo.clicked ? (letterInfo.correct ? 'clicked correct' : 'clicked incorrect') : ''}`} onClick={onInputLetter}>
                    {letterInfo.letter}
                </span>
            ))}
        </div>
    );
}

export default AlphabetInput;