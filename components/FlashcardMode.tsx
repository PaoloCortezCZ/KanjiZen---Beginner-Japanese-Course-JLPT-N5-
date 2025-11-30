
import React, { useState, useEffect } from 'react';
import { KanjiDef } from '../types';
import { kanjiList } from '../data/kanjiData';
import { kanaList } from '../data/kanaData';
import { speakJapanese } from '../utils/audio';
import { ArrowLeft, ArrowRight, RotateCw, Shuffle, Volume2, Hand, ArrowRightLeft } from 'lucide-react';

interface FlashcardModeProps {
  category: string;
  onClose: () => void;
}

const FlashcardMode: React.FC<FlashcardModeProps> = ({ category, onClose }) => {
  const [cards, setCards] = useState<KanjiDef[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'EN_JP' | 'JP_EN'>('EN_JP');

  useEffect(() => {
    // Combine lists and filter by category
    const allCards = [...kanjiList, ...kanaList];
    const filtered = allCards.filter(k => k.category === category);
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [category]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'EN_JP' ? 'JP_EN' : 'EN_JP');
    setIsFlipped(false);
  };

  if (cards.length === 0) return <div>No cards found for this chapter.</div>;

  const currentCard = cards[currentIndex];
  const mainSentence = currentCard.sentences?.[0];
  const isKana = currentCard.level === 'Kana';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      {/* Header controls */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <button onClick={onClose} className="text-stone-500 hover:text-ink-900 flex items-center font-sans">
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
        </button>
        
        {/* Mode Toggle */}
        <button 
            onClick={toggleMode}
            className="flex items-center px-4 py-1.5 bg-white border border-stone-300 rounded-full text-xs font-bold text-ink-700 hover:border-hanko-red hover:text-hanko-red transition-all shadow-sm"
        >
            <ArrowRightLeft className="w-3 h-3 mr-2" />
            {mode === 'EN_JP' ? 'English → Japanese' : 'Japanese → English'}
        </button>

        <div className="text-sm font-bold text-stone-400 uppercase tracking-wider">
            {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Card Container */}
      <div className="relative w-full max-w-sm h-[520px] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* FRONT FACE */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-stone-200 flex flex-col items-center justify-center p-8">
                
                {mode === 'EN_JP' ? (
                    // ENGLISH -> JAPANESE MODE (Show Meaning)
                    <>
                        <div className="text-xs uppercase tracking-widest text-stone-400 mb-8 font-bold">Meaning</div>
                        <div className="text-4xl font-sans font-bold text-ink-900 text-center mb-10 leading-tight">
                            {currentCard.meaning.join(', ')}
                        </div>
                        {/* Audio Button helps association even if guessing Kanji */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); speakJapanese(currentCard.character); }}
                            className="absolute bottom-6 right-6 p-3 rounded-full bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-hanko-red transition-colors"
                            title="Play Pronunciation"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    </>
                ) : (
                    // JAPANESE -> ENGLISH MODE (Show Kanji)
                    <>
                        <div className="text-xs uppercase tracking-widest text-stone-400 mb-8 font-bold">Character</div>
                        <div className="text-9xl font-jp font-bold text-ink-900 text-center mb-10 leading-none">
                            {currentCard.character}
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); speakJapanese(currentCard.character); }}
                            className="absolute bottom-6 right-6 p-3 rounded-full bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-hanko-red transition-colors"
                            title="Play Pronunciation"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    </>
                )}
                
                <div className="mt-auto flex flex-col items-center gap-2">
                    <div className="flex items-center text-xs text-stone-300 uppercase tracking-widest">
                        <Hand className="w-3 h-3 mr-1" /> Tap to flip
                    </div>
                </div>
            </div>

            {/* BACK FACE (Answer Key) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-ink-900 rounded-3xl shadow-xl text-white flex flex-col items-center p-6 text-center">
                
                {/* Upper Section: Character & Meaning */}
                <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                    <div className="absolute top-0 right-0">
                         <button 
                            onClick={(e) => { e.stopPropagation(); speakJapanese(currentCard.character); }}
                            className="p-2 rounded-full bg-ink-800 text-stone-400 hover:text-white transition-colors"
                        >
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>

                    <h2 className="text-7xl font-jp font-bold text-white mb-2">{currentCard.character}</h2>
                    <h3 className="text-xl font-sans font-bold text-stone-300 mb-6">{currentCard.meaning.join(', ')}</h3>
                    
                    {!isKana ? (
                        <div className="grid grid-cols-2 gap-4 w-full px-2">
                            <div className="text-right border-r border-stone-700 pr-4">
                                <span className="text-stone-500 text-[10px] uppercase block mb-1">Onyomi</span>
                                <span className="font-jp font-medium text-lg text-stone-200 block leading-tight break-words">{currentCard.onyomi.join(', ') || '-'}</span>
                            </div>
                            <div className="text-left pl-2">
                                <span className="text-stone-500 text-[10px] uppercase block mb-1">Kunyomi</span>
                                <span className="font-jp font-medium text-lg text-stone-200 block leading-tight break-words">{currentCard.kunyomi.join(', ') || '-'}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                             <span className="text-stone-500 text-[10px] uppercase block mb-1">Romaji</span>
                             <span className="font-sans font-bold text-3xl text-stone-200">{currentCard.meaning[0]}</span>
                        </div>
                    )}
                </div>

                {/* Lower Section: Context (Sentences) */}
                <div className="w-full bg-ink-800 rounded-xl p-4 flex flex-col gap-3 mt-4 border border-ink-700">
                    {/* Word Example */}
                    <div className="flex items-center justify-center space-x-2 border-b border-ink-700 pb-2">
                         <span className="font-jp text-xl text-hanko-red">{currentCard.example}</span>
                         <button 
                            onClick={(e) => { e.stopPropagation(); speakJapanese(currentCard.example); }}
                            className="text-stone-400 hover:text-white"
                        >
                            <Volume2 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {/* Sentence Example */}
                    {mainSentence ? (
                        <div className="text-left">
                             <div className="flex items-start gap-2 mb-1">
                                <p className="font-jp text-sm text-stone-200 flex-1">{mainSentence.text}</p>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); speakJapanese(mainSentence.text); }}
                                    className="text-stone-500 hover:text-white shrink-0 mt-0.5"
                                >
                                    <Volume2 className="w-3 h-3" />
                                </button>
                             </div>
                             <p className="text-xs text-stone-400 font-mono mb-1">{mainSentence.romaji}</p>
                             <p className="text-xs text-stone-300 font-serif italic leading-tight">"{mainSentence.en}"</p>
                        </div>
                    ) : (
                        <p className="text-xs text-stone-500 italic">No sentence available</p>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center space-x-8 mt-6">
         <button 
            onClick={handleShuffle} 
            className="flex flex-col items-center text-stone-400 hover:text-hanko-red transition-colors"
         >
            <Shuffle className="w-5 h-5 mb-1" />
            <span className="text-[10px] uppercase tracking-wide">Shuffle</span>
         </button>

         <div className="flex items-center space-x-4">
             <button 
                onClick={handlePrev} 
                className="p-4 rounded-full bg-white border border-stone-200 shadow-sm hover:bg-stone-50 hover:-translate-x-1 transition-all"
             >
                <ArrowLeft className="w-6 h-6 text-ink-900" />
             </button>
             <button 
                onClick={handleNext} 
                className="p-4 rounded-full bg-ink-900 shadow-lg shadow-stone-300 hover:bg-hanko-red hover:translate-x-1 transition-all"
             >
                <ArrowRight className="w-6 h-6 text-white" />
             </button>
         </div>

         <button 
            onClick={() => setIsFlipped(!isFlipped)} 
            className="flex flex-col items-center text-stone-400 hover:text-hanko-red transition-colors"
         >
            <RotateCw className="w-5 h-5 mb-1" />
            <span className="text-[10px] uppercase tracking-wide">Flip</span>
         </button>
      </div>

    </div>
  );
};

export default FlashcardMode;
