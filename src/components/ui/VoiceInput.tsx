import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

interface VoiceInputProps {
  placeholder?: string;
  onTranscriptChange?: (transcript: string) => void;
  className?: string;
  autoStart?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  placeholder = 'Speak now...',
  onTranscriptChange,
  className = '',
  autoStart = false,
}) => {
  const { isListening, transcript, startListening, stopListening, clearTranscript, speak } = useVoice();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (autoStart && !isListening) {
      startListening();
    }
  }, [autoStart, isListening, startListening]);

  useEffect(() => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      clearTranscript();
      startListening();
    }
  };

  const speakPlaceholder = () => {
    speak(placeholder);
  };

  // Sound wave animation effect when listening
  useEffect(() => {
    if (isListening) {
      setIsAnimating(true);
    } else {
      // Keep animation a bit longer after stopping
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  return (
    <div className={`relative rounded-lg border border-gray-300 bg-white ${className}`}>
      <div className="flex items-center px-3 py-2">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-full ${
            isListening
              ? 'bg-red-100 text-red-600 animate-pulse'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          } transition-colors duration-300 mr-2`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        <div className="flex-1 relative min-h-[40px] flex items-center">
          {transcript ? (
            <p className="text-gray-800 py-1">{transcript}</p>
          ) : (
            <p className="text-gray-400 py-1">{placeholder}</p>
          )}
          
          {/* Voice visualization */}
          {isAnimating && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-1 pr-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-500 w-1 rounded-full animate-sound-wave"
                  style={{
                    height: `${12 + Math.random() * 16}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={speakPlaceholder}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300 ml-2"
          aria-label="Listen to placeholder text"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default VoiceInput;