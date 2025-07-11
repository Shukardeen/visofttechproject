import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { signupUser, loginUser, resetPassword } from "../Redux/Thunks/thunks.js";
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiFillMessage } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { config } from '../config/config.js';

function AuthModals({ isOpen, onClose, initialMode = 'login' }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [mode, setMode] = useState(initialMode);
    const { register, control, handleSubmit, setValue, getValues, formState: { errors, isSubmitting }, reset } = useForm();
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [persistedEmail, setPersistedEmail] = useState('');
    const [resetPassError, setResetPassError] = useState('');
    const endPoint = !!isForgotPassword ? "forgotPassword" : "send-otp";

    const handleGetOTP = async (formData) => {
        const email = formData.identifier;
        setPersistedEmail(!!isForgotPassword ? formData.identifier : formData.email);
        try {
            const response = await axios.post(`${config.backendUrl}/auth/${endPoint}`, !!isForgotPassword ? { email } : formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            !!isForgotPassword ? setMode('forgotPass') : setMode('register');
            toast.success("OTP sent to your email");
        } catch (error) {
            if (error.response.data.message === "User Already Exists with this Email") {
                alert("User already exists with this email");
                return;
            }
            toast.error("Something went wrong");
        }
    }

    const handleSignup = async (formData) => {
        const result = await dispatch(signupUser(formData));
        if (signupUser.fulfilled.match(result)) {
            onClose();
            setMode('login');
            toast.success("Registered successfully");
            navigate("/");
        } else if (result.payload == "Invalid or expired OTP") {
            alert("Invalid or expired OTP");
        } else {
            toast.error("Something went wrong");
        }
    }

    const handleResetPassword = async (formData) => {
        if (formData.newPassword !== formData.confirmedNewPassword) {
            setResetPassError("New password and confirmed password must be same");
            return;
        }
        const resetData = {
            email: persistedEmail,
            otp: formData.forgotPassOtp,
            newPassword: formData.newPassword
        }
        const result = await dispatch(resetPassword(resetData));
        if (resetPassword.fulfilled.match(result)) {
            onClose();
            setMode('login');
            toast.success("Password updated successfully");
            navigate("/");
        } else {
            toast.error("Something went wrong");
            console.log("ERROR UPDATING PASSWORD :: ", result.payload);
        }
    }

    const handleLogin = async (formData) => {
        const loginData = {}
        loginData.password = formData.password;

        if (emailRegex.test(formData.identifier)) {
            loginData.email = formData.identifier;
        } else if (phoneRegex.test(formData.identifier)) {
            loginData.phone = `91${formData.identifier}`;
        } else {
            setLoginError("Invalid credentials");
        }

        const result = await dispatch(loginUser(loginData));
        if (loginUser.fulfilled.match(result)) {
            onClose();
            navigate("/");
            toast.success("Logged in successfully");
            reset();
            setLoginError('');
        } else if (result.payload.message == "Invalid email or password") {
            setLoginError("Invalid credentials");
        } else {
            setLoginError("Something went wrong");
        }
    }

    // Update mode when initialMode changes
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // Reset form when mode changes
    useEffect(() => {
        reset();
        if (mode === "register" && persistedEmail) {
            setValue("email", persistedEmail);
        }
        setLoginError('');
        setShowPassword(false);
    }, [mode, reset]);

    //disable scroll when authModal is open
    useEffect(() => {
        setIsForgotPassword(false);
        isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed min-h-screen inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                <div className='w-full relative'>
                    <button className='absolute text-3xl top-2 right-2 text-gray-500 hover:bg-gray-300 rounded-full cursor-pointer' onClick={() => {
                        onClose();
                        setIsForgotPassword(false);
                    }}>
                        <IoIosClose />
                    </button>
                </div>
                {/* Tab Navigation */}
                <div className={`flex ${isForgotPassword ? "bg-white" : "bg-gray-50"}`}>
                    {isForgotPassword ? (
                        <h1 className='text-center w-full text-xl font-bold mt-10'>Reset Password</h1>
                    ) : (
                        <>

                            <button
                                className={`cursor-pointer flex-1 py-6 px-6 text-sm font-semibold transition-all duration-300 ${mode === 'login'
                                    ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                                    : 'text-text hover:text-gray-700'
                                    }`}
                                onClick={() => setMode('login')}
                            >
                                Sign In
                            </button>
                            <button
                                className={`cursor-pointer flex-1 py-6 px-6 text-sm font-semibold transition-all duration-300 ${mode === 'signup'
                                    ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                                    : 'text-text hover:text-gray-700'
                                    }`}
                                onClick={() => setMode('signup')}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Form Content */}
                <div className="p-6">
                    {mode === 'login' && (
                        <form onSubmit={handleSubmit((data) => {
                            if (!!isForgotPassword) {
                                handleGetOTP(data);
                            } else {
                                handleLogin(data);
                            }
                        })} className="space-y-5">
                            {loginError && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                    <p className="text-red-600 text-sm text-center">{loginError}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your email or mobile number"
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("identifier", {
                                            required: "Email or mobile number is required",
                                            validate: (value) => {
                                                const email = emailRegex;
                                                const phone = phoneRegex;
                                                if (!email.test(value) && !phone.test(value)) {
                                                    return "Enter a valid email or mobile number";
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.identifier && (
                                    <p className="text-red-500 text-sm">{errors.identifier.message}</p>
                                )}
                            </div>

                            <div className={`space-y-2 ${!!isForgotPassword && "hidden"}`}>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full h-12 pl-12 pr-12 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("password", {
                                            required: { value: !isForgotPassword, message: "Password is required" }
                                        })}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {!!isForgotPassword ? (
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-button hover:bg-button-hover rounded-xl font-semibold shadow-lg hover:shadow-xl cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending OTP..." : "Get OTP"}
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-button hover:bg-button-hover rounded-xl font-semibold shadow-lg hover:shadow-xl cursor-pointer"
                                >
                                    Sign In
                                </button>
                            )}

                            {!isForgotPassword && (
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors duration-300 cursor-pointer" onClick={() => setIsForgotPassword(true)}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {mode === "signup" && (
                        <form onSubmit={handleSubmit(handleGetOTP)} className="space-y-5">
                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("email", {
                                            required: { value: true, message: "Email is required" }
                                        })}
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-button rounded-xl font-semibold hover:bg-button-hover transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending OTP..." : "Verify email"}
                            </button>
                        </form>
                    )}

                    {mode === "register" && (
                        <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={getValues("email")}
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl bg-gray-200"
                                        contentEditable="false"
                                        {...register("email", {
                                            required: { value: true, message: "Email is required" }
                                        })}
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
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
                                                border: '1px solid #c4a964',
                                                borderRadius: '12px',
                                                backgroundColor: '#f9fafb',
                                                fontSize: '14px'
                                            }}
                                            containerStyle={{ width: '100%' }}
                                            buttonStyle={{
                                                border: '1px solid #c4a964',
                                                borderRadius: '12px 0 0 12px',
                                                backgroundColor: '#f9fafb',
                                            }}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    )}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        className="w-full h-12 pl-12 pr-12 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password minimum length must be 8"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "Password maximum length must be 12"
                                            }
                                        })}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("otp", { required: "OTP is required" })}
                                    />
                                    <AiFillMessage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-button rounded-xl font-semibold hover:bg-button-hover transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Signing up..." : "Signup"}
                            </button>
                        </form>
                    )}

                    {mode === "forgotPass" && (
                        <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New password"
                                        className="w-full h-12 pl-12 pr-12 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("newPassword", {
                                            required: "Please enter a new password",
                                            minLength: {
                                                value: 8,
                                                message: "Password minimum length must be 8"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "Password maximum length must be 12"
                                            }
                                        })}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        className="w-full h-12 pl-12 pr-12 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("confirmedNewPassword", {
                                            required: "Please confirm new password",
                                            minLength: {
                                                value: 8,
                                                message: "Password minimum length must be 8"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "Password maximum length must be 12"
                                            }
                                        })}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {resetPassError && <p className='text-red-500'>{resetPassError}</p>}
                                {errors.confirmedNewPassword && <p className="text-red-500 text-sm">{errors.confirmedNewPassword.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="w-full h-12 pl-12 pr-4 border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-card-border focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        {...register("forgotPassOtp", { required: "OTP is required" })}
                                    />
                                    <AiFillMessage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                {errors.forgotPassOtp && <p className="text-red-500 text-sm">{errors.forgotPassOtp.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-button rounded-xl font-semibold hover:bg-button-hover transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>


                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthModals; 