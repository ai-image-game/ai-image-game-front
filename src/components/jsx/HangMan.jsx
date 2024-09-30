import styles from '../css/HangMan.module.css';

function HangMan({ guessInfo }) {
    const wrongCount = guessInfo.wrongLetters.length;

    return  (
    <div className={`${styles.hangmanArea} ${wrongCount >= 7 ? styles.killed : ''}`}>
        <div className={`${styles.hangmanPart} ${styles.hangmanBase} ${wrongCount >= 5 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanPole} ${wrongCount >= 5 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBeam} ${wrongCount >= 6 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRope} ${wrongCount >= 7 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanHead} ${wrongCount >= 1 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBody} ${wrongCount >= 2 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftArm} ${wrongCount >= 3 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightArm} ${wrongCount >= 3 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftLeg} ${wrongCount >= 4 ? styles.visible : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightLeg} ${wrongCount >= 4 ? styles.visible : ''}`}></div>
    </div>);
}

export default HangMan;