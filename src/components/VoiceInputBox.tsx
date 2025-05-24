import React, { useState } from 'react';
import { useVoice } from '../context/VoiceContext';

const VoiceInputBox: React.FC = () => {
  const { transcript, speak, resetTranscript, isListening, isSpeaking, startListening, stopListening } = useVoice();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    speak(input);
    setInput('');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows={4}
          className="border p-2 rounded resize-none"
          placeholder="Type your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1"
            disabled={isSpeaking}
          >
            {isSpeaking ? 'Speaking...' : 'Speak Text'}
          </button>
          {!isListening ? (
            <button
              type="button"
              onClick={startListening}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              🎤 Start Listening
            </button>
          ) : (
            <button
              type="button"
              onClick={stopListening}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🛑 Stop Listening
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={resetTranscript}
          className="text-sm text-gray-600 hover:underline self-start"
        >
          Clear Transcript
        </button>
      </form>

      <div className="mt-4 p-2 border rounded bg-gray-50 min-h-[3rem]">
        <strong>Transcript:</strong> {transcript || 'No transcript yet.'}
      </div>
    </div>
  );
};

export default VoiceInputBox;
