import React from 'react';

interface MicProps {
  size?: string | number;
  className?: string;
  onClick?: () => void;
}

const Mic: React.FC<MicProps> = ({ size = 24, className = '', onClick }) => {
  return (
    <button
      type="button"
      aria-label="Microphone"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="text-white"
        width={size}
        height={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 1v11m0 0a3 3 0 006 0v-2a3 3 0 00-6 0v2zM5 10a7 7 0 0014 0m-7 11v-4m-4 4h8"
        />
      </svg>
    </button>
  );
};

export default Mic;
