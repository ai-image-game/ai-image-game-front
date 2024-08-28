import React, { createContext, useState, useCallback } from 'react';
export const QuestionInfoContext = createContext();
export default function QuestionInfoProvider ({children}) {
    const [questionInfo, setQuestionInfo] = useState({
      answer : "*******",
      prefix : null,
      postfix : " Dad"
    });

    return (
    <QuestionInfoContext.Provider value={{questionInfo, setQuestionInfo}}>
        {children}
    </QuestionInfoContext.Provider>
    );
}