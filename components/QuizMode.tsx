
import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { kanjiList } from '../data/kanjiData';
import { CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';

const QuizMode: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const loadQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuestion(null);

    // Pick 5 random Kanji to "focus" the quiz on, to send to Gemini
    // Ensure we only pick actual N5 Kanji (not Kana if lists were merged elsewhere)
    const n5Kanji = kanjiList.filter(k => k.level === 'N5');
    const shuffled = [...n5Kanji].sort(() => 0.5 - Math.random());
    const candidates = shuffled.slice(0, 5).map(k => `${k.character} (${k.meaning[0]})`);
    
    const jsonStr = await generateQuizQuestion(candidates);
    try {
        const data = JSON.parse(jsonStr);
        // Add an ID
        setQuestion({ ...data, id: Date.now() });
    } catch (e) {
        console.error("Failed to parse quiz", e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedAnswer || !question) return;
    setSelectedAnswer(option);
    setIsCorrect(option === question.correctAnswer);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
         <div className="w-12 h-12 border-4 border-stone-200 border-t-hanko-red rounded-full animate-spin"></div>
         <p className="text-stone-500 font-sans">Generating a unique question...</p>
      </div>
    );
  }

  if (!question) {
    return (
        <div className="text-center p-8">
            <p>Failed to load quiz. Please try again.</p>
            <button onClick={loadQuestion} className="mt-4 px-4 py-2 bg-ink-900 text-white rounded-lg">Retry</button>
        </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
        {/* Question Header */}
        <div className="bg-paper-100 p-8 text-center border-b border-stone-200">
            <div className="text-6xl font-jp font-bold text-ink-900 mb-4">{question.kanji}</div>
            <h2 className="text-xl font-sans text-ink-700">{question.question}</h2>
        </div>

        {/* Options */}
        <div className="p-6 grid gap-3">
          {question.options.map((option, idx) => {
            let itemClass = "p-4 rounded-xl border-2 text-left transition-all font-sans text-lg flex justify-between items-center ";
            if (selectedAnswer === null) {
                itemClass += "border-stone-100 hover:border-ink-900 hover:bg-stone-50 cursor-pointer";
            } else if (option === question.correctAnswer) {
                itemClass += "border-green-500 bg-green-50 text-green-800";
            } else if (option === selectedAnswer && option !== question.correctAnswer) {
                itemClass += "border-red-500 bg-red-50 text-red-800";
            } else {
                itemClass += "border-stone-100 opacity-50";
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={itemClass}
              >
                <span>{option}</span>
                {selectedAnswer !== null && option === question.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                {selectedAnswer === option && option !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>

        {/* Feedback / Next */}
        {selectedAnswer && (
          <div className="bg-stone-50 p-6 border-t border-stone-200 animate-fade-in">
             <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isCorrect ? <CheckCircle className="w-6 h-6 text-green-700" /> : <XCircle className="w-6 h-6 text-red-700" />}
                </div>
                <div className="flex-1">
                    <p className={`font-bold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? "Correct!" : "Not quite."}
                    </p>
                    <p className="text-stone-600 mb-4">{question.explanation}</p>
                    <button 
                        onClick={loadQuestion}
                        className="flex items-center px-6 py-2 bg-ink-900 text-white rounded-full hover:bg-hanko-red transition-colors font-sans"
                    >
                        Next Question <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMode;
