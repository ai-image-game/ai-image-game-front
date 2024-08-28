function HangMan({wrongCount}) {
    return  (
    <div className="hangman-area">
        <div className={`hangman-part hangman-base ${wrongCount > 6 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-pole ${wrongCount > 7 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-beam ${wrongCount > 8 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-rope ${wrongCount > 9 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-head ${wrongCount > 0 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-body ${wrongCount > 1 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-left-arm ${wrongCount > 2 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-right-arm ${wrongCount > 3 ? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-left-leg ${wrongCount > 4? 'visible' : ''}`}></div>
        <div className={`hangman-part hangman-right-leg ${wrongCount > 5 ? 'visible' : ''}`}></div>
    </div>);
}

export default HangMan;