import React, { useState } from 'react';
import { Cookies } from 'react-cookie-consent';
import styles from '../css/CookieBanner.module.css';

let useFunctionCookies = null;

const CookieBanner = ({isSharedLink, analyticsCookies, setAnalyticsCookies}) => {
    const [showBanner, setShowBanner] = useState(!isSharedLink);
    const [showSettings, setShowSettings] = useState(false);
    const [functionalCookies, setFunctionalCookies] = useState(true);
    const [marketingCookies, setMarketingCookies] = useState(true);

    const handleAcceptAll = () => {
        setShowBanner(false);
        useFunctionCookies = true;

        window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
        });
    };

    const handleDeclineAll = () => {
        Cookies.remove("savedData");
        window.gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        useFunctionCookies = functionalCookies;
        window.gtag('consent', 'update', {
            'analytics_storage': analyticsCookies ? 'granted' : 'denied'
        });
        if (analyticsCookies) {
            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
            });
        }
        setShowBanner(false);
    };

    return (
        <div>
            {showBanner && (
                    !showSettings ? (
                        <div className={styles.fixBanner}>
                            <p>We use cookies to enhance your experience, save your game progress, measure how the site is used, and provide personalized ads.</p>
                            <button onClick={handleAcceptAll} className={styles.primaryButton}>OK</button>
                            <button onClick={() => setShowSettings(true)} className={styles.secondaryButton}>Cookie Settings</button>
                        </div>
                    ) : (
                        <div className={styles.cookieSettings}>
                            <p>We use cookies for the following three purposes:</p>
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
                                    Analytics Cookies
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

                            <p className={styles.info}>Our website values your privacy and complies with GDPR regulations.</p>
                            <p className={styles.info}>For more information, please refer to our <a href="/cookieConsent" className={styles.infoLink}>Privacy Policy</a></p>

                            <div className={styles.cookieSettingsButtons}>
                                <button onClick={handleSavePreferences} className={styles.primaryButton}>Save
                                    Preferences
                                </button>
                                <button onClick={handleDeclineAll} className={styles.secondaryButton}>Decline All
                                </button>
                            </div>
                        </div>
                    )
            )
            }
        </div>
    );
};

export function changeCookie(serverUrl, imageGameInfo) {
    if (useFunctionCookies === null) return;

    if (useFunctionCookies) {
        fetch(serverUrl + '/api/v1/image-game/save', {
            method : 'POST',
            credentials: 'include',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(imageGameInfo),
        })
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
    } else {
        Cookies.remove("savedData");
    }
}

export default CookieBanner;