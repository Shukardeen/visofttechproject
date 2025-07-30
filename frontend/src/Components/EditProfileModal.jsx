import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import { updateProfile, logoutUser } from "../Redux/Thunks/thunks.js";
import toast from 'react-hot-toast';

function EditProfileModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.user);
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (formData) => {
        const userData = new FormData();
        userData.append("name", formData.name);
        userData.append("email", formData.email);
        userData.append("company", formData.company || "");
        userData.append("phone", formData.phone);
        userData.append("profilePic", formData.profilePic[0] || "");

        const result = await dispatch(updateProfile(userData));
        if (updateProfile.fulfilled.match(result)) {
            onClose();
            dispatch(logoutUser());
            toast.success("Profile Updated successfully, please login again");
        } else {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        if (isOpen) {
            reset({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone?.toString() || '',
                profilePic: '',
                password: ''
            });
        }
    }, [isOpen, user, reset]);

    return (
        <Modal
            title="Edit Profile"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            wrapClassName="py-10"
        >
            <div className="space-y-4">
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    {error && <p className='text-red-500'>{error.message}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Your name"
                            {...register("name", {
                                required: { value: true, message: "Name is required" }
                            })}
                        />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className='text-red-500'>*</span></label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Your email"
                            {...register("email", {
                                required: { value: true, message: "Email is required" }
                            })}
                        />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: 'Phone number is required' }}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    country={'in'}
                                    enableSearch
                                    preferredCountries={['in', 'us', 'gb']}
                                    inputStyle={{
                                        width: '100%',
                                        height: '48px',
                                        paddingLeft: '48px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '12px',
                                        backgroundColor: '#f9fafb',
                                        fontSize: '14px'
                                    }}
                                    containerStyle={{ width: '100%' }}
                                    buttonStyle={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '12px 0 0 12px',
                                        backgroundColor: '#f9fafb'
                                    }}
                                    onChange={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture &#40;Optional&#41;</label>
                        <input
                            type="file"
                            className="w-full border file:bg-gray-200 file:h-full file:px-3 file:mr-3 file:cursor-pointer h-10 rounded"
                            {...register("profilePic")}
                        />
                        {!user?.profilePic ? null : (
                            <>
                            <p className='text-xs mt-2'>Current Profile Picture:</p>
                            <img src={user?.profilePic} alt="Profile" className="mt-2 w-10 h-10 rounded-md object-cover border" />
                            </>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company &#40;Optional&#41;</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Your company name"
                            {...register("company")}
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="New password"
                            {...register("password", {
                                required: false
                            })}
                        />
                    </div> */}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 cursor-pointer"
                            onClick={onClose}
                        >Cancel</button>
                        <button
                            type='submit'
                            className="px-4 py-2 bg-button rounded hover:bg-button-hover cursor-pointer"
                        // onClick={handleSave}
                        >{isSubmitting ? "Saving..." : "Save"}</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default EditProfileModal; 