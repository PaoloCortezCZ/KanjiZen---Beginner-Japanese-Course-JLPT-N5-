
export const speakJapanese = (text: string) => {
    if ('speechSynthesis' in window) {
        // Cancel any current speaking
        window.speechSynthesis.cancel();
        
        // Remove Romaji/English parts (text in parens or latin characters)
        // Example: "一つ (Hitotsu)" -> "一つ"
        // Also remove punctuation that might be read awkwardly if mixed
        const cleanText = text.replace(/\([^\)]*\)/g, '').replace(/[a-zA-Z]/g, '').trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ja-JP'; // Japanese
        utterance.rate = 0.8; // Slower for beginners
        
        // Try to find a japanese voice
        const voices = window.speechSynthesis.getVoices();
        const jaVoice = voices.find(v => v.lang.includes('ja'));
        if (jaVoice) {
            utterance.voice = jaVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
};
