import React, {useState, useEffect, useRef} from 'react';
import '../css/ImageInfo.css'

function ImageInfo({isCorrect, isLevelUp, imageInfo}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isCorrectVisible, setIsCorrectVisible] = useState(false);
    const [isLevelUpVisible, setIsLevelUpVisible] = useState(false);
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
        if (isLevelUp) {
            setIsLevelUpVisible(true);
        }
        if (imgRef.current) {
            imgRef.current.onload = () => {
                setIsLevelUpVisible(false);
            };
        }

        if (isCorrect) {
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

        return () => { clearTimeout(timer) }
    }, [isCorrect, isLevelUp]);

    return (
        <div className={`image-area ${isCorrect ? 'bright' : ''}`}>
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
        </div>
    );
}

export default ImageInfo;
