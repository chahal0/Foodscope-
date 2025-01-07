import React, { useState, useEffect } from 'react';
import './MoodWheel.css';

function MoodWheel() {
  const moods = [
    { name: 'Energetic', angle: 22.5, icon: '⚡' },
    { name: 'Comforting', angle: 67.5, icon: '🛋️' },
    { name: 'Romantic', angle: 112.5, icon: '❤️' },
    { name: 'Adventurous', angle: 157.5, icon: '🧭' },
    { name: 'Relaxed', angle: 202.5, icon: '🌿' },
    { name: 'Focused', angle: 247.5, icon: '🎯' },
    { name: 'Cheerful', angle: 292.5, icon: '😊' },
    { name: 'Creative', angle: 337.5, icon: '🎨' },
  ];

  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);



  const handleMoodClick = (mood) => {
    alert(`You selected: ${mood}`);
  };

  const handleSpin = () => {
    if (isSpinning) return; // Prevent multiple spins
    setIsSpinning(true);
    const randomSpins = Math.floor(Math.random() * 10 + 5) * 360; // Random spins
    const finalRotation = randomSpins + Math.floor(Math.random() * 360); // Ensure random angle

    setWheelRotation((prev) => prev + finalRotation);

    // Stop spinning after animation
    setTimeout(() => {
      setIsSpinning(false);
      const selectedMoodIndex =
        Math.round(((wheelRotation + finalRotation) % 360) / 45) % 8;
      const selectedMood = moods[selectedMoodIndex]?.name || 'Unknown';
      alert(`You landed on: ${selectedMood}`);
    }, 4000); // Match with CSS animation duration
  };

  return (
    <div className="mood-wheel-container">
      <div className="mood-wheel">
        <div
          className="mood-wheel__center"
          style={{
            transform: `rotate(${wheelRotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
        >
          {moods.map((mood, index) => (
            <div
              key={index}
              className="mood-wheel__option"
              style={{
                transform: `rotate(${mood.angle}deg) translate(130px) rotate(-${mood.angle}deg)`,
              }}
            >
              <button
                className="mood-wheel__button"
                onClick={() => handleMoodClick(mood.name)}
                aria-label={mood.name}
              >
                <span className="mood-wheel__icon">{mood.icon}</span>
                <span className="mood-wheel__text">{mood.name}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="mood-wheel__dividers">
          {moods.map((_, index) => (
            <div
              key={index}
              className="mood-wheel__divider"
              style={{
                transform: `rotate(${index * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      <button
        className="mood-wheel__spin-button"
        onClick={handleSpin}
        disabled={isSpinning}
      >
        Spin
      </button>
    </div>
  );
}

export default MoodWheel;
