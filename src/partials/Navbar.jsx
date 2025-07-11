import { useState, useRef, useEffect } from 'react';
import { Mail, Bell, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import profilePic from '../assets/profile.jpg';

export const Navbar = ({ appName, user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-primary-light rounded-2xl shadow mt-4 px-6 py-6 flex items-center justify-between">

      {/* Search */}
      <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 w-80 lg:w-96">
        <Search className="text-gray-400" size={22} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none text-primary-darkest text-base w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-10 relative">

        {/* Email & Notifications */}
        <div className="flex items-center gap-6 text-accent">

          <div className="bg-white p-2 rounded-full cursor-pointer hover:text-primary-darkest hover:shadow transition">
            <Mail size={24} className="text-primary-darkest" />
          </div>

          <div
            className="bg-white p-2 rounded-full cursor-pointer hover:text-primary-darkest hover:shadow transition relative"
            onClick={() => setShowNotifications(!showNotifications)}
            ref={notificationRef}
          >
            <Bell size={24} className="text-primary-darkest" />

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                <div className="p-4 text-sm font-semibold text-primary-darkest border-b border-gray-100">Notifications</div>
                <ul className="max-h-60 overflow-y-auto text-sm text-primary-darkest divide-y divide-gray-100">
                  <li className="p-3 hover:bg-primary-lightest cursor-pointer">📢 New announcement posted</li>
                  <li className="p-3 hover:bg-primary-lightest cursor-pointer">🔔 You have 3 new messages</li>
                  <li className="p-3 hover:bg-primary-lightest cursor-pointer">✅ Task completed successfully</li>
                </ul>
                <div className="text-center p-3 border-t border-gray-100 text-xs text-accent hover:underline cursor-pointer">
                  View All Notifications
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate('/profile')}
        >
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
};
