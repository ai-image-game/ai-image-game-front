import '../css/GuessResult.css';

function GuessResult({questionInfo}) {
    return (
        <div className="guess-inputs">
            <span className="prefix">{questionInfo.prefix}</span>
            {questionInfo.maskedAnswer.split("").map((char, index) => (
                <span key={index} className={`${char === '*' ? 'guess-input' : 'guess-correct'}`}>
                {char === '*' ? ' ' : char}
                    {
                        Array(5).fill("").map((_, index) => (
                        <span key={index} className={`${char === '*' ? '' : 'particle'}`}></span>
                    ))}
            </span>
            ))}
            <span className="postfix">{questionInfo.postfix}</span>
        </div>
    );
}

export default GuessResult;