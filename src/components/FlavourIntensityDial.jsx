const QuickFlavorQuiz = () => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [referralCount, setReferralCount] = useState(0);
  const [referralLink, setReferralLink] = useState('');

  const generateReferralLink = () => {
    const referralCode = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.href}?ref=${referralCode}`;
    setReferralLink(link);
  };

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setFeedback('Correct! 🎉');
      setScore(score + 1);
    } else {
      setFeedback('Oops! Try again. ❌');
    }

    setTimeout(() => {
      setFeedback('');
      setCurrentQuestion(getRandomQuestion());
    }, 1500);
  };

  const handleReferral = () => {
    const newCount = referralCount + 1;
    setReferralCount(newCount);
    generateReferralLink();
  };

  const isCelebrationTriggered = referralCount > 0 && referralCount % 7 === 0;

  return (
    <div className="quiz-container">
      <h1>Quick Flavor Quiz</h1>

      {/* Question Section */}
      <p id="question">{currentQuestion.question}</p>
      <div className="choices">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className="choice"
            onClick={() => checkAnswer(choice.toLowerCase())}
          >
            {choice}
          </button>
        ))}
      </div>
      <div id="feedback">{feedback}</div>
      <div id="score">Score: {score}</div>

      {/* Referral Section */}
      <div className="referral-section">
        <h2>Refer and Earn</h2>
        <p>Refer friends and earn points for rewards!</p>
        <button onClick={handleReferral} className="btn-refer">
          Refer Now
        </button>
        <p>Referral Count: {referralCount}</p>
        {referralLink && (
          <div>
            <p>Share this referral link:</p>
            <input
              type="text"
              value={referralLink}
              readOnly
              className="referral-link"
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="btn-copy"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* Celebration Overlay */}
      {isCelebrationTriggered && (
        <div className="emoji-overlay">
          {Array.from({ length: 50 }).map((_, index) => (
            <span key={index} className="joy-emoji">
              {index % 5 === 0 ? '🎉' : index % 4 === 0 ? '🎁' : index % 3 === 0 ? '🍀' : '🥳'}
            </span>
          ))}
        </div>
      )}

      {/* Progress Section */}
      <div className="badges-section">
        <h2>Your Progress</h2>
        <div className={`points-card ${isCelebrationTriggered ? 'celebrate' : ''}`}>
          <p>🎉 Thank you! You've earned {referralCount} point(s)!</p>
          <p>Earn more points to unlock exclusive perks.</p>
        </div>
      </div>
    </div>
  );
};
