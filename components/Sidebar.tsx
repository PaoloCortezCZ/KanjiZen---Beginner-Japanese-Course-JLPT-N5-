
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, BrainCircuit, MessageCircle, Grid3X3, Languages, X, Info, Feather } from 'lucide-react';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      active 
      ? 'bg-ink-900 text-white shadow-md' 
      : 'text-stone-500 hover:bg-stone-100 hover:text-ink-900'
    }`}
  >
    {icon}
    <span className="font-medium font-sans">{label}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [showResources, setShowResources] = useState(false);
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');

  return (
    <>
    <aside className="w-64 bg-white border-r border-stone-200 h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* Logo */}
      <div className="p-6 border-b border-stone-100">
        <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-hanko-red rounded-lg flex items-center justify-center text-white font-jp font-bold text-xl group-hover:rotate-3 transition-transform shadow-sm">
                禅
            </div>
            <div className="flex flex-col">
                <span className="font-sans font-bold text-2xl text-ink-900 tracking-tight leading-none">KanjiZen</span>
                <span className="text-[10px] text-hanko-red font-bold uppercase tracking-wider">JLPT N5 Prep</span>
            </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
         <NavItem 
            to="/" 
            active={location.pathname === '/' || location.pathname.startsWith('/kanji')} 
            icon={<BookOpen className="w-5 h-5" />} 
            label="Course" 
         />
         <NavItem 
            to="/" 
            active={false} 
            icon={<Languages className="w-5 h-5" />} 
            label="Kana Course" 
         />
         <NavItem 
            to="/grammar" 
            active={location.pathname === '/grammar'} 
            icon={<Feather className="w-5 h-5" />} 
            label="Grammar" 
         />
         <NavItem 
            to="/game" 
            active={location.pathname === '/game'} 
            icon={<Grid3X3 className="w-5 h-5" />} 
            label="Pairing Game" 
         />
         <NavItem 
            to="/quiz" 
            active={location.pathname === '/quiz'} 
            icon={<BrainCircuit className="w-5 h-5" />} 
            label="Quiz" 
         />
         <NavItem 
            to="/chat" 
            active={location.pathname === '/chat'} 
            icon={<MessageCircle className="w-5 h-5" />} 
            label="Sensei AI" 
         />
      </nav>

      {/* Resources Box */}
      <div className="p-4 border-t border-stone-100">
         <button 
            onClick={() => setShowResources(true)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between hover:border-hanko-red transition-colors group"
         >
             <div className="flex items-center">
                 <Languages className="w-5 h-5 text-stone-400 group-hover:text-hanko-red mr-3" />
                 <div className="text-left">
                     <div className="text-sm font-bold text-ink-900">Cheat Sheet</div>
                     <div className="text-xs text-stone-500">View Full Charts</div>
                 </div>
             </div>
         </button>
      </div>
    </aside>

    {/* Mobile Header (visible only on small screens) */}
    <div className="md:hidden bg-white border-b border-stone-200 p-4 sticky top-0 z-50 flex justify-between items-center">
         <Link to="/" className="font-bold text-ink-900 flex items-center">
            <div className="w-8 h-8 bg-hanko-red rounded mr-2 flex items-center justify-center text-white">禅</div>
            KanjiZen
         </Link>
         <div className="flex space-x-4">
             <Link to="/game"><Grid3X3 className="w-6 h-6 text-stone-600" /></Link>
             <Link to="/chat"><MessageCircle className="w-6 h-6 text-stone-600" /></Link>
         </div>
    </div>

    {/* Resources Modal */}
    {showResources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                    <h3 className="text-xl font-bold text-ink-900">Japanese Resources</h3>
                    <button onClick={() => setShowResources(false)} className="p-2 hover:bg-stone-200 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex border-b border-stone-200">
                    <button 
                        onClick={() => setActiveTab('hiragana')}
                        className={`flex-1 py-3 font-bold text-sm ${activeTab === 'hiragana' ? 'text-hanko-red border-b-2 border-hanko-red' : 'text-stone-400'}`}
                    >
                        Hiragana
                    </button>
                    <button 
                         onClick={() => setActiveTab('katakana')}
                         className={`flex-1 py-3 font-bold text-sm ${activeTab === 'katakana' ? 'text-hanko-red border-b-2 border-hanko-red' : 'text-stone-400'}`}
                    >
                        Katakana
                    </button>
                </div>

                <div className="overflow-y-auto p-8 bg-paper-50 flex-1">
                    {activeTab === 'hiragana' ? (
                        <div className="grid grid-cols-5 gap-2 text-center font-jp">
                            {['あ a','い i','う u','え e','お o',
                              'か ka','き ki','く ku','け ke','こ ko',
                              'さ sa','し shi','す su','せ se','そ so',
                              'た ta','ち chi','つ tsu','て te','と to',
                              'な na','に ni','ぬ nu','ね ne','の no',
                              'は ha','ひ hi','ふ fu','へ he','ほ ho',
                              'ま ma','み mi','む mu','め me','も mo',
                              'や ya','','ゆ yu','','よ yo',
                              'ら ra','り ri','る ru','れ re','ろ ro',
                              'わ wa','','','','を wo',
                              'ん n','','','',''
                            ].map((char, i) => (
                                char ? (
                                    <div key={i} className="bg-white p-2 rounded border border-stone-200">
                                        <div className="text-xl font-bold">{char.split(' ')[0]}</div>
                                        <div className="text-xs text-stone-400 uppercase">{char.split(' ')[1]}</div>
                                    </div>
                                ) : <div key={i}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-2 text-center font-jp">
                            {['ア a','イ i','ウ u','エ e','オ o',
                              'カ ka','キ ki','ク ku','ケ ke','コ ko',
                              'サ sa','シ shi','ス su','セ se','ソ so',
                              'タ ta','チ chi','ツ tsu','テ te','ト to',
                              'ナ na','ニ ni','ヌ nu','ネ ne','ノ no',
                              'ハ ha','ヒ hi','フ fu','ヘ he','ホ ho',
                              'マ ma','ミ mi','ム mu','メ me','モ mo',
                              'ヤ ya','','ユ yu','','ヨ yo',
                              'ラ ra','リ ri','ル ru','レ re','ロ ro',
                              'ワ wa','','','','ヲ wo',
                              'ン n','','','',''
                            ].map((char, i) => (
                                char ? (
                                    <div key={i} className="bg-white p-2 rounded border border-stone-200">
                                        <div className="text-xl font-bold">{char.split(' ')[0]}</div>
                                        <div className="text-xs text-stone-400 uppercase">{char.split(' ')[1]}</div>
                                    </div>
                                ) : <div key={i}></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default Sidebar;
