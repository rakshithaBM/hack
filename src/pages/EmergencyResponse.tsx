import { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Heart, Activity, VolumeX, Volume2 } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import AnimatedMicrophone from '../components/ui/AnimatedMicrophone';
import VoiceInputBox from '../components/VoiceInputBox'; // Import VoiceInputBox here

const EmergencyResponse = () => {
  const { speak, isListening, startListening, stopListening, transcript } = useVoice();
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (emergencyActive) {
      // Get user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );

      // Start emergency countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Simulate emergency call
            speak("Emergency services have been contacted. Stay on the line. Help is on the way.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [emergencyActive, speak]);

  const activateEmergency = () => {
    if (!emergencyActive) {
      setEmergencyActive(true);
      speak("Emergency mode activated. Contacting emergency services in 5 seconds. Tap cancel if this was activated by mistake.");
    }
  };

  const cancelEmergency = () => {
    if (emergencyActive) {
      setEmergencyActive(false);
      setCountdown(5);
      speak("Emergency call canceled.");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      speak("Please describe your emergency situation.");
    }
  };

  // Vital signs simulation
  const vitalSigns = {
    heartRate: "82 BPM",
    bloodPressure: "125/85 mmHg",
    oxygenLevel: "97%"
  };

  // Emergency services
  const emergencyServices = [
    { name: "Ambulance", phone: "911" },
    { name: "Police", phone: "911" },
    { name: "Poison Control", phone: "1-800-222-1222" },
    { name: "Crisis Helpline", phone: "1-800-273-8255" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Alert Bar */}
      {emergencyActive && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 flex justify-between items-center z-50 animate-pulse">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-bold">EMERGENCY MODE ACTIVE</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Contacting services in {countdown}s</span>
          </div>
          <button
            onClick={cancelEmergency}
            className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold hover:bg-red-100 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-700 to-red-900 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Emergency Response</h1>
            <p className="text-red-100">
              Voice-activated emergency assistance in multiple languages
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Emergency Activation Button */}
            <div className="mb-8 text-center">
              {!emergencyActive ? (
                <button
                  onClick={activateEmergency}
                  className="bg-red-600 text-white rounded-full py-5 px-10 text-xl font-bold shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                >
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  Activate Emergency Response
                </button>
              ) : (
                <div className="text-center">
                  <div className="h-32 w-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                    <div className="relative bg-red-600 h-24 w-24 rounded-full flex items-center justify-center text-white">
                      <AlertTriangle className="h-12 w-12" />
                    </div>
                  </div>
                  <p className="text-red-600 font-bold text-lg mb-4">
                    {countdown > 0 
                      ? `Emergency services will be contacted in ${countdown} seconds` 
                      : "Emergency services contacted"}
                  </p>
                  <button
                    onClick={cancelEmergency}
                    className="bg-white border-2 border-red-600 text-red-600 rounded-full py-2 px-6 font-bold hover:bg-red-50 transition-colors duration-200"
                  >
                    Cancel Emergency
                  </button>
                </div>
              )}
            </div>

            {/* Voice Description Area */}
            <div className="mb-8 p-5 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span>Describe Your Emergency</span>
                <button
                  onClick={toggleMute}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-gray-600" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              </h2>
              
              <div className="flex flex-col items-center mb-4">
                <AnimatedMicrophone 
                  size="lg" 
                  onClick={toggleVoiceRecognition}
                  pulseColor={isListening ? "red" : "blue"}
                  className="mb-4"
                />
                <p className="text-sm text-gray-600">
                  {isListening ? "Listening... Speak clearly about your emergency." : "Tap to describe your emergency"}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-20 mb-6">
                {transcript ? (
                  <p className="text-gray-800">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    Your description will appear here. For example: "I'm having chest pain and difficulty breathing."
                  </p>
                )}
              </div>

              {/* Add VoiceInputBox here for manual text input */}
              <VoiceInputBox />
            </div>

            {/* Location Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                Your Location
              </h2>
              
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                {location ? (
                  <div>
                    <p className="text-gray-800 font-medium">
                      Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      This location will be shared with emergency services
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Determining your location... Please ensure location services are enabled.
                  </p>
                )}
              </div>
            </div>

            {/* Vital Signs */}
            {emergencyActive && countdown === 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  Connected Health Data
                </h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center">
                    <Heart className="h-8 w-8 text-red-500 mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">Heart Rate</div>
                      <div className="text-lg font-semibold text-gray-800">{vitalSigns.heartRate}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center">
                    <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Blood Pressure</div>
                      <div className="text-lg font-semibold text-gray-800">{vitalSigns.bloodPressure}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center">
                    <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Oxygen Level</div>
                      <div className="text-lg font-semibold text-gray-800">{vitalSigns.oxygenLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contacts */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                Emergency Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyServices.map((service, index) => (
                  <a
                    key={index}
                    href={`tel:${service.phone}`}
                    className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{service.name}</div>
                      <div className="text-sm text-green-600">{service.phone}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponse;
