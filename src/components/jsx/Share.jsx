import styles from "../css/Share.module.css";

function Share({stageStatus, url}) {
    function copyTextToClipboard() {
        navigator.clipboard.writeText(url).then(function () {
            alert('This page URL has been copied.');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    }
    return (
        <div className={`${styles.shareArea} ${stageStatus.share ? styles.shareAreaPink : ''}`}>
            <a target="_blank" rel="noreferrer"
               href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">
                <img src="facebook_icon.png" className={`${styles.logo}`}/>
            </a>
            <a target="_blank" rel="noreferrer"
               href="https://twitter.com/intent/tweet?url=http://localhost:3000&text=Guess What? green _______">
                <img src="x-black_icon.png" className={styles.logo}/>
            </a>
            <a target="_blank" rel="noreferrer"
               href="https://api.whatsapp.com/send?text=여기에%20공유할%20텍스트를%20입력하세요%20{{current-page-url}}"
               target="_blank">
                <img src="whats-app_icon.png" className={styles.logo}/>
            </a>
            <img src="link_icon.png" className={`${styles.logo} ${styles.copy}`} onClick={copyTextToClipboard}/>
        </div>
    )
}
export default Share;