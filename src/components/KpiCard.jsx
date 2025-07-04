import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KpiCard = ({ title, value, change, icon: Icon, isIncrease, bgColor, textColor }) => (
  <div className={`${bgColor} rounded-xl p-6 shadow ${textColor}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-base">{title}</h3>
      <Icon size={24} />
    </div>
    <p className={`text-4xl font-extrabold mb-2 ${textColor}`}>{value}</p>
    <div className="flex items-center text-sm">
      {isIncrease ? (
        <ArrowUpRight size={16} className="text-green-500 mr-1" />
      ) : (
        <ArrowDownRight size={16} className="text-red-500 mr-1" />
      )}
      <span>{change}</span>
    </div>
  </div>
);
