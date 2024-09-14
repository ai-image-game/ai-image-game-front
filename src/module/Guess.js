const Guess = (answer, currentGuess, imageGameInfo, setImageGameInfo) => {
    let answerList = answer.split("");
    setImageGameInfo(prevState => ({
        ...prevState,
        guessInfo : {
            ...prevState,
            currentGuess: currentGuess
            , wrongLetters: [...prevState.guessInfo.wrongLetters]
        }
    }));

    const correctIndexList = answerList.map((c, index) => c === currentGuess ? index : null).filter(index => index != null);

    const isCorrect = correctIndexList.length > 0;

    setImageGameInfo(prevState => ({
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