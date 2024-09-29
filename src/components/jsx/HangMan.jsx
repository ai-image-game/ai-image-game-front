import styles from '../css/HangMan.module.css';

function HangMan({ gameInfo, guessInfo }) {
    const wrongCount = guessInfo.wrongLetters.length;
    const usedRetry = gameInfo.usedRetry;
    console.log("usedRetry");
    console.log(usedRetry);
    console.log("wrongCount");
    console.log(wrongCount);

    return  (
    <div className={`${styles.hangmanArea} ${wrongCount >= (7 + (usedRetry * 7)) ? styles.killed : ''}`}>
        <div className={`${styles.hangmanPart} ${styles.hangmanBase} ${wrongCount >= (5 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanPole} ${wrongCount >= (5 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBeam} ${wrongCount >= (6 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRope} ${wrongCount >= (7 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanHead} ${wrongCount >= (1 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBody} ${wrongCount >= (2 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftArm} ${wrongCount >= (3 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightArm} ${wrongCount >= (3 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftLeg} ${wrongCount >= (4 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightLeg} ${wrongCount >= (4 + (usedRetry * 7)) ? styles.visible : ''}`}></div>
    </div>);
}

export default HangMan;