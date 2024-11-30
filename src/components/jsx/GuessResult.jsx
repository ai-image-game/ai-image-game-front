import styles from '../css/GuessResult.module.css';

function GuessResult({questionInfo}) {
    return (
        <div className={styles.guessInputs}>
            {questionInfo.prefix && <span className={styles.prefix}>
                {questionInfo.prefix.split("").map((char, index) => (
                    <>{index === 0 ? char.toUpperCase() : char}</>
                ))}
            </span>}
            {questionInfo.maskedAnswer.split("").map((char, index) => (
                <span key={index} className={`${char === '*' ? styles.guessInput : char === ' ' ? styles.blank : styles.guessCorrect}`}>
                {char === '*' ? ' ' : (index === 0 || questionInfo.maskedAnswer[index - 1] === ' ' ? char.toUpperCase() : char)}
                    {
                        Array(5).fill("").map((_, index) => (
                        <span key={index} className={`${char === '*' || char === ' ' ? '' : styles.particle}`}></span>
                    ))}
            </span>
            ))}
            {questionInfo.postfix && <span className={styles.postfix}>
                {questionInfo.postfix.split("").map((char, index) => (
                    <>{index === 0 || questionInfo.postfix[index -1] === ' ' ? char.toUpperCase() : char}</>
                ))}
            </span>
            }
        </div>
    );
}

export default GuessResult;