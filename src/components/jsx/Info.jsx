import styles from '../css/Info.module.css';
import { useState, useEffect, useRef } from 'react';

function Info({ gameInfo }) {
    const [correctChanged, setCorrectChanged] = useState(false);

    const updateCorrectCount = useRef(false);
    useEffect(() => {
        if (!updateCorrectCount.current) {
            updateCorrectCount.current = true;
            return;
        }
        setCorrectChanged(true);
        const timer = setTimeout(() => {
            setCorrectChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.corrects]);

    return (
        <div className={styles.infoArea}>
            <p>
                <b>Level</b>: {gameInfo.level === 0 ? '-' : gameInfo.level}</p>
            <div className={styles.expBar}>
                <div className={styles.expFill} style={{width: `${ gameInfo.corrects / (gameInfo.questions + gameInfo.corrects) * 100}%`}}>
                    { gameInfo.corrects !== 0 ?  `${gameInfo.corrects / (gameInfo.questions + gameInfo.corrects) * 100}%` : ''}
                </div>
            </div>
        </div>
    );
}

export default Info;