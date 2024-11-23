import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Dialog = ({ isOpen, onClose, children, title }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/25" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          ref={dialogRef}
          className="relative w-full max-w-2xl bg-white dark:bg-background-dark rounded-lg shadow-xl max-h-[90vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-medium">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog; 