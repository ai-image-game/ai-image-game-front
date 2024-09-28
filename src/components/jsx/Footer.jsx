import styles from '../css/Footer.module.css';
function Footer({stageStatus, url}) {
    function copyTextToClipboard() {
        navigator.clipboard.writeText(url).then(function () {
            alert('This page URL has been copied.');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    }

    console.log("stageStatus.share : " + stageStatus.share);

    return (
        <div className={styles.footer}>
            <div className={`${styles.shareArea} ${stageStatus.share ? styles.shareAreaPink : ''}`}>
                <a target="_blank" rel="noreferrer"
                   href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">
                    <img src="facebook.png" className={`${styles.logo} ${styles.fb}`}/>
                </a>
                <a target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?url=http://localhost:3000&text=Guess What? green _______">
                    <img src="x-black.png" className={styles.logo}/>
                </a>
                <a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?text=여기에%20공유할%20텍스트를%20입력하세요%20{{current-page-url}}"
                   target="_blank">
                    <img src="whats-app.png" className={styles.logo}/>
                </a>
                <img src="link.png" className={`${styles.logo} ${styles.copy}`} onClick={copyTextToClipboard}/>
            </div>
            <div className={styles.report}>
                <p>Bug report to <a href="mailto:blarblar@gmail.com">blarblar@gmail.com</a></p>
            </div>
        </div>
    )
        ;
}

export default Footer;