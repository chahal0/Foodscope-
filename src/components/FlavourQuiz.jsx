import React, { useState } from 'react';
import './FlavourQuiz.css';

// Define questions
const questions = [
  {
    question: "🍫 What flavor is associated with chocolate?",
    correctAnswer: "sweet",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
  {
    question: "🍋 Which flavor is typically found in lemons?",
    correctAnswer: "sour",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
  {
    question: "🌶️ What flavor is associated with chili peppers?",
    correctAnswer: "spicy",
    choices: ["Sweet", "Salty", "Bitter", "Spicy"],
  },
  {
    question: "🌸 Which flavor is associated with vanilla?",
    correctAnswer: "sweet",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
];

// Get a random question
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

const QuickFlavorQuiz = () => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [referralCount, setReferralCount] = useState(0);
  const [referralLink, setReferralLink] = useState('');

  // Generate a default random referral link
  const generateReferralLink = () => {
    const referralCode = Math.random().toString(36).substring(2, 10);
    const link = `https://flavorquiz.com/?ref=${referralCode}`;
    setReferralLink(link);
  };

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Check if the score is a multiple of 7
      if (newScore % 7 === 0) {
        setFeedback(`🎉 Awesome! You reached ${newScore} 🎉`);
      } else {
        setFeedback('🎉 Correct! Well done!');
      }
    } else {
      setFeedback('❌ Oops! Try again.');
    }

    setTimeout(() => {
      setFeedback('');
      setCurrentQuestion(getRandomQuestion());
    }, 1500);
  };

  const handleReferral = () => {
    setReferralCount(referralCount + 1);
    generateReferralLink();
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🌟 Quick Flavor Quiz 🌟</h1>
      <p id="question" className="question">{currentQuestion.question}</p>
      <div className="choices">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className="choice animated-choice"
            onClick={() => checkAnswer(choice.toLowerCase())}
          >
            {choice}
          </button>
        ))}
      </div>
      <div id="feedback" className="feedback">{feedback}</div>
      <div id="score" className="score">🎯 Score: {score}</div>

      <div className="referral-section">
        <h2 className="referral-title">💌 Refer and Earn!</h2>
        <p>🌟 Share with friends and unlock rewards!</p>
        <button onClick={handleReferral} className="btn-refer">
          🚀 Refer Now
        </button>
        <p>📈 Referral Count: {referralCount}</p>
        {referralLink && (
          <div>
            <p>🔗 Your Referral Link:</p>
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
              📋 Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const UserDashboard = ({ badges }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🎖️ Your Achievements</h1>
      {badges.length > 0 ? (
        <ul className="badges-list">
          {badges.map((badge, index) => (
            <li key={index} className="badge-item">
              {badge}
            </li>
          ))}
        </ul>
      ) : (
        <p>🚀 No badges earned yet. Keep playing!</p>
      )}
    </div>
  );
};

export default QuickFlavorQuiz;
