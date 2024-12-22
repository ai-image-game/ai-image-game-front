import { useRef } from 'react';
import CookieBanner from './CookieBanner';
import styles from '../css/App.module.css';
import dynamic from "next/dynamic";
import ImageGame from "./ImageGame";

function App({imageGame, currentUrl, serverUrl}) {
  const appRef = useRef(null);
  const AdSenseArea = dynamic(() => import("./Adsense"), { ssr: false });

  return (<div className={styles.app} ref={appRef} tabIndex="0">
        <div className={styles.container}>
          <AdSenseArea />
          <ImageGame imageGame={imageGame} currentUrl={currentUrl} serverUrl={serverUrl}/>
          <CookieBanner/>
        </div>
      </div>
  );
}

export default App;
