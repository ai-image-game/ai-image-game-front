import React, { useState, useEffect, useRef } from 'react';
import { goNextStage, retry} from "../../common/Websocket";
import styles from '../css/ImageInfo.module.css';
import { Luckiest_Guy, Press_Start_2P } from 'next/font/google';

const luckiestGuyFont = Luckiest_Guy({
    weight : "400",
    subsets : ["latin"]
});

const pressStart2p = Press_Start_2P({
    weight : "400",
    subsets : ["latin"]
})

export default function ImageArea({imageGameInfo, setImageGameInfo}) {
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
                if (imgRef.current.complete) {
                    setIsClearVisible(false);
                }
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
                if (imgRef.current.complete) {
                    setIsLevelUpVisible(false);
                }
            }
        }

        let correctTimer;
        if (imageGameInfo.statusInfo.correct) {
            correctTimer = setTimeout(() => {
                setIsCorrectVisible(true);
            }, 1000);
        }

        if (imgRef.current) {
            imgRef.current.onload = () => {
                hideCongratulation();
            };
        }

        return () => {
            clearTimeout(levelUpTimer) && clearTimeout(correctTimer) && clearTimeout(clearTimer);
        }
    }, [imageGameInfo.statusInfo]);

    function hideCongratulation() {
        setIsClearVisible(false);
        setIsLevelUpVisible(false);
        setIsCorrectVisible(false);
    }

    function onRetry() {
        retry();
    }

    function onRestart() {
        window.location.href = "/";
    }

    function onSkip() {
        goNextStage();
    }

    function onShare()  {
        setImageGameInfo((prevState) => ({
            ...prevState,
            statusInfo : {
                ...prevState.statusInfo,
                share: true
            }
        }));

        setTimeout(() => {
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
            { isClearVisible && <div className={`${styles.congratulation} ${styles.clear} ${luckiestGuyFont.className}`}>
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
                <button className={`${styles.restartButton} ${pressStart2p.className}`} onClick={onRestart}>Restart from Level 1</button>
            </div>}
            { isCorrectVisible && !isLevelUpVisible && <div className={`${styles.congratulation} ${luckiestGuyFont.className}`}>
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
            { isLevelUpVisible && !isClearVisible && <div className={`${styles.congratulation} ${styles.levelup} ${luckiestGuyFont.className}`}>
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
            {isGameOverVisible && <div className={`${styles.gameover} ${pressStart2p.className}`}>
                <p>GAME OVER</p>
                {imageGameInfo.gameInfo.retry === 0 &&
                    <button className={`${styles.restartButton} ${pressStart2p.className}`} onClick={onRestart}>
                        Restart from Level 1
                    </button>
                }
                {imageGameInfo.gameInfo.retry !== 0 &&
                    <>
                        <button className={`${styles.retryButton} ${pressStart2p.className}`} onClick={onRetry}>
                            Watch Ads & Try Again!
                            <span
                                className={`${styles.last}`}> {imageGameInfo.gameInfo.retry === 1 ? "(Last)" : ""}</span>
                        </button>
                    </>
                }
                <button className={`${styles.skipButton} ${pressStart2p.className}`} onClick={onSkip}>Skip</button>
                <button className={`${styles.shareButton} ${pressStart2p.className}`} onClick={onShare}>Share and Ask</button>
            </div>}

        </div>
    );
}

