import React, { useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import styles from "./CookieBanner.module.css"

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [functionalCookies, setFunctionalCookies] = useState(true); // 기본값을 true로 설정하여 "OK" 클릭 시 활성화
    const [analyticsCookies, setAnalyticsCookies] = useState(true); // 기본값을 true로 설정하여 "OK" 클릭 시 활성화
    const [marketingCookies, setMarketingCookies] = useState(true); // 기본값을 true로 설정하여 "OK" 클릭 시 활성화

    const handleAcceptAll = () => {
        console.log("All cookies accepted.");
        setShowBanner(false);
        // 모든 쿠키 사용 동의 처리 로직
        /*window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });*/ //TODO GOOGLE ANALYTICS
    };

    const handleDeclineAll = () => {
        console.log("All cookies declined.");
        Cookies.remove("gameData"); // 게임 데이터를 저장하지 않도록 설정
        /*window.gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });*/ //TODO GOOGLE ANALYTICS
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        console.log("Preferences saved:", { functionalCookies, analyticsCookies, marketingCookies });
        /* window.gtag('consent', 'update', {
            'analytics_storage': analyticsCookies ? 'granted' : 'denied'
        }); */ //TODO Google Analytics
        setShowBanner(false);
    };

    return (
        <div>
            {showBanner && (
                    !showSettings ? (
                        // 간단한 초기 배너
                        <div className={styles.fixBanner}>
                            <p>We use cookies to enhance your experience, save your game progress, measure how the site is used, and provide personalized ads.</p>
                            <button onClick={handleAcceptAll} className={styles.primaryButton}>OK</button>
                            <button onClick={() => setShowSettings(true)} className={styles.secondaryButton}>Cookie Settings</button>
                        </div>
                    ) : (
                        // 쿠키 설정 옵션 표시
                        <div className={styles.cookieSettings}>
                            <p>Manage your cookie preferences:</p>
                            <div className={styles.cookieSettingsCheck}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={functionalCookies}
                                        onChange={() => setFunctionalCookies(!functionalCookies)}
                                    />
                                    Functional Cookies* (Required)
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={analyticsCookies}
                                        onChange={() => setAnalyticsCookies(!analyticsCookies)}
                                    />
                                    Analytics Cookies (Google Analytics)
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={marketingCookies}
                                        onChange={() => setMarketingCookies(!marketingCookies)}
                                    />
                                    Marketing Cookies
                                </label>
                            </div>
                            <div className={styles.cookieSettingsButtons}>
                                <button onClick={handleSavePreferences} className="primary-button">Save Preferences</button>
                                <button onClick={handleDeclineAll} className="secondary-button">Decline All</button>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default CookieBanner;