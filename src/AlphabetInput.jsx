function AlphabetInput({ letters, onInputLetter }) {
    return (
        <div className="alphabet-area">
            {letters.map((letterInfo, index) => (
                <span key={index} className={`alphabet-letter ${letterInfo.clicked ? (letterInfo.correct ? 'clicked correct' : 'clicked incorrect') : ''}`}  onClick={() => onInputLetter(index)}>
                    {letterInfo.letter}

                    {letterInfo.clicked && (
                        <span className="alphabet-letter-mark">
                        {letterInfo.correct ? 'O' : 'X'}
                        </span>
                    )}
                </span>
            ))}
        </div>
    );
}

export default AlphabetInput;