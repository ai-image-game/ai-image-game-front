// pages/privacy-policy.js
import Link from 'next/link';
import styles from './styles/CookieConsent.module.css'

const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <a className={styles.homeButton} href="/">Home</a>
            <h1 className={styles.title}>Privacy Policy</h1>
            <h2 className={styles.subTitle}>1. Types of Personal Information Collected</h2>
            <p className={styles.info}>We may collect the following types of personal information during your visit and use of our website:</p>
            <ul>
                <li className={styles.list}><strong>Game Progress Data</strong>: Information about game progress to provide personalized service.</li>
                <li className={styles.list}><strong>Cookie Data</strong>: Information collected through cookies used for functional, analytical, and advertising purposes.</li>
                <li className={styles.list}><strong>Analytics Data</strong>: Website usage data, such as IP address, browser type, and page visit history, collected through Google Analytics for statistical purposes.</li>
                <li className={styles.list}><strong>Advertising Data</strong>: Data collected through Google Ad Manager to provide personalized advertisements.</li>
            </ul>

            <h2 className={styles.subTitle}>2. Purpose of Using Personal Information</h2>
            <p className={styles.info}>We use collected personal information only for the following purposes:</p>
            <ul>
                <li className={styles.list}><strong>Service Provision</strong>: To save game progress and enhance website functionality.</li>
                <li className={styles.list}><strong>User Experience Analysis</strong>: To improve the website experience based on analytics data from Google Analytics.</li>
                <li className={styles.list}><strong>Advertising</strong>: To provide personalized ads through Google Ad Manager.</li>
            </ul>

            <h2 className={styles.subTitle}>3. Sharing and Disclosure of Personal Information</h2>
            <p className={styles.info}>We do not share your personal information with third parties without your consent. However, third-party service providers, such as Google Analytics and Google Ad Manager, may collect some data through cookies, which is managed according to their privacy policies.</p>

            <h2 className={styles.subTitle}>4. Retention Period of Personal Information</h2>
            <p className={styles.info}>Personal information collected is retained only for the period necessary to fulfill the purposes outlined. Once these purposes are met, the data is safely deleted in compliance with applicable laws. Game progress data is accessible when you revisit the website, and analytical and advertising cookies are retained until you disable them in settings.</p>

            <h2 className={styles.subTitle}>5. User Rights</h2>
            <p className={styles.info}>You have the following rights regarding your personal information:</p>
            <ul>
                <li className={styles.list}><strong>Right of Access</strong>: The right to access your personal information.</li>
                <li className={styles.list}><strong>Right to Rectification and Erasure</strong>: The right to correct or delete inaccurate or unnecessary personal information.</li>
                <li className={styles.list}><strong>Right to Restrict Processing</strong>: The right to request limitations on the processing of personal data.</li>
                <li className={styles.list}><strong>Right to Withdraw Consent</strong>: The right to withdraw consent for optional cookies, such as analytics and advertising cookies.</li>
            </ul>

            <h2 className={styles.subTitle}>6. Cookie Settings</h2>
            <p className={styles.info}>You may disable analytics and advertising cookies in the website settings. Functional cookies are essential for service delivery and cannot be disabled.</p>

            <h2 className={styles.subTitle}>7. Contact for Privacy Inquiries</h2>
            <p className={styles.info}>If you have questions regarding data protection or wish to exercise your rights, please contact us at <strong>ai.image.game@gmail.com</strong>.</p>

            <h2 className={styles.subTitle}>8. Policy Changes</h2>
            <p className={styles.info}>This Privacy Policy may be updated to reflect changes in laws or our service policies. Updates will be posted on this page.</p>
        </div>
    );
};

export default PrivacyPolicy;
