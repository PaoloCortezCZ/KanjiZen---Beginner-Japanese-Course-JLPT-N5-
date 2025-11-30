import React from 'react';
import { KanjiDef } from '../types';

interface KanjiCardProps {
  data: KanjiDef;
  onClick: (id: string) => void;
}

const KanjiCard: React.FC<KanjiCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={() => onClick(data.id)}
      className="group relative bg-white border border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-200 hover:-translate-y-1"
    >
      <div className="text-5xl font-jp font-bold text-ink-900 mb-2 group-hover:text-hanko-red transition-colors">
        {data.character}
      </div>
      <div className="text-sm uppercase tracking-wide text-stone-500 font-semibold mb-1 text-center">
        {data.meaning[0]}
      </div>
      <div className="text-xs text-stone-400">
        {data.onyomi[0] && <span className="mr-2">{data.onyomi[0]}</span>}
      </div>
      
      {/* Decorative corner / Level indicator */}
      <div className="absolute top-2 right-2 text-[10px] font-bold text-stone-300 group-hover:text-hanko-red transition-colors">
          {data.level}
      </div>
    </div>
  );
};

export default KanjiCard;