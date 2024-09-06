import { useState } from "react";

const Guess = (currentGuess, totalInfo, currentStageInfo, setTotalInfo, setCurrentStageInfo) => {
    let answerList = totalInfo.gameInfo.questions !== 1 ? ["s", "n", "o", "r", "i", "n", "g"] : ["d", "i", "n", "o", "s", "a", "u", "r"];
    setCurrentStageInfo(prevState => ({
        ...prevState,
        guessInfo : {
            ...prevState,
            currentGuess: currentGuess
            , wrongLetters: [...prevState.guessInfo.wrongLetters]
        }
    }));

    const correctIndexList = answerList.map((c, index) => c === currentGuess ? index : null)
        .filter(index => index != null);// TODO 맞는지 확인

    const isCorrect = correctIndexList.length > 0;

    setCurrentStageInfo(prevState => ({
        ...prevState,
        guessInfo : {
            ...prevState.guessInfo,
            currentGuess: currentGuess,
            answerIndexList: isCorrect ? correctIndexList : [],
            wrongLetters: isCorrect ? [...prevState.guessInfo.wrongLetters] : [...prevState.guessInfo.wrongLetters, currentGuess]
        }
        ,questionInfo : {
            ...prevState.questionInfo,
            answer : !isCorrect ? prevState.questionInfo.answer : newAnswer(prevState.questionInfo.answer, correctIndexList, currentGuess)
        }
        , letters :
            prevState.letters.map(letterInfo =>
                letterInfo.letter === currentGuess ? { letter : currentGuess, correct :  isCorrect } : letterInfo
            )
    }));

    const newAnswer = (answer, correctIndexList, currentGuess) => {
        return answer.split('').map((char, index) => correctIndexList.includes(index) ? currentGuess : char).join('');
    }
}

export default Guess;