import { useVoice } from '../../context/VoiceContext';

interface LanguageSelectorProps {
  onSelect: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  const { language, setLanguage } = useVoice();

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Español' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'ar-SA', name: 'العربية' },
    { code: 'hi-IN', name: 'हिन्दी' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    onSelect();
  };

  return (
    <div className="py-2">
      <h3 className="px-4 text-sm font-medium text-gray-700 mb-2">Select Language</h3>
      <ul className="max-h-60 overflow-auto">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                language === lang.code ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;