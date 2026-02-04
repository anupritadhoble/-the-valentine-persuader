
import React, { useState } from 'react';
import { AppState } from './types';
import { NO_STAGES, SARCASTIC_YES_MESSAGES, FINAL_ULTIMATUM } from './constants';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppState>('asking');
  const [noCount, setNoCount] = useState(0);
  const [noButtonHidden, setNoButtonHidden] = useState(false);
  const [showSarcasticPop, setShowSarcasticPop] = useState(false);
  const [randomSassyMessage, setRandomSassyMessage] = useState('');

  const handleNoClick = () => {
    if (noCount >= NO_STAGES.length - 1) {
      setNoButtonHidden(true);
    } else {
      setNoCount(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    if (noCount === 0) {
      setRandomSassyMessage(SARCASTIC_YES_MESSAGES[Math.floor(Math.random() * SARCASTIC_YES_MESSAGES.length)]);
      setShowSarcasticPop(true);
      setTimeout(() => {
        setShowSarcasticPop(false);
        setStage('celebrating');
      }, 2500);
    } else {
      setStage('celebrating');
    }
  };

  // Adjusted scale to grow more gradually across 10 steps
  // It starts at 1.0 and reaches ~3.0 at stage 10, then huge at ultimatum
  const yesScale = noButtonHidden ? 5 : 1 + (noCount * 0.22);
  const currentNoStage = NO_STAGES[Math.min(noCount, NO_STAGES.length - 1)];

  if (stage === 'celebrating') {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="z-10 bg-white p-8 rounded-3xl shadow-2xl border-4 border-pink-300 max-w-lg w-full transform transition-all">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6 fancy-font">
            YAY! I KNEW IT! ❤️
          </h1>
          <div className="mb-6 flex justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}relationship-love.gif`}
              alt="Lovely Bugs Bunny" 
              className="rounded-xl shadow-lg w-96 h-84 object-cover border-4 border-pink-200"
              onError={(e) => {
                // Prevent infinite loop and fall back to the JPG in public (respecting base)
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `${import.meta.env.BASE_URL}relationship-love.jpg`;
              }}
            />
          </div>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            See? It was meant to be! 🌹✨
          </p>
          <p className="text-sm text-pink-400 italic">
            (P.S. There are no refunds on this 'Yes'. It's legally binding in the Kingdom of Love.)
          </p>
        </div>
        <footer className="mt-8 text-gray-400 text-xs font-semibold uppercase tracking-widest">
           Made by your favourite person ❤️
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center bg-pink-50 overflow-hidden">
      {showSarcasticPop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-pink-500">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">CONFIDENT MUCH? 🤨</h2>
            <p className="text-xl text-gray-800 italic font-medium">"{randomSassyMessage}"</p>
          </div>
        </div>
      )}

      <div className="z-10 bg-white p-8 md:p-16 rounded-[40px] shadow-xl border-2 border-pink-100 max-w-3xl w-full transition-all duration-500">
        <header className="mb-4">
          <div className="flex justify-center mb-4 text-7xl">
            {noButtonHidden ? '😈' : '💌'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-6 fancy-font leading-tight">
            {noButtonHidden ? "No Escape Now!" : "Will you be my Valentine?"}
          </h1>
          <div className="min-h-[3rem] flex items-center justify-center">
            <p className="text-lg md:text-2xl text-gray-700 font-medium italic px-4">
              {noButtonHidden ? FINAL_ULTIMATUM : currentNoStage.subtext || "I promise it'll be fun! ✨"}
            </p>
          </div>
        </header>

        {/* Increased vertical gap to allow Yes button to grow without covering No button too early */}
        <div className="flex flex-col items-center justify-center gap-16 mt-4 min-h-[300px]">
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleYesClick}
              style={{ transform: `scale(${yesScale})` }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-5 px-12 rounded-full shadow-lg transition-all duration-300 z-20 whitespace-nowrap text-xl"
            >
              YES! 😍
            </button>
          </div>

          {!noButtonHidden ? (
            <div className="flex items-center justify-center">
              <button
                onClick={handleNoClick}
                className="bg-gray-50 hover:bg-gray-100 text-gray-500 font-semibold py-3 px-8 rounded-full border border-gray-200 shadow-sm transition-all duration-300 text-md"
              >
                {currentNoStage.text}
              </button>
            </div>
          ) : null}
        </div>

        {noCount > 0 && !noButtonHidden && (
          <div className="mt-4 text-pink-400 font-bold tracking-widest text-sm uppercase">
            Resistance is futile...
          </div>
        )}
      </div>

    </div>
  );
};

export default App;
