import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { changeAdminPass } from '../../Redux/Thunks/thunks';
import toast from 'react-hot-toast';

function Settings() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = async (formData) => {
        if(formData.newPassword !== formData.confirmedPassword) {
            setPasswordError("New password doesn't match confirmed password");
            return;
        }
        const userDetails = {userId: user._id, newPassword: formData.newPassword, currentPassword: formData.currentPassword}

        const result = await dispatch(changeAdminPass(userDetails));
        if(changeAdminPass.fulfilled.match(result)) {
            toast.success("Password changed successfully");
        } else if(result.payload.message === "Current password is incorrect") {
            setPasswordError("Current password is incorrect");
        } else {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => { reset() }, []);

    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">General Settings</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        defaultValue="AI SoftTech" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        defaultValue="contact@aisofttech.com" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        defaultValue="+1 234 567 890" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <textarea 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                                        rows="1"
                                        defaultValue="123 Tech Street, Innovation City, IC 12345"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h4>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                        <input 
                                            type="password" 
                                            placeholder='Enter current password'
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            {...register("currentPassword", {
                                                required: {value: true, message: "Current password is required"}
                                            })}
                                        />
                                        {errors.currentPassword && <p className='text-red-500'>{errors.currentPassword.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <input 
                                            type="password"
                                            placeholder='Enter password' 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            {...register("newPassword", {
                                                required: {value: true, message: "New password is required"}
                                            })}
                                        />
                                        {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            placeholder='Confirm new password'
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            {...register("confirmedPassword", {
                                                required: {value: true, message: "Please confirm password"}
                                            })}
                                        />
                                        {errors.confirmedPassword && <p className='text-red-500'>{errors.confirmedPassword.message}</p>}
                                        {passwordError && <p className='text-red-500'>{passwordError}</p>}
                                    </div>
                                    <div className="flex justify-end py-1 lg:mt-10">
                                        <button type='submit' className="bg-button px-6 py-2 rounded-lg hover:bg-button-hover font-semibold transition-all duration-300 cursor-pointer">
                                            {isSubmitting ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings 