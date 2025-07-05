import React from 'react';
import { useDispatch } from 'react-redux';
import { editUserRole } from '../../Redux/Thunks/thunks.js';
import toast from 'react-hot-toast';

function UserViewModal({ isOpen, onClose, user }) {
    const [isEditingRole, setIsEditingRole] = React.useState(false);
    const [newRole, setNewRole] = React.useState(user?.isAdmin ? 'Admin' : 'User');
    const [isSaving, setIsSaving] = React.useState(false);
    const [currentRole, setCurrentRole] = React.useState(user?.isAdmin ? 'Admin' : 'User');
    const dispatch = useDispatch();

    const handleEditRole = async (userId) => {
        setIsSaving(true);
        const userDetails = {
            userId: userId,
            isAdmin: newRole === 'Admin'
        }
        const result = await dispatch(editUserRole(userDetails));
        setIsSaving(false);
        if(editUserRole.fulfilled.match(result)) {
            toast.success("Role updated successfully");
            setCurrentRole(newRole);
            setIsEditingRole(false);
        } else {
            toast.error("Something went wrong");
        }
    }

    React.useEffect(() => {
        setNewRole(user?.isAdmin ? 'Admin' : 'User');
        setCurrentRole(user?.isAdmin ? 'Admin' : 'User');
        setIsEditingRole(false);
    }, [user]);
    if (!isOpen || !user) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-9/10 p-0 relative animate-fadeIn border-l-8 border-card-border font-sans">
                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-6 pb-3 border-b border-gray-100 rounded-t-2xl bg-white relative">
                    <div>
                        <div className="text-lg font-bold text-gray-900 mb-0.5">User Details</div>
                    </div>
                    <button
                        className="absolute h-8 w-8 right-5 cursor-pointer top-5 text-2xl text-gray-400 hover:text-blue-600 font-bold ml-4 focus:outline-none transition"
                        onClick={onClose}
                        title="Close"
                    >
                        &times;
                    </button>
                </div>
                {/* User Body */}
                <div className="px-7 py-7 bg-gray-50 min-h-[120px] rounded-b-2xl">
                    <div className="mb-4 text-gray-800 text-base font-normal leading-relaxed space-y-2">
                        <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{user.name}</span></div>
                        <div><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{user.email}</span></div>
                        {user.phone && (
                            <div><span className="font-semibold text-gray-700">Phone:</span> <span className="text-gray-900">{user.phone}</span></div>
                        )}
                        <div><span className="font-semibold text-gray-700">Role:</span> <span className="text-gray-900">{currentRole}</span>
                        {isEditingRole ? (
                            <span className="ml-4">
                                <select
                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-text"
                                    value={newRole}
                                    onChange={e => setNewRole(e.target.value)}
                                    disabled={isSaving}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                                <button
                                    className="ml-2 px-3 py-1 rounded bg-button text-xs font-semibold hover:bg-button-hover transition disabled:opacity-60"
                                    disabled={isSaving}
                                    onClick={() => handleEditRole(user._id)}
                                >{isSaving ? 'Saving...' : 'Save'}</button>
                                <button
                                    className="ml-2 px-3 py-1 rounded bg-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-400 transition"
                                    onClick={() => { setIsEditingRole(false); setNewRole(user.isAdmin ? 'Admin' : 'User'); }}
                                    disabled={isSaving}
                                >Cancel</button>
                            </span>
                        ) : (
                            <button
                                className="ml-4 px-3 py-1 rounded bg-card-bg text-text text-xs font-semibold border border-card-border hover:bg-button-hover hover:text-black transition"
                                onClick={() => setIsEditingRole(true)}
                            >Edit Role</button>
                        )}
                        </div>
                        {user.company && (
                            <div><span className="font-semibold text-gray-700">Company:</span> <span className="text-gray-900">{user.company}</span></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserViewModal; 