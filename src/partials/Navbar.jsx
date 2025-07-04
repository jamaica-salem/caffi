import { Mail, Bell, Search } from 'lucide-react';
import profilePic from '../assets/profile.jpg';  // Local image

export const Navbar = ({ appName, user }) => (
  <nav className="bg-primary-light px-6 py-6 rounded-2xl shadow mx-4 mt-4 flex items-center justify-between">

    {/* Search */}
    <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 w-80 lg:w-96">
      <Search className="text-gray-400" size={22} />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none text-primary-darkest text-base w-full"
      />
    </div>

    {/* Right */}
    <div className="flex items-center gap-10">
      
      {/* Email & Notification Icons */}
      <div className="flex items-center gap-6 text-accent">
        <div className="bg-white p-2 rounded-full cursor-pointer hover:text-primary-darkest hover:shadow">
          <Mail size={24} className="text-primary-darkest" />
        </div>
        <div className="bg-white p-2 rounded-full cursor-pointer hover:text-primary-darkest hover:shadow">
          <Bell size={24} className="text-primary-darkest" />
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          src={profilePic}
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-base leading-tight text-accent">
          <div className="font-semibold text-lg">{user.name}</div>
          <div className="text-sm">{user.email}</div>
        </div>
      </div>
    </div>
  </nav>
);
