function AlphabetInput({letters, onInputLetter}) {
    return (
        <div className="alphabet-area">
            {letters.map((letterInfo, index) => (
                <span key={index} className={`alphabet-letter ${letterInfo.correct == null ? '' : (letterInfo.correct ? 'clicked correct' : 'clicked incorrect')}`} onClick={onInputLetter}>
                    {letterInfo.letter}
                </span>
            ))}
        </div>
    );
}

export default AlphabetInput;