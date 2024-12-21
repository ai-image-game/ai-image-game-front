import { memo, useEffect, useRef } from "react";
import styles from "../css/App.module.css";

let isMobile;
const Adsense = memo(() => {
    const adsInitialized = useRef(false);

    useEffect(() => {
        if (!adsInitialized.current) {
            const ads = document.querySelectorAll(".adsbygoogle");
            ads.forEach((ad) => {
                if (!ad.getAttribute("data-ad-loaded")) {
                    try {
                        if (typeof window !== "undefined" && window.adsbygoogle) {
                            isMobile = window.innerWidth <= 768; // 로컬 변수로 관리
                            window.adsbygoogle.push({});
                            ad.setAttribute("data-ad-loaded", "true"); // 초기화 플래그 설정
                            window.alert(isMobile);
                        }
                    } catch (e) {
                        console.error("Adsense error:", e);
                    }
                }
            });
            adsInitialized.current = true; // 초기화 완료
        }
    }, []); // 빈 배열로 한 번만 실행

    return (
        <>
            {isMobile ? (
                <div className={`${styles.adsense} ${styles.adsenseLeft}`}>
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "90px" }}
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
                            style={{ display: "block", maxHeight: "240px" }}
                            data-ad-client="ca-pub-4453438517391105"
                            data-ad-slot="2220487198"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </div>
                    <div className={`${styles.adsense} ${styles.adsenseRight}`}>
                        <ins
                            className="adsbygoogle"
                            style={{ display: "block", maxHeight: "240px" }}
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
});

export default Adsense;