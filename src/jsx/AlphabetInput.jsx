import { useContext } from 'react';
import Guess from '../module/Guess'
import { LettersContext } from '../context/LettersContext';
import { QuestionInfoContext } from "../context/QuestionInfoContext";
import { GuessInfoContext } from "../context/GuessInfoContext";

function AlphabetInput() {
    const { letters, setLetters } = useContext(LettersContext);
    const { setQuestionInfo } = useContext(QuestionInfoContext);
    const { setGuessInfo } = useContext(GuessInfoContext);

    const onInputLetter = (event) => {
        Guess(event.target.innerText, setQuestionInfo, setLetters, setGuessInfo);
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