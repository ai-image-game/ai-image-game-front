import React, {useState, useEffect, useRef} from 'react';
import '../css/ImageInfo.css'

function ImageInfo({stageStatus, imageInfo, onRetry}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isCorrectVisible, setIsCorrectVisible] = useState(false);
    const [isLevelUpVisible, setIsLevelUpVisible] = useState(false);
    const [isGameOverVisible, setIsGameOverVisible] = useState(false);
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
        let timer;
        if (stageStatus.isGameOver) {
            setIsGameOverVisible(true);
            return;
        } else {
            setIsGameOverVisible(false);
            return;
        }

        if (stageStatus.isLevelUp) {
            setIsLevelUpVisible(true);
        }
        if (imgRef.current) {
            imgRef.current.onload = () => {
                setIsLevelUpVisible(false);
            };
        }

        if (stageStatus.isCorrect) {
            timer = setTimeout(() => {
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
            clearTimeout(timer)
        }
    }, [stageStatus]);

    return (
        <div className={`image-area ${stageStatus.isCorrect ? 'bright' : ''}`}>
            <img ref={imgRef} src={isMobile ? imageInfo.mobileImage : imageInfo.pcImage}/>
            {isCorrectVisible && !isLevelUpVisible && <div className="correct">
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
            {isLevelUpVisible && <div className="levelup">
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
                <button className="retry-button" onClick={onRetry}>See Ads And Retry.</button>
            </div>
            }
        </div>
    );
}

export default ImageInfo;
