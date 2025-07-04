import { useState, useEffect } from 'react';
import { Sidebar } from '../partials/Sidebar';
import { Navbar } from '../partials/Navbar';

export const MainLayout = ({ children }) => {
  const user = {
    name: 'Jamaica Salem',
    email: 'jamaica.esalem@gmail.com',
  };

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar Fixed */}
      <div className="h-screen sticky top-0">
        <Sidebar appName="Caffi" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">

        {/* Navbar - hide on scroll */}
        <div className={`transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
          <Navbar appName="Caffi" user={user} />
        </div>

        {/* Page Content - scrollable */}
        <main className="flex-1 overflow-auto p-6 bg-white">
          {children}
        </main>

      </div>
    </div>
  );
};
