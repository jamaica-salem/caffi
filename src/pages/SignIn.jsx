import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { Coffee } from 'lucide-react';

export const SignIn = () => (
  <div className="flex min-h-screen bg-[#e0ece6]">

    {/* Left-side branding (hidden on small screens) */}
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#f5faf7] to-[#e9f3ee] items-center justify-center">
      <div className="text-center px-12">
        <div className="flex justify-center mb-6">
          <div className="bg-[#d4e2da] p-4 rounded-2xl shadow-lg">
            <Coffee className="text-[#226440]" size={40} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#1f3329]">Welcome Back!</h2>
        <p className="mt-4 text-[#1f3329]/70">Sign in to continue to your dashboard</p>
      </div>
    </div>

    {/* Sign-in card */}
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">

        {/* App logo for mobile */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="bg-[#d4e2da] p-4 rounded-2xl shadow-lg">
            <Coffee className="text-[#226440]" size={36} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1f3329] mb-6 text-center">Sign in to your account</h1>

        {/* Email/password form */}
        <form className="space-y-4 mb-8">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#aacbb9] focus:border-[#aacbb9]" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#aacbb9] focus:border-[#aacbb9]" 
          />
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1 text-[#1f3329]">
              <input type="checkbox" className="rounded text-[#226440] focus:ring-[#226440]" /> Remember me
            </label>
            <a href="#" className="text-[#226440] hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-[#226440] text-white rounded-lg py-2 hover:bg-[#1f3329] transition">Sign In</button>
        </form>

        {/* Social login */}
        <div className="text-center text-sm text-gray-500 mb-4">or continue with</div>
        <div className="flex gap-4 justify-center">
          <button className="w-20 flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-[#f0fdf4] transition">
            <FcGoogle size={20} />
          </button>
          <button className="w-20 flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-full py-2 hover:bg-[#155db6] transition">
            <FaFacebookF size={18} />
          </button>
        </div>


        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account? <a href="#" className="text-[#226440] hover:underline">Sign up</a>
        </p>

      </div>
    </div>
  </div>
);
