import { Outlet } from 'react-router-dom';
import { Navbar } from '../partials/Navbar';
import { Footer } from '../partials/Footer';

export const RootLayout = () => {
  return (
    <div className="font-poppins bg-beige min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
