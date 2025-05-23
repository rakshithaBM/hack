import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

interface AnimatedMicrophoneProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulseColor?: string;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

const AnimatedMicrophone: React.FC<AnimatedMicrophoneProps> = ({
  size = 'md',
  pulseColor = 'blue',
  iconColor = 'white',
  className = '',
  onClick,
}) => {
  const { isListening } = useVoice();
  const [isActive, setIsActive] = useState(false);
  
  // Sync with isListening from context
  useEffect(() => {
    setIsActive(isListening);
  }, [isListening]);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const sizeClasses = {
    sm: { container: 'h-10 w-10', icon: 'h-4 w-4' },
    md: { container: 'h-16 w-16', icon: 'h-6 w-6' },
    lg: { container: 'h-20 w-20', icon: 'h-8 w-8' },
    xl: { container: 'h-24 w-24', icon: 'h-10 w-10' },
  };

  const pulseColors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  const iconColors = {
    white: 'text-white',
    blue: 'text-blue-500',
    red: 'text-red-500',
    black: 'text-black',
    gray: 'text-gray-700',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedPulseColor = pulseColors[pulseColor as keyof typeof pulseColors] || pulseColors.blue;
  const selectedIconColor = iconColors[iconColor as keyof typeof iconColors] || iconColors.white;

  return (
    <div className={`relative ${className}`}>
      {/* Pulse animation when active */}
      {isActive && (
        <>
          <div 
            className={`absolute inset-0 rounded-full ${selectedPulseColor} opacity-30 animate-ping`} 
            style={{ animationDuration: '1.5s' }}
          ></div>
          <div 
            className={`absolute inset-0 rounded-full ${selectedPulseColor} opacity-20 animate-ping`} 
            style={{ animationDuration: '2s', animationDelay: '0.5s' }}
          ></div>
        </>
      )}
      
      {/* Microphone button */}
      <button
        onClick={handleClick}
        className={`
          ${selectedSize.container} 
          rounded-full 
          ${isActive ? selectedPulseColor : 'bg-gray-200 hover:bg-gray-300'} 
          flex items-center justify-center 
          transition-colors duration-300
          shadow-lg
        `}
        aria-label={isActive ? 'Microphone active' : 'Activate microphone'}
      >
        <Mic className={`${selectedSize.icon} ${selectedIconColor}`} />
      </button>

      {/* Sound wave visualization when active */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 pt-2 flex items-end space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`${selectedPulseColor} rounded-full w-1 animate-sound-wave`}
              style={{
                height: `${8 + Math.random() * 12}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimatedMicrophone;