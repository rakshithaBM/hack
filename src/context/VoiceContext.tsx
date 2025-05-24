import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface VoiceContextType {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
  resetTranscript: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}

interface VoiceProviderProps {
  children: ReactNode;
}

export const VoiceProvider: React.FC<VoiceProviderProps> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en-US');

  // Mock SpeechRecognition since it's not available in all browsers
  const startListening = () => {
    setIsListening(true);
    console.log('Started listening...');

    // Simulate receiving transcripts over time (you can replace this with real speech recognition)
    const mockTimeout = setTimeout(() => {
      setTranscript((prev) => prev + ' I need help urgently');
      setIsListening(false);
    }, 3000);

    return () => clearTimeout(mockTimeout);
  };

  const stopListening = () => {
    setIsListening(false);
    console.log('Stopped listening');
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  const speak = (text: string) => {
    setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log(`Speaking: ${text}`);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        transcript,
        startListening,
        stopListening,
        speak,
        isSpeaking,
        resetTranscript,
        language,
        setLanguage,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
