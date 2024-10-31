import styles from '../css/HangMan.module.css';
import {useEffect} from "react";

function HangMan({ guessInfo }) {
    const wrongCount = guessInfo.wrongLetters.length;

    useEffect(() => {
        //pre load
        const images = [
            "/images/hangman/hangman_head_small.png",
            "/images/hangman/hangman_arms_small.png",
            "/images/hangman/hangman_legs_small.png",
            "/images/hangman/hangman_stick_small.png",
            "/images/hangman/hangman_stick_up_small.png",
            "/images/hangman/hangman_small.png"
        ];

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div className={`${styles.hangmanArea} ${wrongCount === 6 ? styles.killed : ''}`}>
            {wrongCount === 1 && <img src="/images/hangman/hangman_head_small.png" alt="hangman_head"/>}
            {wrongCount === 2 && <img src="/images/hangman/hangman_arms_small.png" alt="hangman_arms"/>}
            {wrongCount === 3 && <img src="/images/hangman/hangman_legs_small.png" alt="hangman_legs"/>}
            {wrongCount === 4 && <img src="/images/hangman/hangman_stick_small.png" alt="hangman_stick"/>}
            {wrongCount === 5 && <img src="/images/hangman/hangman_stick_up_small.png" alt="hangman_stick_up"/>}
            {wrongCount === 6 && <img src="/images/hangman/hangman_small.png" alt="hangman"/>}
        </div>);
}

export default HangMan;