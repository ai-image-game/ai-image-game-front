import styles from "../css/App.module.css";
import {useEffect} from "react";

function Adsense({isMobile}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const initializeAds = () => {
            let allLoaded = true;
            const ads = document.querySelectorAll(".adsbygoogle");
            if ((isMobile && ads.length !== 2) || (!isMobile && ads.length !== 3)) return;
            ads.forEach((ad) => {
                if (!ad.hasAttribute("data-ad-loaded")) {
                    allLoaded = false;
                    try {
                        window.adsbygoogle.push({});
                        ad.setAttribute("data-ad-loaded", "true");
                    } catch (e) {
                        console.error("Adsense error:", e);
                    }
                }
            });
            if (allLoaded) clearTimeout(timeout);
        };
        const timeout= setTimeout(initializeAds, 500);
    }, []);

    return (
        <>
            {isMobile ? (
                <div className={`${styles.adsense} ${styles.adsenseLeft}`}>
                    <ins
                        className="adsbygoogle"
                        style={{display: "block", width: "100%", height: "90px"}}
                        data-ad-client="ca-pub-4453438517391105"
                        data-ad-slot="7210187479"
                        data-ad-format="horizontal"
                    ></ins>
                </div>
            ) : (
                <>
                    <div className={`${styles.adsense} ${styles.adsenseLeft}`}>
                        <ins
                            className="adsbygoogle"
                            style={{display: "block", maxHeight: "240px"}}
                            data-ad-client="ca-pub-4453438517391105"
                            data-ad-slot="2220487198"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </div>
                    <div className={`${styles.adsense} ${styles.adsenseRight}`}>
                        <ins
                            className="adsbygoogle"
                            style={{display: "block", maxHeight: "240px"}}
                            data-ad-client="ca-pub-4453438517391105"
                            data-ad-slot="4079497804"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </div>
                </>
            )}
        </>
    );
}

export default Adsense;