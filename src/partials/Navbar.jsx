import { Mail, Bell } from 'lucide-react';
import profilePic from '../assets/profile.jpg';  // Local image

export const Navbar = ({ appName, user }) => (
  <nav className="bg-primary-light p-4 rounded-2xl shadow mx-4 mt-4 flex items-center justify-between">

    {/* Search */}
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary-darkest w-64"
      />
    </div>

    {/* Right */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4 text-accent">
        <Mail className="cursor-pointer hover:text-primary-darkest" size={20} />
        <Bell className="cursor-pointer hover:text-primary-darkest" size={20} />
      </div>

      <div className="flex items-center gap-3">
        <img
          src={profilePic}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-sm leading-tight text-accent">
          <div className="font-semibold">{user.name}</div>
          <div className="text-xs">{user.email}</div>
        </div>
      </div>
    </div>
  </nav>
);
