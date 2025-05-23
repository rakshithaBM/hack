import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EmergencyButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  const handleClick = () => {
    setIsPressed(true);
    
    // Simulate a button press animation before navigating
    setTimeout(() => {
      setIsPressed(false);
      navigate('/emergency');
    }, 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center font-bold rounded-full
        ${sizeClasses[size]}
        ${isPressed ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-700'}
        text-white shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        ${className}
      `}
      aria-label="Emergency assistance"
    >
      <AlertTriangle className="mr-2 h-5 w-5" />
      <span>Emergency</span>
    </button>
  );
};

export default EmergencyButton;