import styles from '../css/Footer.module.css';
function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.report}>
                <p>Bug report to <a href="mailto:ai.image.game@gmail.com">ai.image.game@gmail.com</a></p>
            </div>
        </div>
    )
        ;
}

export default Footer;