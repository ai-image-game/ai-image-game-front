import styles from '../css/Intro.module.css';
import Image from 'next/image';
import { Luckiest_Guy } from 'next/font/google'

const luckiestGuyFont = Luckiest_Guy({
    weight : "400",
    subsets : ["latin"]
});

function Intro({ onStart }) {
    return (
        <div className={styles.introContainer}>
            <div className={`${styles.gameTitle} ${luckiestGuyFont.className}`}>
                <h1 onClick={() => window.location.reload()}>AI IMAGE GAME</h1>
            </div>
            
            <div className={styles.description}>
                <p>
                Experience a creative twist on the classic Hangman game with our AI-powered image-based challenge!<br/>
                Fun, engaging, and alphabet skills for all ages!<br/>
                </p>
                
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <h3>🎨 AI Images</h3>
                        <p>Unique images by AI</p>
                    </div>
                    
                    <div className={styles.feature}>
                        <h3>🧩 Word Game</h3>
                        <p>Hangman-style play</p>
                    </div>
                    
                    <div className={styles.feature}>
                        <h3>🎮 Free Play</h3>
                        <p>No cost, unlimited games</p>
                    </div>
                    
                    <div className={styles.feature}>
                        <h3>🌟 Educational Perfect</h3>
                        <p>Boost your English skills</p>
                    </div>
                </div>
            </div>

            <button 
                className={styles.startButton}
                onClick={onStart}
                aria-label="Start playing AI Image Game"
            >
                Start
            </button>
        </div>
    );
}

export default Intro;