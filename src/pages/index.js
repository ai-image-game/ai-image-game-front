import Head from 'next/head';
import axios from 'axios';
import App from '../components/jsx/App';
import { getCurrentUrl, initOpenGraph } from '../common/InitImageGame';

export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie || '';

    const { req } = context;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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

    if (req.url.includes("?")) {
        const uuid = req.url.split('?')[1];
        imageGame = (await apiClient.get("/api/v1/image-game/" + uuid)).data;
    } else if (cookies !== '') {
        imageGame = (await apiClient.get("/api/v1/image-game/reconnect")).data;
    } else {
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
                <meta property="title" content="AI Image Game"/>
                <meta property="description" content={openGraph.description}/>
                <meta property="image" content={imageGame.imageInfo.mobileImage}/>

                {/* Facebook Open Graph Tags */}
                <meta property="og:title" content={openGraph.title}/>
                <meta property="og:description" content={openGraph.description}/>
                <meta property="og:image" content={imageGame.imageInfo.mobileImage}/>
                <meta property="og:url" content={openGraph.shareUrl}/>
                <meta property="og:type" content="website"/>

                {/* X (Twitter) Card Tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={openGraph.title}/>
                <meta name="twitter:description" content={openGraph.description}/>
                <meta name="twitter:image" content={imageGame.imageInfo.mobileImage}/>
                <meta name="twitter:site" content="@aiimagegame"/>
            </Head>
            <App imageGame={imageGame} currentUrl={currentUrl} wsUrl={process.env.NEXT_PUBLIC_WS_URL}/>
        </>
    );
}