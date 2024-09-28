import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/ImageInfo.module.css';

export default function ImageInfo({imageGameInfo, setImageGameInfo, onRestart, onSkip}) {
    const [isMobile, setIsMobile] = useState(true);
    const [isCorrectVisible, setIsCorrectVisible] = useState(false);
    const [isLevelUpVisible, setIsLevelUpVisible] = useState(false);
    const [isGameOverVisible, setIsGameOverVisible] = useState(false);
    const [isClearVisible, setIsClearVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth <= 768);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (imageGameInfo.statusInfo.gameOver) {
            setIsGameOverVisible(true);
            return;
        } else {
            setIsGameOverVisible(false);
        }

        let clearTimer;
        if (imageGameInfo.statusInfo.clear) {
            clearTimer = setTimeout(() => {
                setIsClearVisible(true);
            }, 1000);
            return;
        } else {
            if (imgRef.current) {
                imgRef.current.onload = () => {
                    setIsClearVisible(false);
                };
            }
        }

        let levelUpTimer;
        if (imageGameInfo.statusInfo.levelUp) {
            levelUpTimer = setTimeout(() => {
                setIsLevelUpVisible(true);
            }, 1000);
            return;
        } else {
            if (imgRef.current) {
                imgRef.current.onload = () => {
                    setIsLevelUpVisible(false);
                };
            }
        }

        let correctTimer;
        if (imageGameInfo.statusInfo.correct) {
            correctTimer = setTimeout(() => {
                setIsCorrectVisible(true);
            }, 1000);
        } else {
            if (imgRef.current) {
                imgRef.current.onload = () => {
                    setIsCorrectVisible(false);
                };
            }
        }
        return () => {
            clearTimeout(levelUpTimer) && clearTimeout(correctTimer) && clearTimeout(clearTimer);
        }
    }, [imageGameInfo.statusInfo]);


    function onRetry() {
        setImageGameInfo((prev) => ({
            ...prev,
            guessInfo: {
                input: "",
                wrongLetters: [],
                answerIndexList: []
            },
            letters: prev.letters.map((letterInfo) =>
                ({
                    letter: letterInfo.letter,
                    correct: null
                }))
            ,
            statusInfo : {
                correct : false,
                levelUp : false,
                clear : false,
                gameOver : false,
                share : false
            }
        }));
    }

    function onShare()  {
        console.log(imageGameInfo.statusInfo);
        setImageGameInfo((prevState) => ({
            ...prevState,
            statusInfo : {
                ...prevState.statusInfo,
                share: true
            }
        }));

        setTimeout(() => {
            console.log(imageGameInfo.statusInfo);
            setImageGameInfo((prevState) => ({
                ...prevState,
                statusInfo : {
                    ...prevState.statusInfo,
                    share: false
                }
            }));
        }, 5000);
    }

    return (
        <div className={`${styles.imageArea} ${imageGameInfo.statusInfo.correct ? styles.bright : ''}`}>
            <img ref={imgRef} src={isMobile ? imageGameInfo.imageInfo.mobileImage : imageGameInfo.imageInfo.pcImage}/>
            {isClearVisible && <div className={`${styles.congratulation} ${styles.clear}`}>
                <h1>
                    <span>G</span>
                    <span>A</span>
                    <span>M</span>
                    <span>E</span>
                    <span>&nbsp;</span>
                    <span>C</span>
                    <span>O</span>
                    <span>M</span>
                    <span>P</span>
                    <span>L</span>
                    <span>E</span>
                    <span>T</span>
                    <span>E</span>
                    <span>D</span>
                    <span>!</span>
                </h1>
                <button className={styles.restartButton} onClick={onRestart}>Restart from Level 1</button>
            </div>}
            {isCorrectVisible && !isLevelUpVisible && <div className={styles.congratulation}>
                <h1>
                    <span>C</span>
                    <span>O</span>
                    <span>R</span>
                    <span>R</span>
                    <span>E</span>
                    <span>C</span>
                    <span>T</span>
                    <span>!</span>
                </h1>
            </div>
            }
            {isLevelUpVisible && !isClearVisible && <div className={`${styles.congratulation} ${styles.levelup}`}>
                <h1>
                    <span>L</span>
                    <span>E</span>
                    <span>V</span>
                    <span>E</span>
                    <span>L</span>
                    <span>&nbsp;</span>
                    <span>U</span>
                    <span>P</span>
                    <span>!</span>
                </h1>
            </div>
            }
            {isGameOverVisible && <div className={styles.gameover}>
                <p>GAME OVER</p>
                <button className={styles.retryButton} onClick={onRetry}>Watch Ads & Try Again!</button>
                <button className={styles.skipButton} onClick={onSkip}>Skip</button>
                <button className={styles.shareButton} onClick={onShare}>Share and Ask</button>
            </div>}

        </div>
    );
}

