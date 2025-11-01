import { Link } from 'react-router-dom';

interface MyButtonProps {
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void; // ta bort sen om den inte används
  children: React.ReactNode;
  className?: string;
}

const CButton: React.FC<MyButtonProps> = ({ to, type = 'button', onClick, children, className }) => {
  const baseClasses = "cButton hover:bg-blue-200 transition";

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className ?? ""}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className ?? ""}`}>
      {children}
    </button>
  );
};

export default CButton;