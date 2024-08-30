import React, { createContext, useState } from 'react';
export const GuessInfoContext = createContext();
export default function GuessInfoProvider ({children}) {
    const [guessInfo, setGuessInfo] = useState({
        currentGuess : "",
        inputLetters : [],
        answerIndexList: []
    });

    return (
    <GuessInfoContext.Provider value={{guessInfo, setGuessInfo}}>
        {children}
    </GuessInfoContext.Provider>
    );
}