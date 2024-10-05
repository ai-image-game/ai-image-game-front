import styles from '../css/Info.module.css';
import { useState, useEffect, useRef } from 'react';

function Info({ gameInfo }) {
    const [correctChanged, setCorrectChanged] = useState(false);
    const [levelChanged, setLevelChanged] = useState(false);
    const [questionsChanged, setQuestionsChanged] = useState(false);
    const [retryChanged, setRetryChanged] = useState(false);

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

    const updateLevelCount = useRef(false);
    useEffect(() => {
        if (!updateLevelCount.current) {
            updateLevelCount.current = true;
            return;
        }

        setLevelChanged(true);
        const timer = setTimeout(() => {
            setLevelChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.level]);

    const updateQuestionCount = useRef(false);
    useEffect(() => {
        if (!updateQuestionCount.current) {
            updateQuestionCount.current = true;
            return;
        }

        setQuestionsChanged(true);
        const timer = setTimeout(() => {
            setQuestionsChanged(false);
        }, 3000);

        return () => { clearTimeout(timer); };
    }, [gameInfo.questions]);

    const updateRetryCount = useRef(false);
    useEffect(() => {
        if (!updateRetryCount.current) {
            updateRetryCount.current = true;
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