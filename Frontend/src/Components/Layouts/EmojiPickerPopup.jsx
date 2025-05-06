import React, { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emojiData) => {
        const imageUrl = emojiData?.imageUrl || '';
        
        if (imageUrl) {
            onSelect(imageUrl);
            setIsOpen(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                className="flex items-center gap-4 cursor-pointer relative"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg overflow-hidden">
                    {icon ? (
                        <img src={icon} alt="icon" className="w-full h-full object-contain" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative z-50">
                    <button
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX size={14} />
                    </button>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
