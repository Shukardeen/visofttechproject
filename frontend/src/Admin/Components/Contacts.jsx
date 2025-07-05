import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { markAllRead, markAsRead, destroyContact } from "../../Redux/Thunks/thunks.js"
import toast from "react-hot-toast"
import ContactViewModal from "../Modals/ContactViewModal";

function Contacts() {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);
    const [viewIndex, setViewIndex] = useState(null);

    const handleDestroyContact = async (contactId) => {
        const result = await dispatch(destroyContact(contactId));
        if(destroyContact.fulfilled.match(result)) {
            toast.success("Contact deleted successfully");
        } else {
            toast.error("Something went wrong");
        }
    }

    const handleMarkAllRead = async () => {
        const result = await dispatch(markAllRead());
        if(markAllRead.fulfilled.match(result)) {
            toast.success("All marked as read");
        } else {
            toast.error("Something went wrong");
        }
    }

    const openViewModal = (idx) => {
        setViewIndex(idx);
        const contact = contacts[idx];
        if (contact && !contact.isRead) {
            dispatch(markAsRead(contact._id));
        }
    };
    const closeViewModal = () => setViewIndex(null);
    const handlePrev = () => setViewIndex((idx) => (idx > 0 ? idx - 1 : idx));
    const handleNext = () => setViewIndex((idx) => (idx < contacts.length - 1 ? idx + 1 : idx));

    const allRead = contacts.length > 0 && contacts.every((c) => c.isRead);

    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Contact Messages</h3>
                    <button
                        className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto mt-2 sm:mt-0 font-semibold 
                            ${allRead || contacts.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 cursor-pointer'}
                        `}
                        onClick={handleMarkAllRead}
                        disabled={allRead || contacts.length === 0}
                    >
                        Mark All Read
                    </button>
                </div>
            </div>
            <div className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                    {contacts.length === 0 ? (
                        <div>
                            <p className='font-semibold text-gray-600 text-center'>No contacts to show</p>
                        </div>
                    ) : (
                        contacts.map((contact, index) => (
                            <div key={contact._id || index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 gap-2 sm:gap-0">
                                <div className="flex items-center space-x-3 w-full">
                                    <div className="w-10 h-10 bg-card-bg border border-card-border rounded-full flex items-center justify-center font-semibold text-lg">
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                                        <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                                        <p className="text-xs text-gray-500 mt-1 truncate">{contact.message.substring(0, 50)}...</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${contact.isRead ? '' : 'bg-blue-400 text-white'}`}>{contact.isRead ? null : "New"}</span>
                                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 cursor-pointer" onClick={() => openViewModal(index)}>
                                        <FaEye />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 cursor-pointer" onClick={() => handleDestroyContact(contact._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
            <ContactViewModal
                isOpen={viewIndex !== null}
                onClose={closeViewModal}
                contact={contacts[viewIndex]}
                onPrev={handlePrev}
                onNext={handleNext}
                hasPrev={viewIndex > 0}
                hasNext={viewIndex < contacts.length - 1}
            />
        </div>
    )
}

export default Contacts 