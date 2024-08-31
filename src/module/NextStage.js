function NextStage(setCurrentStageInfo, setTotalInfo) {
        setCurrentStageInfo ((prevState) => ({
            guessInfo : {
                currentGuess: null,
                answerIndexList: [],
                inputLetters: []
            },
            questionInfo : {
                answer : "********",
                prefix : "green",
                postfix : null
            },
            letters : prevState.guessInfo.letters.map(letterInfo => (
                {
                    letter : letterInfo.letter,
                    correct : null
                })
            )
        }));

        setTotalInfo((prevState) => ({
            gameInfo : {
                level : prevState.gameInfo.level,
                questions : prevState.gameInfo.questions - 1,
                corrects : prevState.gameInfo.corrects + 1
            },
            imageInfo : {
                mobileImage : "image2_mobile.jpg",
                pcImage : "image2.webp"
            }
        }));
}

export default NextStage;