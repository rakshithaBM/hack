import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface VoiceContextType {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
  clearTranscript: () => void;
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
    // In a real implementation, you would connect to the Web Speech API
    console.log('Started listening...');
    
    // Simulate receiving transcripts over time
    const mockTimeout = setTimeout(() => {
      setTranscript(prev => prev + ' I need to schedule an appointment');
      setIsListening(false);
    }, 3000);
    
    return () => clearTimeout(mockTimeout);
  };
  
  const stopListening = () => {
    setIsListening(false);
    console.log('Stopped listening');
  };
  
  const clearTranscript = () => {
    setTranscript('');
  };
  
  const speak = (text: string) => {
    setIsSpeaking(true);
    
    // Use the Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback for browsers without speech synthesis
      console.log(`Speaking: ${text}`);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };
  
  // Clean up speech synthesis on unmount
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
        clearTranscript,
        language,
        setLanguage
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};