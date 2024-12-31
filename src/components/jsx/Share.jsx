import styles from "../css/Share.module.css";

function Share({stageStatus, url}) {
    function copyTextToClipboard() {
        if (typeof navigator == "undefined") {
            console.log("navigator is undefined.");
            return;
        }
        if (!navigator.clipboard) {
            alert('Sorry! Could not copy text.');
            return;
        }

        navigator.clipboard.writeText(url).then(function () {
            alert('This page URL has been copied.');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    }
    return (
            <div className={`${styles.shareArea} ${stageStatus.share ? styles.shareAreaPink : ''}`}>
                <a target="_blank" rel="noreferrer"
                   href={`'https://www.facebook.com/sharer/sharer.php?u='${url}';src=sdkpreparse'`}>
                    <img src="facebook_icon.png" className={`${styles.logo}`}/>
                </a>
                <a target="_blank" rel="noreferrer"
                   href={`'https://twitter.com/intent/tweet?url='${url}'&text=Guess What It Is!'`}>
                    <img src="x-black_icon.png" className={styles.logo}/>
                </a>
                <a target="_blank" rel="noreferrer"
                   href={`'https://api.whatsapp.com/send?text=Guess What It Is! ${url}'`}
                   target="_blank">
                    <img src="whats-app_icon.png" className={styles.logo}/>
                </a>
                <img src="link_icon.png" className={`${styles.logo} ${styles.copy}`} onClick={copyTextToClipboard}/>
            </div>
    )
}

export default Share;