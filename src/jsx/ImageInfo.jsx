import React, {useState, useEffect} from 'react';
import '../css/Congratulation.css'

function ImageInfo({isCorrect, imageInfo}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isCongratulation, setIsCongratulation] = useState(false);
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
        let changedTimer;
        if (isCorrect) {
            changedTimer = setTimeout(() => {
                setIsCongratulation(true);
            }, 1000);
        }

        const initTimer = setTimeout(() => {
            setIsCongratulation(false);
        }, 4000);

        return () => {  clearTimeout(changedTimer) && clearTimeout(initTimer);}
    }, [isCorrect]);

    return (
        <div className={`image-area ${isCorrect ? 'bright' : ''}`}>
            {isCongratulation ? <img className="correctImg" src={isMobile ? 'Correct_mobile.jpg' : 'Correct.jpg'}/>
                : <img src={isMobile ? imageInfo.mobileImage : imageInfo.pcImage}/>
            }
            {isCongratulation &&
                <div className="particle-container">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            }

        </div>
    );
}

export default ImageInfo;
