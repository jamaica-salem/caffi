import React from 'react';

const ActionButton = ({ label, icon: Icon, variant = 'primary', onClick }) => {
  const baseStyles = 'flex items-center gap-3 px-6 py-3 rounded-full text-base font-semibold transition';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    secondary: 'bg-white text-accent border border-accent hover:bg-accent hover:text-white',
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default ActionButton;
