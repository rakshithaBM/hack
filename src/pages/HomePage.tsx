import { Link } from 'react-router-dom';
import { Stethoscope, Calendar, Brain, AlertTriangle, Activity, Pill, Heart, Eye } from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import AnimatedMicrophone from '../components/ui/AnimatedMicrophone';
import { useVoice } from '../context/VoiceContext';
import EmergencyButton from '../components/ui/EmergencyButton';
import Mic from '../components/ui/Mic';


const HomePage = () => {
  const { startListening, stopListening, isListening, speak } = useVoice();

  const toggleVoiceAssistant = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      speak('Welcome to VoiceCare. How can I assist you with your healthcare needs today?');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Healthcare Transformed <br />through the Power of <span className="text-blue-300">Voice</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                VoiceCare combines AI and voice technology to make healthcare more accessible, intuitive, and responsive for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/symptom-checker" 
                  className="px-6 py-3 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
                >
                  Check Symptoms
                </Link>
                <Link 
                  to="/appointment-booking" 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700"
                >
                  Book Appointment
                </Link>
                <EmergencyButton size="md" className="md:hidden" />
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 filter blur-xl transform scale-110"></div>
                <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-8 rounded-3xl border border-white border-opacity-20 shadow-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
                    <p className="text-blue-100 text-sm">Tap to speak with your healthcare assistant</p>
                  </div>
                  <AnimatedMicrophone 
                    size="xl" 
                    pulseColor={isListening ? "red" : "blue"}
                    onClick={toggleVoiceAssistant}
                    className="mx-auto mb-6"
                  />
                  <p className="text-center text-sm text-blue-100 italic">
                    {isListening ? "Listening..." : "How can I help with your health today?"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Voice-Enabled Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a wide range of healthcare services, all accessible through simple voice commands or traditional navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Multilingual Symptom Checker"
              description="Describe your symptoms in your preferred language and get AI-powered insights and recommendations."
              icon={<Stethoscope className="h-6 w-6" />}
              linkTo="/symptom-checker"
              color="blue"
            />
            
            <FeatureCard
              title="Voice Appointment Booking"
              description="Schedule medical appointments using natural voice commands, with smart calendar integration."
              icon={<Calendar className="h-6 w-6" />}
              linkTo="/appointment-booking"
              color="green"
            />
            
            <FeatureCard
              title="Mental Health Support"
              description="Access 24/7 mental health resources and connect with AI therapy assistants through voice conversations."
              icon={<Brain className="h-6 w-6" />}
              linkTo="/mental-health"
              color="purple"
            />
            
            <FeatureCard
              title="Emergency Response"
              description="Quick access to emergency services with location sharing and critical medical information relay."
              icon={<AlertTriangle className="h-6 w-6" />}
              linkTo="/emergency"
              color="red"
            />
            
            <FeatureCard
              title="Voice Rehabilitation Guide"
              description="Follow personalized rehabilitation exercises with voice-guided instructions and progress tracking."
              icon={<Activity className="h-6 w-6" />}
              linkTo="/rehabilitation"
              color="blue"
            />
            
            <FeatureCard
              title="Medication Reminders"
              description="Never miss a dose with voice-activated medication reminders and refill notifications."
              icon={<Pill className="h-6 w-6" />}
              linkTo="/medication-reminders"
              color="orange"
            />
            
            <FeatureCard
              title="Health Records Voice Access"
              description="Securely access and manage your health records using voice authentication and commands."
              icon={<Heart className="h-6 w-6" />}
              linkTo="/health-records"
              color="green"
            />
            
            <FeatureCard
              title="Tools for Visually Impaired"
              description="Specialized voice interface designed specifically for visually impaired patients."
              icon={<Eye className="h-6 w-6" />}
              linkTo="/visually-impaired-tools"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How VoiceCare Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes healthcare more accessible through intuitive voice technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-6">
                <Mic className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Speak Naturally</h3>
              <p className="text-gray-600">
                Simply speak to the app using natural language in your preferred language. No need for specific commands or keywords.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Our advanced AI understands context, medical terminology, and can recognize symptoms even from casual descriptions.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Care</h3>
              <p className="text-gray-600">
                Receive customized healthcare information, appointment suggestions, and medication reminders based on your history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Call-to-Action */}
      <section className="bg-red-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Need Emergency Assistance?</h2>
              <p className="text-red-100">
                Our emergency response system provides immediate assistance and medical guidance.
              </p>
            </div>
            <EmergencyButton size="lg" className="px-8" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from patients who have experienced the convenience of voice-enabled healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Doe</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a busy mom, I love being able to schedule appointments by simply speaking to my phone. The symptom checker has also been incredibly helpful for my family."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  RB
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Brown</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "After my stroke, using traditional apps was challenging. VoiceCare's voice controls have given me back my independence in managing my healthcare needs."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  MS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Maria Sanchez</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill={i < 4 ? "currentColor" : "none"} stroke={i < 4 ? "none" : "currentColor"} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The multilingual support is fantastic! I can interact with the app in Spanish, which makes discussing medical concerns so much more comfortable and accurate."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience VoiceCare?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their healthcare experience with voice technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="inline-flex items-center px-8 py-3 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-.997-5.979l2.386-3.173a.5.5 0 01.814.58l-3 4a.5.5 0 01-.396.186h-.006a.5.5 0 01-.396-.186l-2-2.666a.5.5 0 11.8-.6l1.798 2.393z" />
                </svg>
                Download for iOS
              </button>
              <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700 border border-blue-400">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Download for Android
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;