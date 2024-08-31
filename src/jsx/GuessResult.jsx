function GuessResult({questionInfo}) {
    return (
        <div className="guess-inputs">
            <span className="prefix">{questionInfo.prefix}</span>
            {questionInfo.answer.split("").map((char, index) => (
            <span key={index} className={`${char === '*' ? 'guess-input' : 'guess-correct'}`}>{char === '*' ? ' ' : char}</span>
            ))}
            <span className="postfix">{questionInfo.postfix}</span>
        </div>
    );
}

export default GuessResult;