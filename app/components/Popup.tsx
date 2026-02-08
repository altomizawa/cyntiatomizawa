import { on } from 'events';
import React, { useEffect } from 'react'

const Popup = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className='fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
         <div className='border flex flex-col items-center justify-center gap-4'>
            <h2 className='text-3xl'>Collection Name</h2>
            <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button onClick={onClose} className='px-4 py-2 bg-stone-500 text-white rounded'>Close</button>
          </div>
      </div>
    </div>
  )
}

export default Popup
