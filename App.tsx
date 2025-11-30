
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, MessageCircle, ArrowLeft, ArrowRight, Info, Volume2, PlayCircle, Book } from 'lucide-react';
import { kanjiList } from './data/kanjiData';
import { kanaList } from './data/kanaData';
import { generateMnemonic } from './services/geminiService';
import { speakJapanese } from './utils/audio';
import { ViewState, KanjiDef } from './types';
import KanjiCard from './components/KanjiCard';
import AiSensei from './components/AiSensei';
import QuizMode from './components/QuizMode';
import FlashcardMode from './components/FlashcardMode';
import PairingGame from './components/PairingGame';
import Sidebar from './components/Sidebar';
import GrammarList from './components/GrammarList';

// Helper to get character from EITHER list
const getCharacterById = (id: string): KanjiDef | undefined => {
    return kanjiList.find(k => k.id === id) || kanaList.find(k => k.id === id);
};

const LibraryView: React.FC = () => {
    const kanjiCategories = Array.from(new Set(kanjiList.map(k => k.category)));
    const kanaCategories = Array.from(new Set(kanaList.map(k => k.category)));
    const navigate = useNavigate();
    
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
            <div className="text-center space-y-4 py-12 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
                <h1 className="text-4xl font-sans font-bold text-ink-900">JLPT N5 Course</h1>
                <p className="text-stone-500 max-w-lg mx-auto">
                    Master the essential characters, vocabulary, and sentences for the N5 exam. 
                    Start with Kana if you are a complete beginner.
                </p>
            </div>

            {/* Kana Section */}
            <div>
                 <h2 className="text-2xl font-bold font-sans text-ink-900 mb-6 flex items-center">
                    <span className="bg-hanko-red text-white text-sm px-2 py-1 rounded mr-3">STEP 1</span>
                    Master Kana (Alphabet)
                 </h2>
                 <div className="space-y-6">
                    {kanaCategories.map((cat, idx) => (
                        <div key={cat} className="space-y-4">
                             <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                                <h3 className="text-lg font-bold text-stone-600">{cat}</h3>
                                <button 
                                    onClick={() => navigate(`/flashcards/${encodeURIComponent(cat)}`)}
                                    className="flex items-center px-3 py-1 bg-stone-50 border border-stone-300 rounded-full text-xs font-semibold hover:bg-hanko-red hover:text-white hover:border-hanko-red transition-all"
                                >
                                    <PlayCircle className="w-3 h-3 mr-2" />
                                    Flashcards
                                </button>
                             </div>
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                {kanaList.filter(k => k.category === cat).map(kana => (
                                    <Link key={kana.id} to={`/kanji/${kana.id}`}>
                                        <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col items-center hover:border-hanko-red hover:-translate-y-1 transition-all cursor-pointer shadow-sm">
                                            <div className="text-3xl font-jp font-bold text-ink-900 mb-1">{kana.character}</div>
                                            <div className="text-xs text-stone-500 font-bold">{kana.meaning[0]}</div>
                                        </div>
                                    </Link>
                                ))}
                             </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Kanji Section */}
            <div>
                <h2 className="text-2xl font-bold font-sans text-ink-900 mb-6 flex items-center">
                    <span className="bg-ink-900 text-white text-sm px-2 py-1 rounded mr-3">STEP 2</span>
                    N5 Kanji
                 </h2>
                {kanjiCategories.map((cat, idx) => (
                    <div key={cat} className="space-y-6 mb-8">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-ink-900 text-white flex items-center justify-center font-bold mr-3 text-sm">
                                    {idx + 1}
                                </div>
                                <h2 className="text-xl font-sans font-bold text-ink-700">
                                    {cat}
                                </h2>
                            </div>
                            <button 
                                onClick={() => navigate(`/flashcards/${encodeURIComponent(cat)}`)}
                                className="flex items-center px-4 py-2 bg-white border border-stone-300 rounded-full text-sm font-semibold hover:bg-hanko-red hover:text-white hover:border-hanko-red transition-all shadow-sm"
                            >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Study Flashcards
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {kanjiList.filter(k => k.category === cat).map(kanji => (
                                <Link key={kanji.id} to={`/kanji/${kanji.id}`}>
                                    <KanjiCard data={kanji} onClick={() => {}} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const FlashcardView: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const category = decodeURIComponent(location.pathname.split('/').pop() || '');

    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
             <FlashcardMode category={category} onClose={() => navigate('/')} />
        </div>
    )
}

const KanjiDetailView: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop() || '';
    const kanji = getCharacterById(id);
    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const [loadingMnemonic, setLoadingMnemonic] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Combine lists to find next/prev character
    const allChars = [...kanaList, ...kanjiList];
    const currentIndex = allChars.findIndex(k => k.id === id);
    const nextKanji = allChars[(currentIndex + 1) % allChars.length];
    const prevKanji = allChars[(currentIndex - 1 + allChars.length) % allChars.length];

    // Reset state when navigating between characters
    useEffect(() => {
        setMnemonic(null);
        setShowChat(false);
        window.scrollTo(0, 0);
    }, [id]);

    const handleGetMnemonic = async () => {
        if (!kanji) return;
        setLoadingMnemonic(true);
        const text = await generateMnemonic(kanji.character, kanji.meaning.join(', '));
        setMnemonic(text);
        setLoadingMnemonic(false);
    }

    if (!kanji) return <div>Character not found</div>;

    const cleanReading = (text: string) => text.replace(/\(.*\)/, '');
    const isKana = kanji.level === 'Kana';

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="inline-flex items-center text-stone-500 hover:text-ink-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Course
                </Link>
                
                <div className="flex items-center space-x-6">
                    <Link to={`/kanji/${prevKanji.id}`} className="inline-flex items-center text-stone-500 hover:text-ink-900 transition-colors group">
                         <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                         Previous
                    </Link>
                    <Link to={`/kanji/${nextKanji.id}`} className="inline-flex items-center text-ink-900 font-bold hover:text-hanko-red transition-colors group">
                        Next Character 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left: Character Display */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-12 flex flex-col items-center justify-center aspect-square relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-50 via-white to-white opacity-50"></div>
                    <span className="text-9xl md:text-[12rem] font-jp font-bold text-ink-900 z-10 leading-none">
                        {kanji.character}
                    </span>
                    
                     <button 
                        onClick={(e) => { e.stopPropagation(); speakJapanese(kanji.character); }}
                        className="absolute bottom-6 right-6 p-3 bg-stone-100 rounded-full hover:bg-hanko-red hover:text-white transition-all text-stone-500 z-20 group"
                        title="Listen to Pronunciation"
                    >
                        <Volume2 className="w-6 h-6" />
                    </button>

                    <div className="absolute top-8 left-8 flex flex-col items-start gap-1 z-10">
                        <div className="flex flex-col items-center p-2 bg-white/80 rounded-lg border border-stone-100 backdrop-blur-sm">
                            <span className="text-xl font-bold text-ink-700">{kanji.strokes}</span>
                            <span className="text-[10px] uppercase tracking-wider text-stone-400">Strokes</span>
                        </div>
                    </div>
                </div>

                {/* Right: Info & AI */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-sans font-bold text-ink-900 mb-2">{kanji.meaning.join(', ')}</h1>
                            <span className={`px-3 py-1 text-white text-xs font-bold rounded-full ${isKana ? 'bg-ink-900' : 'bg-hanko-red'}`}>
                                {isKana ? 'Kana' : `JLPT ${kanji.level}`}
                            </span>
                        </div>
                        <p className="text-stone-500 text-sm">Chapter: {kanji.category}</p>
                    </div>

                    {!isKana ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div 
                                className="bg-stone-50 p-4 rounded-xl border border-stone-200 hover:border-hanko-red transition-colors cursor-pointer relative group"
                                onClick={() => speakJapanese(kanji.onyomi.join(', '))}
                            >
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                                    Onyomi 
                                    <Volume2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-lg font-jp text-ink-900">{kanji.onyomi.join(', ') || '-'}</p>
                            </div>
                            <div 
                                className="bg-stone-50 p-4 rounded-xl border border-stone-200 hover:border-hanko-red transition-colors cursor-pointer relative group"
                                onClick={() => speakJapanese(kanji.kunyomi.map(cleanReading).join(', '))}
                            >
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                                    Kunyomi
                                    <Volume2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-lg font-jp text-ink-900">{kanji.kunyomi.join(', ') || '-'}</p>
                            </div>
                        </div>
                    ) : (
                         <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                             <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Romaji Reading</h3>
                             <p className="text-3xl font-bold text-ink-900">{kanji.meaning[0]}</p>
                         </div>
                    )}

                    {/* AI Mnemonic */}
                    {!isKana && (
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-ink-900 flex items-center">
                                    <Info className="w-4 h-4 mr-2 text-hanko-red" />
                                    Sensei's Mnemonic
                                </h3>
                                {!mnemonic && !loadingMnemonic && (
                                    <button onClick={handleGetMnemonic} className="text-xs underline text-stone-500 hover:text-ink-900">
                                        Reveal
                                    </button>
                                )}
                            </div>
                            
                            {loadingMnemonic && <div className="text-xs text-stone-400 animate-pulse">Consulting ancient scrolls...</div>}
                            {mnemonic && <p className="text-ink-700 italic font-serif leading-relaxed text-sm">"{mnemonic}"</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* Basic Sentences Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-sans font-bold text-ink-900 mb-6 flex items-center">
                    <Book className="w-6 h-6 mr-2 text-stone-400" />
                    {isKana ? "Example Word" : "Example Sentences"}
                </h2>
                
                <div className="grid gap-4">
                    {kanji.sentences && kanji.sentences.length > 0 ? (
                        kanji.sentences.map((sent, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-stone-300 transition-colors flex items-start gap-4 shadow-sm">
                                <button 
                                    onClick={() => speakJapanese(sent.text)}
                                    className="mt-1 p-2 bg-stone-50 rounded-full text-ink-900 hover:bg-hanko-red hover:text-white transition-colors shrink-0"
                                >
                                    <Volume2 className="w-5 h-5" />
                                </button>
                                <div>
                                    <p className="text-xl font-jp font-medium text-ink-900 mb-1">{sent.text}</p>
                                    <p className="text-sm text-stone-400 font-mono mb-1">{sent.romaji}</p>
                                    <p className="text-base text-ink-700 font-serif italic">{sent.en}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-stone-400 italic">No examples available.</div>
                    )}
                </div>
            </div>
            
             <div className="flex justify-center border-t border-stone-200 pt-8">
                <button 
                    onClick={() => setShowChat(!showChat)}
                    className="text-stone-500 hover:text-ink-900 flex items-center space-x-2"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Have questions? Ask Sensei</span>
                </button>
            </div>

            {showChat && (
                <div className="mt-8">
                    <AiSensei initialContext={`the character ${kanji.character}`} />
                </div>
            )}

        </div>
    );
}

const ChatView: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-sans font-bold text-ink-900 mb-6 text-center">Chat with Sensei</h1>
            <p className="text-center text-stone-500 mb-8">Ask about JLPT N5 grammar, particles, or vocabulary.</p>
            <AiSensei />
        </div>
    )
}

const QuizView: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-sans font-bold text-ink-900 mb-2 text-center">N5 Practice Quiz</h1>
             <p className="text-center text-stone-500 mb-8">Test your knowledge with AI-generated exam questions.</p>
            <QuizMode />
        </div>
    )
}

const GrammarView: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-sans font-bold text-ink-900 mb-2 text-center">Essential Grammar</h1>
             <p className="text-center text-stone-500 mb-8">Master the basics of Japanese sentence structure.</p>
            <GrammarList />
        </div>
    )
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-paper-50 text-ink-900 font-sans selection:bg-red-100 selection:text-red-900 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
            <Routes>
                <Route path="/" element={<LibraryView />} />
                <Route path="/kanji/:id" element={<KanjiDetailView />} />
                <Route path="/flashcards/:category" element={<FlashcardView />} />
                <Route path="/quiz" element={<QuizView />} />
                <Route path="/chat" element={<ChatView />} />
                <Route path="/game" element={<PairingGame />} />
                <Route path="/grammar" element={<GrammarView />} />
            </Routes>
            <footer className="py-8 text-center text-stone-400 text-sm border-t border-stone-200 mt-8">
                <p>© {new Date().getFullYear()} KanjiZen. Content generated by Gemini AI.</p>
            </footer>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
