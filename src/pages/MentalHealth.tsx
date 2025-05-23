import { useState } from 'react';
import { useVoice } from '../context/VoiceContext';
import VoiceInput from '../components/ui/VoiceInput';
import { Brain, Heart, MessageCircle, Calendar, Shield, Activity, Sun, Moon } from 'lucide-react';

const MentalHealth = () => {
  const { speak } = useVoice();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [moodLog, setMoodLog] = useState<string>('');

  const therapists = [
    {
      name: 'Dr. Sarah Wilson',
      specialty: 'Anxiety & Depression',
      image: 'https://images.pexels.com/photos/5214976/pexels-photo-5214976.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['9:00 AM', '2:00 PM', '4:30 PM']
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Stress Management',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['10:30 AM', '1:00 PM', '3:30 PM']
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Trauma & PTSD',
      image: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: ['11:00 AM', '2:30 PM', '5:00 PM']
    }
  ];

  const resources = [
    {
      title: 'Guided Meditation',
      description: 'Access calming meditation sessions with voice guidance',
      icon: <Brain className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being over time',
      icon: <Heart className="h-6 w-6" />,
      color: 'red'
    },
    {
      title: 'Support Groups',
      description: 'Connect with others in voice-enabled group sessions',
      icon: <MessageCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Therapy Sessions',
      description: 'Schedule one-on-one sessions with licensed therapists',
      icon: <Calendar className="h-6 w-6" />,
      color: 'purple'
    }
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    speak(`You've selected a session at ${time}. Would you like me to confirm this appointment?`);
  };

  const handleMoodLog = (transcript: string) => {
    setMoodLog(transcript);
    if (transcript) {
      speak('Thank you for sharing. Your mood has been logged. Would you like to explore some coping strategies?');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Mental Health Support</h1>
            <p className="text-purple-100">
              Voice-enabled mental health resources and professional support
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Quick Access Tools */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">How are you feeling today?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button 
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
                  onClick={() => speak('I\'m glad you\'re feeling good! Would you like to maintain this positive mood with some mindfulness exercises?')}
                >
                  <Sun className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <span className="text-green-700">Good</span>
                </button>
                <button 
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                  onClick={() => speak('It\'s okay to feel neutral. Would you like to explore some activities to boost your mood?')}
                >
                  <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <span className="text-blue-700">Neutral</span>
                </button>
                <button 
                  className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center"
                  onClick={() => speak('I understand you\'re feeling anxious. Would you like to try a quick breathing exercise?')}
                >
                  <Activity className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <span className="text-yellow-700">Anxious</span>
                </button>
                <button 
                  className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center"
                  onClick={() => speak('I\'m here to support you. Would you like to talk to a mental health professional?')}
                >
                  <Moon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <span className="text-red-700">Down</span>
                </button>
              </div>
            </div>

            {/* Mood Logger */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Voice Mood Journal</h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <VoiceInput
                  placeholder="How are you feeling today? Speak freely about your thoughts and emotions..."
                  onTranscriptChange={handleMoodLog}
                  className="mb-4"
                />
                <p className="text-sm text-gray-600">
                  Your voice journal is private and secure. Use it to track your emotional well-being over time.
                </p>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Mental Health Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-md
                      ${resource.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                        resource.color === 'red' ? 'border-red-200 bg-red-50' :
                        resource.color === 'green' ? 'border-green-200 bg-green-50' :
                        'border-purple-200 bg-purple-50'}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg
                        ${resource.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          resource.color === 'red' ? 'bg-red-100 text-red-600' :
                          resource.color === 'green' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'}`}
                      >
                        {resource.icon}
                      </div>
                      <h3 className="ml-4 text-lg font-medium text-gray-800">{resource.title}</h3>
                    </div>
                    <p className="text-gray-600">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Help Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Talk to a Professional</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {therapists.map((therapist, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={therapist.image} 
                      alt={therapist.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{therapist.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{therapist.specialty}</p>
                      <div className="space-y-2">
                        {therapist.availability.map((time, timeIndex) => (
                          <button
                            key={timeIndex}
                            onClick={() => handleTimeSelect(time)}
                            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
                              ${selectedTime === time
                                ? 'bg-purple-600 text-white'
                                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Support?</h2>
              <p className="text-red-700 mb-4">
                If you\'re experiencing a mental health emergency, help is available 24/7.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    speak('Connecting you to emergency mental health services.');
                    window.location.href = '/emergency';
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Get Emergency Help
                </button>
                <a
                  href="tel:988"
                  className="px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  Call 988
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;