import ReactDOM from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  actionBar: React.ReactNode;
}

function Modal({onClose, children, actionBar}: ModalProps) { 
    
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    },[]);

    const el = document.querySelector('.modal-container');

    if (!el) return null;
    
    return ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Fondo gris semi-transparente con onClose */}
            <div
            onClick={onClose}
            className="absolute inset-0 bg-gray-300 opacity-80"
            ></div>

            {/* Contenido modal */}
            <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg"
            >
            <div className="flex flex-col justify-between gap-4">
                <div className="flex justify-end">{actionBar}</div>
                {children}
            </div>
            </div>
        </div>,
        el
    );  
}

export default Modal;