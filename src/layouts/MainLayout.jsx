import { Sidebar } from '../partials/Sidebar';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
};