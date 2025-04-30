import React from 'react';

const Modal = ({ title, onClose, isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            {/* Overlay */}
            <div className='absolute inset-0 bg-black opacity-50'></div>

            {/* Modal content */}
            <div className='relative z-10 p-4 w-full max-w-2xl max-h-full overflow-y-auto'>
                <div className='bg-white rounded-lg shadow-md '>
                    <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200'>
                        <h3 className='text-lg font-medium text-gray-900'>
                            {title}
                        </h3>
                        <button
                            type='button'
                            className='text-gray-400 bg-transparent hover:bg-gray-200 cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                            onClick={onClose}>
                            X
                        </button>
                    </div>

                    <div className='p-4 md:p-5 space-y-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
