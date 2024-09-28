import styles from '../css/AlphabetInput.module.css';

function AlphabetInput({letters, onInputLetter}) {
    return (
        <div className={styles.alphabetArea}>
            {letters.map((letterInfo, index) => (
                <span key={index} className={`${styles.alphabetLetter} ${letterInfo.correct == null ? '' : (letterInfo.correct ? `${styles.clicked} ${styles.correct}` : `${styles.clicked} ${styles.incorrect}`)}`} onClick={onInputLetter}>
                    {letterInfo.letter}
                </span>
            ))}
        </div>
    );
}

export default AlphabetInput;