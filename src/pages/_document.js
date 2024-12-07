import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=` + process.env.GTAG_ID}></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                     gtag('config', '` + process.env.GTAG_ID + `');
                     gtag('consent', 'default', {'analytics_storage': 'denied'});
                     `
                    }}
                />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}