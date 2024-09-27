// pages/_app.js
import './styles/global.css';  // 글로벌 CSS 적용

function AiImageGame({ Component, pageProps }) {
    return (
            <Component {...pageProps} />
    );
}

export default AiImageGame;