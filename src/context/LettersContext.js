import React, { createContext, useState } from 'react';
export const LettersContext = createContext();
export default function LettersProvider ({children}) {
    const initLetters = "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => 
        ({
          letter : letter,
          clicked : false,
          correct : false
        })
    );
    const [letters, setLetters] = useState(initLetters);

    return (
    <LettersContext.Provider value={{letters, setLetters}}>
        {children}
    </LettersContext.Provider>
    );
}