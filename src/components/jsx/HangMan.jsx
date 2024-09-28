import styles from '../css/HangMan.module.css';

function HangMan({guessInfo}) {
    const wrongCount = guessInfo.wrongLetters.length;

    return  (
    <div className={`${styles.hangmanArea} ${wrongCount > 9 ? styles.killed : ''}`}>
        <div className={`${styles.hangmanPart} ${styles.hangmanBase} ${wrongCount > 6 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanPole} ${wrongCount > 7 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBeam} ${wrongCount > 8 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRope} ${wrongCount > 9 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanHead} ${wrongCount > 0 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanBody} ${wrongCount > 1 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftArm} ${wrongCount > 2 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightArm} ${wrongCount > 3 ? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanLeftLeg} ${wrongCount > 4? 'visible' : ''}`}></div>
        <div className={`${styles.hangmanPart} ${styles.hangmanRightLeg} ${wrongCount > 5 ? 'visible' : ''}`}></div>
    </div>);
}

export default HangMan;