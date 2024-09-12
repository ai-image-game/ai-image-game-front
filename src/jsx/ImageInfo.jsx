import React, {useState, useEffect, useRef} from 'react';
import '../css/ImageInfo.css'
import {clear} from "@testing-library/user-event/dist/clear";

function ImageInfo({currentStageInfo, setCurrentStageInfo, imageInfo, onRestart}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isCorrectVisible, setIsCorrectVisible] = useState(false);
    const [isLevelUpVisible, setIsLevelUpVisible] = useState(false);
    const [isGameOverVisible, setIsGameOverVisible] = useState(false);
    const [isClearVisible, setIsClearVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Add event listener to detect window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (currentStageInfo.status.isGameOver) {
            setIsGameOverVisible(true);
            return;
        } else {
            setIsGameOverVisible(false);
        }

        let clearTimer;
        if (currentStageInfo.status.isClear) {
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
        if (currentStageInfo.status.isLevelUp) {
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
        if (currentStageInfo.status.isCorrect) {
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
    }, [currentStageInfo.status]);


    function onRetry() {
        setCurrentStageInfo((prev) => ({
            ...prev,
            guessInfo: {
                currentGuess: "",
                wrongLetters: [],
                answerIndexList: []
            },
            letters: prev.letters.map((letterInfo) =>
                ({
                    letter: letterInfo.letter,
                    correct: null
                }))
            ,
            status : {
                isCorrect : false,
                isLevelUp : false,
                isClear : false,
                isGameOver : false,
                isShare : false
            }
        }));
    }

    function onShare()  {
        setCurrentStageInfo((prevState) => ({
            ...prevState,
            status : {
                ...prevState,
                isShare: true
            }
        }));

        setTimeout(() => {
            setCurrentStageInfo((prevState) => ({
                ...prevState,
                status : {
                    ...prevState,
                    isShare: false
                }
            }));
        }, 5000);
    }

    return (
        <div className={`image-area ${currentStageInfo.status.isCorrect ? 'bright' : ''}`}>
            <img ref={imgRef} src={isMobile ? imageInfo.mobileImage : imageInfo.pcImage}/>
            {isClearVisible && <div className="congratulation clear">
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
                <button className="restart-button" onClick={onRestart}>Restart from Level 1</button>
            </div>}
            {isCorrectVisible && !isLevelUpVisible && <div className="congratulation correct">
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
            {isLevelUpVisible && !isClearVisible && <div className="congratulation levelup">
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
            {isGameOverVisible && <div className="gameover">
                <p>GAME OVER</p>
                <button className="retry-button" onClick={onRetry}>Watch Ads & Try Again!</button>
                <button className="skip-button">Skip</button>
                <button className="share-button" onClick={onShare}>Share and Ask</button>
            </div>}

        </div>
    );
}

export default ImageInfo;

