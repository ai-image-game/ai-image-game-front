import {useEffect, useRef, useState} from 'react';
import CookieBanner from './CookieBanner';
import styles from '../css/App.module.css';
import dynamic from "next/dynamic";
import ImageGame from "./ImageGame";
import Intro from "./Intro";

function App({imageGame, currentUrl, serverUrl, showIntro}) {
  const appRef = useRef(null);
  const AdSenseArea = dynamic(() => import("./Adsense"), { ssr: false });
  const [isMobile, setIsMobile] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [gameStarted, setGameStarted] = useState(!showIntro);

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

  return (
    <div className={styles.app} ref={appRef} tabIndex="0">
      <div className={styles.container}>
        <AdSenseArea isMobile={isMobile}/>
        {(showIntro && !gameStarted) ? (
          <Intro onStart={() => setGameStarted(true)}/>
        ) : (
          <>
            <ImageGame 
              imageGame={imageGame} 
              currentUrl={currentUrl} 
              serverUrl={serverUrl} 
              isMobile={isMobile} 
              analyticsCookies={analyticsCookies}
            />
            {/*<CookieBanner
              isSharedLink={currentUrl.includes("?id=")}
              analyticsCookies={analyticsCookies}
              setAnalyticsCookies={setAnalyticsCookies}
            />*/}
          </>
        )}
      </div>
    </div>
  );
}

export default App;