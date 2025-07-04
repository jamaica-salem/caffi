import { Sidebar } from '../partials/Sidebar';
import { Navbar } from '../partials/Navbar';

export const MainLayout = ({ children }) => {
  const user = {
    name: 'Jamaica Salem',
    email: 'jamaica.esalem@gmail.com',
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col flex-1 bg-white">

        {/* Navbar */}
        <Navbar appName="Caffi" user={user} />

        {/* Page Content without padding */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
};
