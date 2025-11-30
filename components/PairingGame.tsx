import React, { useState, useEffect } from 'react';
import { kanjiList } from '../data/kanjiData';
import { speakJapanese } from '../utils/audio';
import { RefreshCw, Check, Sparkles } from 'lucide-react';

interface CardItem {
  id: string; // The kanji ID
  type: 'kanji' | 'meaning';
  content: string;
  uniqueId: string; // Unique for the grid
}

const PairingGame: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [selected, setSelected] = useState<CardItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<Set<string>>(new Set());
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    // Select 6 random kanji
    const shuffledKanji = [...kanjiList].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const gameItems: CardItem[] = [];
    shuffledKanji.forEach(k => {
      // Add Kanji Card
      gameItems.push({
        id: k.id,
        type: 'kanji',
        content: k.character,
        uniqueId: `${k.id}-kanji`
      });
      // Add Meaning Card
      gameItems.push({
        id: k.id,
        type: 'meaning',
        content: k.meaning[0], // Use primary meaning
        uniqueId: `${k.id}-meaning`
      });
    });

    // Shuffle grid
    setItems(gameItems.sort(() => 0.5 - Math.random()));
    setMatchedIds(new Set());
    setSelected(null);
    setWrongPair(new Set());
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (item: CardItem) => {
    // Ignore if already matched or currently processing wrong pair
    if (matchedIds.has(item.id) || wrongPair.size > 0) return;
    
    // If clicking the same card twice, deselect
    if (selected?.uniqueId === item.uniqueId) {
      setSelected(null);
      return;
    }

    // Play sound for Kanji
    if (item.type === 'kanji') {
      speakJapanese(item.content);
    }

    if (!selected) {
      // First selection
      setSelected(item);
    } else {
      // Second selection - Check match
      if (selected.id === item.id) {
        // Match!
        const newMatched = new Set(matchedIds);
        newMatched.add(item.id);
        setMatchedIds(newMatched);
        setSelected(null);

        // Check Win
        if (newMatched.size === items.length / 2) {
          setIsWon(true);
        }
      } else {
        // Mismatch
        const wrong = new Set<string>();
        wrong.add(selected.uniqueId);
        wrong.add(item.uniqueId);
        setWrongPair(wrong);
        
        // Reset after delay
        setTimeout(() => {
          setWrongPair(new Set());
          setSelected(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
       <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-sans text-ink-900">Pairing Practice</h2>
          <button 
            onClick={initGame} 
            className="flex items-center text-sm font-bold text-stone-500 hover:text-hanko-red"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Restart
          </button>
       </div>

       {isWon ? (
         <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm animate-fade-in">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
               <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-ink-900 mb-2">Excellent!</h3>
            <p className="text-stone-500 mb-8">You matched all the pairs.</p>
            <button 
              onClick={initGame}
              className="px-8 py-3 bg-ink-900 text-white rounded-full font-bold hover:bg-hanko-red transition-colors"
            >
              Play Again
            </button>
         </div>
       ) : (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => {
               const isMatched = matchedIds.has(item.id);
               const isSelected = selected?.uniqueId === item.uniqueId;
               const isWrong = wrongPair.has(item.uniqueId);
               
               if (isMatched) {
                 return <div key={item.uniqueId} className="h-32"></div>; // Invisible placeholder
               }

               let baseClass = "h-32 rounded-2xl border-2 flex items-center justify-center text-xl font-bold cursor-pointer transition-all shadow-sm transform hover:-translate-y-1 ";
               
               if (isWrong) {
                 baseClass += "bg-red-50 border-red-400 text-red-600 animate-shake";
               } else if (isSelected) {
                 baseClass += "bg-blue-50 border-blue-500 text-blue-800 scale-105";
               } else {
                 baseClass += "bg-white border-stone-200 text-ink-700 hover:border-ink-900";
               }

               return (
                 <div 
                   key={item.uniqueId} 
                   onClick={() => handleCardClick(item)}
                   className={baseClass}
                 >
                    <span className={item.type === 'kanji' ? 'font-jp text-4xl' : 'font-sans text-lg'}>
                       {item.content}
                    </span>
                 </div>
               );
            })}
         </div>
       )}
    </div>
  );
};

export default PairingGame;