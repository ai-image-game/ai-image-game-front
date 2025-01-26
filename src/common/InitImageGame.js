export function getCurrentUrl(req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    return `${protocol}://${host}${req.url}`;
}

export function initGuessInfo() {
    return {input: "", wrongLetters: [], answerIndexList: []};
}

export function initLetters() {
    return "abcdefghijklmnopqrstuvwxyz'".split("").map((letter) => ({letter: letter, correct: null}));
}

export function initOpenGraph(imageGameInfo, currentUrl) {
    const rootUrl = currentUrl.includes("?") ? currentUrl.split("?")[0] : currentUrl;
    return {
        title: "Guess What? "
            + (imageGameInfo.questionInfo.prefix || "")
            + imageGameInfo.questionInfo.maskedAnswer.replaceAll("*", "_")
            + (imageGameInfo.questionInfo.postfix || ""),
        description: "Solve fun and creative image artworks. Can you guess the word before it's too late?",
        shareUrl: rootUrl + "?id=" + imageGameInfo.imageInfo.uuid
    };
}

export function shouldShowIntro(cookies, url, previousDomain) {
    let currentDomain = url.hostname;
    return cookies.includes("savedData") === false
        && url.searchParams.get("id") === null
        && (previousDomain.includes(currentDomain) === false
        || (typeof document !== 'undefined' && document.referrer.includes(window.location.hostname) === false));
}