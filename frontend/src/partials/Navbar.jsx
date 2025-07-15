import { useState, useRef, useEffect } from 'react';
import { Mail, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/profile.jpg';

export const Navbar = ({ appName, user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/signin');
  };

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

        {/* Profile Section */}
        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
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

          {/* Profile Popover - BELOW */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <ul className="text-sm text-primary-darkest divide-y divide-gray-100">
                <li
                  className="flex items-center gap-3 p-3 hover:bg-primary-lightest cursor-pointer"
                  onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                >
                  <User size={18} /> Profile
                </li>
                <li
                  className="flex items-center gap-3 p-3 hover:bg-primary-lightest cursor-pointer"
                  onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}
                >
                  <Settings size={18} /> Settings
                </li>
                <li
                  className="flex items-center gap-3 p-3 hover:bg-primary-lightest cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> Log out
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};
