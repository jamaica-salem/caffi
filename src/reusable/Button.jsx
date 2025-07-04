export const Button = ({ label, onClick, variant = 'primary' }) => {
  const base = 'px-4 py-2 rounded-lg font-medium';
  const styles = {
    primary: 'bg-brown text-white hover:bg-brown/80',
    secondary: 'bg-beige text-brown hover:bg-beige/80 border border-brown',
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {label}
    </button>
  );
};