import styles from '../css/Footer.module.css';
function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.report}>
                <p><a href="https://discord.gg/wqraGzAfSh" target="_blank">Discord</a> <a href="https://www.instagram.com/ai.image.game/" target="_blank">Instagram</a></p>
            </div>
        </div>
    );
}

export default Footer;