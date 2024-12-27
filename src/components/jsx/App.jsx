import {useEffect, useRef, useState} from 'react';
import CookieBanner from './CookieBanner';
import styles from '../css/App.module.css';
import dynamic from "next/dynamic";
import ImageGame from "./ImageGame";

function App({imageGame, currentUrl, serverUrl}) {
  const appRef = useRef(null);
  const AdSenseArea = dynamic(() => import("./Adsense"), { ssr: false });
  const [isMobile, setIsMobile] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);

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

  return (<div className={styles.app} ref={appRef} tabIndex="0">
        <div className={styles.container}>
          <AdSenseArea isMobile={isMobile}/>
          <ImageGame imageGame={imageGame} currentUrl={currentUrl} serverUrl={serverUrl} isMobile={isMobile} analyticsCookies={analyticsCookies}/>
          <CookieBanner analyticsCookies={analyticsCookies} setAnalyticsCookies={setAnalyticsCookies}/>
        </div>
      </div>
  );
}

export default App;
