import styles from '../css/Info.module.css';
import { useState, useEffect, useRef } from 'react';

function Info({ gameInfo }) {
    const [correctChanged, setCorrectChanged] = useState(false);
    const [levelChanged, setLevelChanged] = useState(false);
    const [questionsChanged, setQuestionsChanged] = useState(false);
    const [retryChanged, setRetryChanged] = useState(false);

    const updateCorrectCount = useRef(0);
    useEffect(() => {
        if (updateCorrectCount.current < 2) {
            updateCorrectCount.current ++;
            return;
        }
        setCorrectChanged(true);
        const timer = setTimeout(() => {
            setCorrectChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.corrects]);

    const updateLevelCount = useRef(0);
    useEffect(() => {
        if (updateLevelCount.current < 2) {
            updateLevelCount.current ++;
            return;
        }

        setLevelChanged(true);
        const timer = setTimeout(() => {
            setLevelChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.level]);

    const updateQuestionCount = useRef(0);
    useEffect(() => {
        if (updateQuestionCount.current < 2) {
            updateQuestionCount.current ++;
            return;
        }

        setQuestionsChanged(true);
        const timer = setTimeout(() => {
            setQuestionsChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.questions]);

    const updateRetryCount = useRef(0);
    useEffect(() => {
        if (updateRetryCount.current < 2) {
            updateRetryCount.current ++;
            return;
        }

        setRetryChanged(true);
        const timer = setTimeout(() => {
            setRetryChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.retry]);

    return (
        <div className={styles.infoArea}>
            <p className={`${levelChanged ? styles.changed : ''}`}>
                <b>Level</b>: {gameInfo.level === 0 ? '-' : gameInfo.level}</p>
            <p className={`${questionsChanged ? styles.changed : ''}`}>
                <b>Questions</b>: {gameInfo.level === 0 ? '-' : gameInfo.questions}</p>
            <p className={`${correctChanged ? styles.changed : ''}`}>
                <b>Corrects</b>: <span>{gameInfo.level === 0 ? '-' : gameInfo.corrects}</span></p>
            <p className={`${retryChanged ? styles.changed : ''}`}>
                <b>Retry</b>: <span>{gameInfo.level === 0 ? '-' : gameInfo.retry}</span></p>
        </div>
    );
}

export default Info;