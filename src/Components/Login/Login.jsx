import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/configs/axiosInstance";
import { LockClosedIcon } from '@heroicons/react/solid';
import loginIlus from '@/Components/Assets/comp_logo.png';
import centerImage from '@/Components/Assets/Computerlogin-amico.png';
import Cookies from 'js-cookie';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axiosInstance.post('/admin/signin', {
        username,
        password,
      });

      Cookies.set('token', response.data.token, { expires: 7 });
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Username atau password salah.');
      } else {
        setErrorMessage('Terjadi kesalahan, silakan coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-50">
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
            <p className="mt-2 text-sm text-gray-600">Please login to your account</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="-mt-px">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Create new account
                </a>
              </div>
            </div>

            {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}

            <div>
              <button
                type="submit"
                style={{ background: 'linear-gradient(to right, #60A9F6, #B3D4FC)' }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                </span>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;