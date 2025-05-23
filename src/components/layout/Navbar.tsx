import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, MicOff, Globe } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { isListening, startListening, stopListening } = useVoice();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Symptom Checker', path: '/symptom-checker' },
    { name: 'Book Appointment', path: '/appointment-booking' },
    { name: 'Rehabilitation', path: '/rehabilitation' },
    { name: 'Mental Health', path: '/mental-health' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'Accessibility Tools', path: '/visually-impaired-tools' },
  ];

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-blue-800">VoiceCare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={toggleVoiceRecognition}
              className={`ml-4 p-2 rounded-full transition-colors duration-200 ${
                isListening 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="ml-2 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleVoiceRecognition}
              className={`p-2 rounded-full mr-2 ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-gray-100 text-gray-600 mr-2"
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Language selector dropdown */}
      {isLanguageOpen && (
        <div className="absolute right-4 top-16 md:right-8 mt-2 bg-white rounded-md shadow-lg z-50">
          <LanguageSelector onSelect={() => setIsLanguageOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;