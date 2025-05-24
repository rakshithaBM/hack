import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useVoice } from '../context/VoiceContext';
import AnimatedMicrophone from '../components/ui/AnimatedMicrophone';
import { Activity, Check, Loader2 } from 'lucide-react';

const SymptomChecker = () => {
  const {
    speak,
    isListening,
    startListening,
    stopListening,
    transcript,
    //clearTranscript,
  } = useVoice();

  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    possibleConditions: Array<{ name: string; probability: number; description: string }>;
    recommendedActions: string[];
  }>(null);

  const [symptomProgressionData, setSymptomProgressionData] = useState<
    Array<{
      date: string;
      headache: number;
      fever: number;
      cough: number;
      fatigue: number;
    }>
  >([]);

  // Sync transcript into textarea
  useEffect(() => {
    if (transcript.trim()) {
      setUserInput(transcript);
    }
  }, [transcript]);

  const analyzeSymptoms = () => {
    if (!userInput.trim()) {
      speak('Please describe your symptoms first.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const mockResults = {
        possibleConditions: [
          {
            name: 'Common Cold',
            probability: 80,
            description: 'A viral infection causing sore throat, runny nose, and congestion.',
          },
          {
            name: 'Seasonal Allergies',
            probability: 65,
            description: 'An immune response to environmental triggers like pollen or dust.',
          },
          {
            name: 'Sinusitis',
            probability: 45,
            description: 'Inflammation of the sinuses, often due to infection.',
          },
        ],
        recommendedActions: [
          'Rest and stay hydrated',
          'Consider over-the-counter cold medications for symptom relief',
          'Monitor symptoms for 3-5 days',
          'Consult a doctor if symptoms worsen or include high fever',
        ],
      };

      setResults(mockResults);
      setIsAnalyzing(false);

      speak(`Based on your symptoms, you may have a ${mockResults.possibleConditions[0].name}. 
        I recommend that you ${mockResults.recommendedActions[0]} and ${mockResults.recommendedActions[1]}.
        Would you like me to book an appointment with a doctor?`);

      setSymptomProgressionData([
        { date: '2025-05-20', headache: 5, fever: 3, cough: 2, fatigue: 4 },
        { date: '2025-05-21', headache: 6, fever: 4, cough: 3, fatigue: 5 },
        { date: '2025-05-22', headache: 7, fever: 5, cough: 4, fatigue: 6 },
        { date: '2025-05-23', headache: 5, fever: 3, cough: 2, fatigue: 4 },
        { date: '2025-05-24', headache: 3, fever: 2, cough: 1, fatigue: 3 },
      ]);
    }, 3000);
  };

  const resetChecker = () => {
    setUserInput('');
    setResults(null);
    setSymptomProgressionData([]);
    clearTranscript();
    speak('Please describe your symptoms in detail, including when they started.');
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      if (!userInput) {
        speak('Please describe your symptoms in detail.');
      }
    }
  };

  const commonSymptoms = [
    'Headache',
    'Fever',
    'Cough',
    'Sore Throat',
    'Fatigue',
    'Shortness of Breath',
    'Nausea',
    'Dizziness',
    'Chest Pain',
    'Abdominal Pain',
  ];

  // Inline Symptom Progression Chart Component
  const SymptomProgressionChart = ({
    data,
  }: {
    data: Array<{
      date: string;
      headache: number;
      fever: number;
      cough: number;
      fatigue: number;
    }>;
  }) => (
    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Symptom Progression (Last 5 Days)</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="headache" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fever" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cough" stroke="#ffc658" />
          <Line type="monotone" dataKey="fatigue" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Multilingual Symptom Checker</h1>
            <p className="text-blue-100">
              Describe your symptoms in any language using your voice or text input.
            </p>
          </div>

          <div className="p-6 md:p-8">
            {!results ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Describe Your Symptoms</h2>

                  <textarea
                    rows={4}
                    className="w-full border rounded p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="For example: I've had a headache and fever since yesterday..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isAnalyzing}
                  />

                  <div className="flex justify-center my-6">
                    <AnimatedMicrophone
                      size="lg"
                      onClick={toggleListening}
                      pulseColor={isListening ? 'red' : 'blue'}
                    />
                  </div>

                  <div className="text-center text-sm text-gray-500 mb-6">
                    {isListening
                      ? "I'm listening... Speak clearly about your symptoms."
                      : 'Tap the microphone to speak'}
                  </div>

                  <button
                    onClick={analyzeSymptoms}
                    disabled={isAnalyzing || !userInput.trim()}
                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center
                      ${
                        isAnalyzing || !userInput.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                      transition-colors duration-300`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing Symptoms...
                      </>
                    ) : (
                      <>
                        <Activity className="h-5 w-5 mr-2" />
                        Analyze Symptoms
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Common Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setUserInput((prev) => `${prev} ${symptom.toLowerCase()}`.trim())
                        }
                        className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm transition-colors duration-200"
                        disabled={isAnalyzing}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
                    <button
                      onClick={resetChecker}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Start Over
                    </button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Your described symptoms:</h3>
                    <p className="text-gray-700 italic">"{userInput}"</p>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-3">Possible Conditions</h3>
                  <div className="space-y-4 mb-6">
                    {results.possibleConditions.map((condition, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          index === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{condition.name}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              condition.probability > 70
                                ? 'bg-red-100 text-red-800'
                                : condition.probability > 50
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {condition.probability}% match
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{condition.description}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-3">Recommended Actions</h3>
                  <ul className="space-y-2 mb-6">
                    {results.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>

                  {symptomProgressionData.length > 0 && (
                    <SymptomProgressionChart data={symptomProgressionData} />
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-yellow-800 text-sm mb-6 mt-8">
                    <p className="font-medium">Important Disclaimer</p>
                    <p>
                      This symptom checker provides general information only and should not be used
                      for diagnosis or treatment. Always consult with a qualified healthcare provider.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        speak("I'll connect you with a doctor now.");
                        window.location.href = '/appointment-booking';
                      }}
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      Book Appointment
                    </button>
                    <button
                      onClick={() => {
                        speak(
                          'For emergency situations, please access our emergency services immediately.'
                        );
                        window.location.href = '/emergency';
                      }}
                      className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
                    >
                      Emergency Help
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
