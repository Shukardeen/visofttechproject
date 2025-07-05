import React from 'react';

function ContactViewModal({ isOpen, onClose, contact, onPrev, onNext, hasPrev, hasNext }) {
    if (!isOpen || !contact) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-9/10 p-0 relative animate-fadeIn border-l-8 border-card-border font-sans">
                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-6 pb-3 border-b border-gray-100 rounded-t-2xl bg-white relative">
                    <div>
                        <div className="text-lg font-bold text-gray-900 mb-0.5">{contact.subject || 'Contact Message'}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-semibold">From:</span> <span className="text-text font-semibold">{contact.name}</span> &lt;{contact.email}&gt;
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{new Date(contact.createdAt).toLocaleString()}</div>
                    </div>
                    <button
                        className="absolute h-8 w-8 right-5 cursor-pointer top-5 text-2xl text-gray-400 hover:text-text font-bold ml-4 focus:outline-none transition"
                        onClick={onClose}
                        title="Close"
                    >
                        &times;
                    </button>
                </div>
                {/* Message Body */}
                <div className="px-7 py-7 bg-gray-50 min-h-[120px] rounded-b-2xl">
                    <div className="mb-8 text-gray-800 whitespace-pre-line text-base font-normal leading-relaxed">
                        {contact.message}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-6">
                        <button
                            className={`px-3 py-1.5 rounded-md bg-white border border-card-border text-text font-semibold shadow-sm hover:bg-blue-50 cursor-pointer transition ${!hasPrev && 'opacity-50 cursor-not-allowed'}`}
                            onClick={onPrev}
                            disabled={!hasPrev}
                        >
                            &#8592; Prev
                        </button>
                        <button
                            className={`px-3 py-1.5 rounded-md bg-white border border-card-border text-text font-semibold shadow-sm hover:bg-blue-50 cursor-pointer transition ${!hasNext && 'opacity-50 cursor-not-allowed'}`}
                            onClick={onNext}
                            disabled={!hasNext}
                        >
                            Next &#8594;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactViewModal; 