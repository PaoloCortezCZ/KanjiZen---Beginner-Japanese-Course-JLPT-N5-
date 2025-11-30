import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '@google/genai';
import { createSenseiChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Bot, Sparkles, X } from 'lucide-react';

interface AiSenseiProps {
  initialContext?: string;
  onClose?: () => void;
}

const AiSensei: React.FC<AiSenseiProps> = ({ initialContext, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat
    chatSession.current = createSenseiChat();
    
    // Initial greeting or context
    const startMessage = initialContext 
      ? `Can you tell me about ${initialContext}?` 
      : "Konnichiwa! I am Sensei. How can I help you learn Japanese today?";

    if (initialContext) {
      // If context provided, user "asks" automatically, then AI responds
      handleSend(startMessage, true);
    } else {
      setMessages([{ role: 'model', text: startMessage }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContext]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string, isAuto: boolean = false) => {
    if (!text.trim() || !chatSession.current) return;
    
    if (!isAuto) {
        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
    } else if (initialContext) {
        // If it's an auto-start context query, we might not want to show it as a user bubble, 
        // OR we show it to make the conversation flow clear. Let's show it.
        setMessages(prev => [...prev, { role: 'user', text }]);
    }

    setIsLoading(true);
    try {
      const result = await chatSession.current.sendMessage({ message: text });
      const responseText = result.text;
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Gomenasai (Sorry), I am having trouble thinking right now." }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
      {/* Header */}
      <div className="bg-ink-900 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-hanko-red rounded-lg">
             <Bot className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-sans font-semibold">AI Sensei</h3>
        </div>
        {onClose && (
            <button onClick={onClose} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
            </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-ink-700 text-white rounded-tr-none' 
                  : 'bg-white border border-stone-200 text-ink-900 rounded-tl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-stone-100 rounded-2xl p-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-hanko-red animate-spin" />
              <span className="text-xs text-stone-500">Sensei is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-stone-100">
        <div className="flex items-center space-x-2 bg-stone-50 rounded-full px-4 py-2 border border-stone-200 focus-within:border-hanko-red focus-within:ring-1 focus-within:ring-hanko-red transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Kanji..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-ink-900 placeholder-stone-400"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className={`p-1.5 rounded-full transition-colors ${
                input.trim() ? 'bg-ink-900 text-white hover:bg-hanko-red' : 'bg-stone-200 text-stone-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSensei;
