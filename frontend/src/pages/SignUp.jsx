import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignUp = () => (
  <div className="flex min-h-screen bg-[#e0ece6]">

    {/* Sign-up card - LEFT SIDE */}
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center gap-3 mb-6">
           <h1 className="text-2xl font-bold text-[#1f3329] text-center">Create your account</h1>
        </div>

        {/* Email/password form */}
        <form className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b5c9be]"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b5c9be]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b5c9be]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b5c9be]"
          />
          <button type="submit" className="w-full bg-[#226440] text-white rounded-lg py-2 hover:bg-[#1b5135] transition">
            Sign Up
          </button>
        </form>

        {/* OR separator */}
        <div className="text-center text-sm text-gray-500 mb-4">or sign up with</div>

        {/* Social login */}
        <div className="flex gap-4 justify-center mb-4">
          <button className="w-20 flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-[#f0fdf4] transition">
            <FcGoogle size={20} />
          </button>
          <button className="w-20 flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-full py-2 hover:bg-[#155db6] transition">
            <FaFacebookF size={18} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/signin" className="text-green-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>

    {/* Branding - RIGHT SIDE*/}
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#f5faf7] to-[#e9f3ee] items-center justify-center">
      <div className="text-center px-12">
        <div className="bg-[#d4e2da] p-4 rounded-2xl shadow inline-block mb-6">
          <Coffee className="text-accent" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-[#1f3329]">Join Caffi Today</h2>
        <p className="mt-4 text-[#1f3329]/70">
          Create an account and start managing your projects with ease and simplicity.
        </p>
      </div>
    </div>

  </div>
);
