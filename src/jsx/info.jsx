function Info({gameInfo}) {
    return (
        <div className="info-area">
            <p><b>Level</b>: {gameInfo.level}</p>
            <p><b>Questions</b>: {gameInfo.questions}</p>
            <p><b>Corrects</b>: {gameInfo.corrects}</p>
        </div>
    );
}

export default Info;