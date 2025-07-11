import React from 'react'
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from "../../Redux/Thunks/thunks.js"
import toast from "react-hot-toast"
import UserViewModal from "../Modals/UserViewModal.jsx"

function Users() {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);

    const [viewedUser, setViewedUser] = React.useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

    const handleDeleteUser = async (userId) => {
        const result = confirm("Confirm user deletion");
        if(result) {
            const deleteResult = await dispatch(deleteUser(userId));
            if(deleteUser.fulfilled.match(deleteResult)) {
                toast.success("User deleted successfully");
            } else {
                toast.error("Something went wrong");
            }
        }
    }
    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                    {/* <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                        <FaPlus className="text-sm" />
                        Add User
                    </button> */}
                </div>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        {users?.map((user, index) => (
                            <tbody key={index} className={`${index%2 === 0 ? "bg-white" : "bg-gray-50" } divide-y divide-gray-200`}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {user.name[0]}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.isAdmin ? "Admin" : "User"}</td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-4">
                                            <button className="text-blue-600 hover:text-blue-900 cursor-pointer" onClick={() => { setViewedUser(user); setIsViewModalOpen(true); }}><FaEye /></button>
                                            <button className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => handleDeleteUser(user._id)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <UserViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                user={viewedUser}
            />
        </div>
    )
}

export default Users 