import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/configs/axiosInstance";
import { LockClosedIcon } from '@heroicons/react/solid';
import loginIlus from '@/Components/Assets/comp_logo.png';
import centerImage from '@/Components/Assets/Computerlogin-amico.png';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axiosInstance.post('/admin/request-otp', {
        email,
      });

      setSuccessMessage('OTP code is sent to your email.');
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axiosInstance.post('/admin/verify-otp', {
        email,
        otp,
      });

      setSuccessMessage('OTP code verified. Please input new password.');
    } catch (error) {
      setErrorMessage('Wrong or expired OTP code');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Password did not match');
      return;
    }

    try {
      await axiosInstance.post('/admin/reset-password', {
        email,
        otp,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      });

      setSuccessMessage('');
      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-50">
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-green-500">Reset Password Successfully. Please Sign In with your new Password.</p>
          </div>
        </div>
      )}
      <div 
        className="flex-1 text-white p-10 order-last sm:order-first"
        style={{ background: 'linear-gradient(to top, #D2E2FB 30%, #86A8DB)' }}
      >
        <div className="flex justify-center items-center h-full">
          <img src={centerImage} alt="Center" className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-10 order-first sm:order-last">
        <div className="max-w-md w-full">
          <div className="text-center">
            <img className="mx-auto h-12 w-auto" src={loginIlus} alt="Workflow" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              We are The <span className="block">HR Harmony Team</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">Reset your password</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ background: 'linear-gradient(to right, #60A9F6, #B3D4FC)' }}
                  className="group relative flex justify-center border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send OTP
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  style={{ background: 'linear-gradient(to right, #60A9F6, #B3D4FC)' }}
                  className="group relative flex justify-center border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify OTP
                </button>
              </div>
              <div>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="confirm-new-password"
                  name="confirm-new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 text-sm mb-2">{successMessage}</div>}

            <div>
              <button
                type="submit"
                style={{ background: 'linear-gradient(to right, #60A9F6, #B3D4FC)' }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                </span>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;