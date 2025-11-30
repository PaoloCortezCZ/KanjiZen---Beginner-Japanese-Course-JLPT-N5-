
import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface GrammarPoint {
  id: string;
  title: string;
  description: string;
  structure: string;
  examples: {
    jp: string;
    romaji: string;
    en: string;
  }[];
}

const grammarData: Record<string, GrammarPoint[]> = {
  "Particles": [
    {
      id: "wa",
      title: "は (Wa) - Topic Marker",
      description: "Marks the topic of the sentence. It tells the listener what you are talking about. Pronounced 'wa' when used as a particle.",
      structure: "[Topic] は [Comment]",
      examples: [
        { jp: "私は田中です。", romaji: "Watashi wa Tanaka desu.", en: "I am Tanaka." },
        { jp: "これはペンです。", romaji: "Kore wa pen desu.", en: "This is a pen." }
      ]
    },
    {
      id: "ka",
      title: "か (Ka) - Question Marker",
      description: "Added to the end of a sentence to turn it into a question. Works like a question mark.",
      structure: "[Sentence] か。",
      examples: [
        { jp: "あなたは学生ですか。", romaji: "Anata wa gakusei desu ka.", en: "Are you a student?" },
        { jp: "これは何ですか。", romaji: "Kore wa nan desu ka.", en: "What is this?" }
      ]
    },
    {
      id: "no",
      title: "の (No) - Possession",
      description: "Connects two nouns. Usually indicates possession (like 's in English) or modifies the second noun.",
      structure: "[Noun 1] の [Noun 2]",
      examples: [
        { jp: "私の本", romaji: "Watashi no hon", en: "My book" },
        { jp: "日本語の先生", romaji: "Nihongo no sensei", en: "Japanese teacher" }
      ]
    },
    {
      id: "wo",
      title: "を (Wo/O) - Object Marker",
      description: "Marks the direct object of a verb. It indicates 'what' receives the action.",
      structure: "[Object] を [Verb]",
      examples: [
        { jp: "寿司を食べます。", romaji: "Sushi o tabemasu.", en: "I eat sushi." },
        { jp: "水を飲みます。", romaji: "Mizu o nomimasu.", en: "I drink water." }
      ]
    },
    {
      id: "ni",
      title: "に (Ni) - Time / Target / Destination",
      description: "Indicates specific time, the target of an action, or a destination (movement towards).",
      structure: "[Time/Place] に [Verb]",
      examples: [
        { jp: "６時に起きます。", romaji: "Rokuji ni okimasu.", en: "I wake up at 6 o'clock." },
        { jp: "東京に行きます。", romaji: "Toukyou ni ikimasu.", en: "I go to Tokyo." },
        { jp: "友達に会います。", romaji: "Tomodachi ni aimasu.", en: "I meet a friend." }
      ]
    },
    {
      id: "de",
      title: "で (De) - Place of Action / Means",
      description: "Indicates WHERE an action takes place, or HOW (by what means) something is done.",
      structure: "[Place/Tool] で [Verb]",
      examples: [
        { jp: "学校で勉強します。", romaji: "Gakkou de benkyou shimasu.", en: "I study at school." },
        { jp: "バスで行きます。", romaji: "Basu de ikimasu.", en: "I go by bus." }
      ]
    },
    {
      id: "ga",
      title: "が (Ga) - Subject Marker",
      description: "Marks the grammatical subject. Used with 'arimasu/imasu' (existence) and adjectives implying likes/dislikes/skills.",
      structure: "[Subject] が [Verb/Adjective]",
      examples: [
        { jp: "猫がいます。", romaji: "Neko ga imasu.", en: "There is a cat." },
        { jp: "私は猫が好きです。", romaji: "Watashi wa neko ga suki desu.", en: "I like cats." }
      ]
    }
  ],
  "Essential Verbs": [
    {
      id: "desu",
      title: "です (Desu) - To Be",
      description: "Functions like 'is', 'am', or 'are'. It is polite.",
      structure: "A は B です。",
      examples: [
        { jp: "私は学生です。", romaji: "Watashi wa gakusei desu.", en: "I am a student." },
        { jp: "今日はいい天気です。", romaji: "Kyou wa ii tenki desu.", en: "The weather is good today." }
      ]
    },
    {
      id: "arimasu",
      title: "あります (Arimasu) - Existence (Inanimate)",
      description: "Used to say 'there is' or 'have' for non-living things (objects, plants, ideas).",
      structure: "[Thing] が あります。",
      examples: [
        { jp: "本があります。", romaji: "Hon ga arimasu.", en: "There is a book." },
        { jp: "時間があります。", romaji: "Jikan ga arimasu.", en: "I have time." }
      ]
    },
    {
      id: "imasu",
      title: "います (Imasu) - Existence (Living)",
      description: "Used to say 'there is' or 'have' for living things (people, animals).",
      structure: "[Living Thing] が います。",
      examples: [
        { jp: "犬がいます。", romaji: "Inu ga imasu.", en: "There is a dog." },
        { jp: "山田さんがいます。", romaji: "Yamada-san ga imasu.", en: "Mr. Yamada is here." }
      ]
    },
    {
      id: "masu",
      title: "ます (Masu) - Polite Present/Future",
      description: "The standard polite ending for verbs. Used for habits or future actions.",
      structure: "[Verb Stem] + ます",
      examples: [
        { jp: "毎日、コーヒーを飲みます。", romaji: "Mainichi, koohii o nomimasu.", en: "I drink coffee every day." },
        { jp: "明日、勉強します。", romaji: "Ashita, benkyou shimasu.", en: "I will study tomorrow." }
      ]
    },
    {
      id: "mashita",
      title: "ました (Mashita) - Polite Past",
      description: "Past tense of -masu verbs.",
      structure: "[Verb Stem] + ました",
      examples: [
        { jp: "昨日、映画を見ました。", romaji: "Kinou, eiga o mimashita.", en: "I watched a movie yesterday." }
      ]
    }
  ]
};

