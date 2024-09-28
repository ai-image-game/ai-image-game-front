import styles from '../css/GuessResult.module.css';

function GuessResult({questionInfo}) {
    return (
        <div className={styles.guessInputs}>
            <span className={styles.prefix}>{questionInfo.prefix}</span>
            {questionInfo.maskedAnswer.split("").map((char, index) => (
                <span key={index} className={`${char === '*' ? styles.guessInput : styles.guessCorrect}`}>
                {char === '*' ? ' ' : char}
                    {
                        Array(5).fill("").map((_, index) => (
                        <span key={index} className={`${char === '*' ? '' : 'particle'}`}></span>
                    ))}
            </span>
            ))}
            <span className={styles.postfix}>{questionInfo.postfix}</span>
        </div>
    );
}

export default GuessResult;