import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  color?: string;
  iconBgColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  color = 'blue',
  iconBgColor = 'blue',
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300 hover:shadow-blue-100',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      title: 'text-blue-800',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      hover: 'hover:border-green-300 hover:shadow-green-100',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      title: 'text-green-800',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      hover: 'hover:border-red-300 hover:shadow-red-100',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
      title: 'text-red-800',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300 hover:shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      title: 'text-purple-800',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      hover: 'hover:border-orange-300 hover:shadow-orange-100',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-600',
      title: 'text-orange-800',
    },
  };

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  const selectedIconBg = colorClasses[iconBgColor as keyof typeof colorClasses]?.iconBg || colorClasses.blue.iconBg;
  const selectedIconText = colorClasses[iconBgColor as keyof typeof colorClasses]?.iconText || colorClasses.blue.iconText;

  return (
    <Link 
      to={linkTo}
      className={`block ${selectedColor.bg} border ${selectedColor.border} rounded-xl p-6 transition-all duration-300 ${selectedColor.hover} hover:shadow-lg group`}
    >
      <div className="flex items-start">
        <div className={`${selectedIconBg} ${selectedIconText} p-3 rounded-lg`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${selectedColor.title}`}>{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors">
            <span className="mr-2 text-sm font-medium">Learn more</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;