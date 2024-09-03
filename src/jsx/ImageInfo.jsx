import React, {useState, useEffect, useRef} from 'react';
import '../css/Congratulation.css'

function ImageInfo({isCorrect, imageInfo}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isCongratulation, setIsCongratulation] = useState(false);
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
        if (isCorrect) {
            timer = setTimeout(() => {
                setIsCongratulation(true);
            }, 1000);
        } else {
            if (imgRef.current) {
                imgRef.current.onload = () => {
                    setIsCongratulation(false);
                };
            }
        }

        return () => { clearTimeout(timer) }
    }, [isCorrect]);

    return (
        <div className={`image-area ${isCorrect ? 'bright' : ''}`}>
            <img ref={imgRef} src={isMobile ? imageInfo.mobileImage : imageInfo.pcImage}/>
            {isCongratulation && <div className="correct">
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
        </div>
    );
}

export default ImageInfo;
