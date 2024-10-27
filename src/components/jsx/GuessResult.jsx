import styles from '../css/GuessResult.module.css';

function GuessResult({questionInfo}) {
    return (
        <div className={styles.guessInputs}>
            <span className={styles.prefix}>{questionInfo.prefix}</span>
            {questionInfo.maskedAnswer.split("").map((char, index) => (
                <span key={index} className={`${char === '*' ? styles.guessInput : char === ' ' ? styles.blank : styles.guessCorrect}`}>
                {char === '*' ? ' ' : (index === 0 || questionInfo.maskedAnswer[index - 1] === ' ' ? char.toUpperCase() : char)}
                    {
                        Array(5).fill("").map((_, index) => (
                        <span key={index} className={`${char === '*' ? '' : styles.particle}`}></span>
                    ))}
            </span>
            ))}
            <span className={styles.postfix}>{questionInfo.postfix}</span>
        </div>
    );
}

export default GuessResult;