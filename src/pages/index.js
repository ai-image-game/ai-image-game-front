import Head from 'next/head';
import axios from 'axios';
import App from '../components/jsx/App';
import {getCurrentUrl, initOpenGraph} from '../common/InitImageGame';

export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || '';
    console.log("### private url ### ", process.env.PRIVATE_SERVER_URL)
    const { req } = context;
    const BASE_URL = process.env.PRIVATE_SERVER_URL;
    const apiClient = axios.create({
        baseURL: BASE_URL, // API의 기본 URL
        timeout: 10000, // 요청 제한 시간 (ms)
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    });

    apiClient.interceptors.request.use(request => {
        request.headers['Cookie'] = cookies;
        return request;
    });

    let imageGame = null;

    const url = new URL(req.url, BASE_URL);
    if (url.searchParams.get("id")) {
        const uuid = url.searchParams.get("id");
        imageGame = (await apiClient.get("/api/v1/image-game/" + uuid)).data;
    } else if (cookies.includes("savedData")) {
        imageGame = (await apiClient.get("/api/v1/image-game/reconnect")).data;
    }
    if (imageGame == null) {
        imageGame = (await apiClient.put("/api/v1/image-game", {})).data;
    }

    const currentUrl = getCurrentUrl(req);
    return { props: { imageGame: imageGame, currentUrl : currentUrl } };
}
export default function Home({imageGame, currentUrl}) {
    const openGraph = initOpenGraph(imageGame, currentUrl);

    return (
        <>
            <Head>
                <title>AI Image Game</title>
                <meta property="title" content="Fun and Challenging AI-Based Image Hangman Game - AI Image Game"/>
                <meta property="description"
                      content="Play a fun, AI-powered image-based hangman game! Use creative image clues to guess words and enjoy free, exciting gameplay online. Test your skills today!"/>
                <meta property="image" content={imageGame.imageInfo.snsImage}/>

                {/* Facebook Open Graph Tags */}
                <meta property="og:title" content={openGraph.title}/>
                <meta property="og:description" content={openGraph.description}/>
                <meta property="og:image" content={imageGame.imageInfo.snsImage}/>
                <meta property="og:image:alt" content={openGraph.title}/>
                <meta property="og:url" content={openGraph.shareUrl}/>
                <meta property="og:type" content="website"/>

                {/* X (Twitter) Card Tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={openGraph.title}/>
                <meta name="twitter:description" content={openGraph.description}/>
                <meta name="twitter:image" content={imageGame.imageInfo.snsImage}/>
                <meta name="twitter:site" content="@aiimagegame"/>
            </Head>
            <App imageGame={imageGame} currentUrl={currentUrl} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}/>
        </>
    );
}