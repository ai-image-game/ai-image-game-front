import styles from '../css/AlphabetInput.module.css';
import { useEffect } from "react";
import { guess } from "../../common/Websocket";

function AlphabetInput({letters, imageGameInfo, setImageGameInfo}) {
    useEffect(() => {
        window.addEventListener('keydown', onInputLetter);
        return () => {
            window.removeEventListener('keydown', onInputLetter);
        };
    }, []);

    useEffect(() => {
        if (imageGameInfo.guessInfo.input === '') return;
        guess(imageGameInfo.guessInfo);
    }, [imageGameInfo.guessInfo.input]);

    const onClickLetter = (event) => {
        changeInput(event.target.innerText);
    }

    const onInputLetter = (event) => {
        if (!imageGameInfo.statusInfo.gameOver
            && imageGameInfo.letters.find((letterInfo) => letterInfo.letter === event.key.toLowerCase()) !== undefined) {
            changeInput(event.key.toLowerCase());
        }
    }

    const changeInput = (input) => {
        setImageGameInfo(prevState => ({
            ...prevState,
            guessInfo : {
                ...prevState.guessInfo,
                input: input
            }
        }));
    }

    return (
        <div className={styles.alphabetArea}>
            {letters.map((letterInfo, index) => (
                <span key={index} className={`${styles.alphabetLetter} ${letterInfo.correct == null ? '' : (letterInfo.correct ? `${styles.clicked} ${styles.correct}` : `${styles.clicked} ${styles.incorrect}`)}`} onClick={onClickLetter}>
                    {letterInfo.letter}
                </span>
            ))}
        </div>
    );
}

export default AlphabetInput;