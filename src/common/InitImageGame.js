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
        description: "Guess this image created by Chat GPT",
        shareUrl: rootUrl + "?" + imageGameInfo.imageInfo.uuid
    };
}