const GrammarList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {Object.entries(grammarData).map(([section, points]) => (
        <div key={section} className="space-y-4">
          <h2 className="text-xl font-sans font-bold text-ink-900 border-b border-stone-200 pb-2 flex items-center">
            <Star className="w-5 h-5 mr-2 text-hanko-red" />
            {section}
          </h2>
          
          <div className="grid gap-4">
            {points.map((point) => (
              <div 
                key={point.id} 
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  expanded === point.id 
                  ? 'border-hanko-red shadow-md ring-1 ring-hanko-red' 
                  : 'border-stone-200 hover:border-ink-900'
                }`}
              >
                <button 
                  onClick={() => toggleExpand(point.id)}
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                >
                  <div>
                    <h3 className="text-lg font-jp font-bold text-ink-900 mb-1">{point.title}</h3>
                    <p className="text-sm text-stone-500 font-sans">{point.description}</p>
                  </div>
                  <div className={`p-2 rounded-full bg-stone-50 transition-transform ${expanded === point.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-stone-400" />
                  </div>
                </button>

                {expanded === point.id && (
                  <div className="px-5 pb-5 bg-stone-50 border-t border-stone-100">
                    <div className="mt-4 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Structure</span>
                      <div className="bg-white p-3 rounded-lg border border-stone-200 font-jp font-bold text-ink-700 mt-1 inline-block">
                        {point.structure}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Examples</span>
                      {point.examples.map((ex, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-stone-200">
                          <button 
                            onClick={() => speakJapanese(ex.jp)}
                            className="p-2 bg-stone-100 rounded-full text-ink-900 hover:bg-hanko-red hover:text-white transition-colors shrink-0"
                            title="Play Audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <p className="font-jp text-lg font-bold text-ink-900">{ex.jp}</p>
                            <p className="text-xs text-stone-500 font-mono mb-0.5">{ex.romaji}</p>
                            <p className="text-sm text-ink-700 italic font-serif">{ex.en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrammarList;
