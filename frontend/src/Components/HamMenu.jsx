import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EditProfileModal } from './Components';

function HamMenu({ isOpen, onClose, handleLogout }) {
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (isEditProfileOpen) return;
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, isEditProfileOpen]);
    if (!isOpen) return null;
    return (
        <div ref={menuRef} className={`fixed inset-0 w-fit h-full bg-card-bg border border-card-border left-[62%] md:left-[85.5%] shadow-lg top-9/10 flex flex-col justify-center items-start gap-1 px-6 py-10 rounded-lg`}>
            {user && user?.isAdmin ? null : (
                <button className='cursor-pointer font-semibold text-gray-800' onClick={() => setIsEditProfileOpen(true)}><li>Edit Profile</li></button>
            )}
            {user && user?.isAdmin && (
                <button className='cursor-pointer font-semibold text-gray-800' onClick={() => {
                    onClose();
                    navigate("/admin");
                }}>
                    <li>Admin Panel</li>
                </button>
            )}
            <button className='text-red-500 font-semibold cursor-pointer' onClick={handleLogout}><li>Logout</li></button>
            <EditProfileModal isOpen={isEditProfileOpen} onClose={() => {
                onClose();
                setIsEditProfileOpen(false);
                }} />
        </div>
    )
}

export default HamMenu
