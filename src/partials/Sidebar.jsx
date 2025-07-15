import { NavLink } from 'react-router-dom';
import { Coffee, LayoutDashboard, User, Table2, BookOpen, LogIn, UserPlus } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/tables', label: 'Tables', icon: Table2 },
  { to: '/library', label: 'Library', icon: BookOpen },
];

const authItems = [
  { to: '/signin', label: 'Sign In', icon: LogIn },
  { to: '/signup', label: 'Sign Up', icon: UserPlus },
];

export const Sidebar = ({ appName }) => (
  <aside className="w-64 h-screen bg-primary-light border-r border-gray-200 p-8 flex flex-col rounded-2xl shadow-lg mx-4 mt-1 sm:mt-2 md:mt-5">

    {/* App Logo and Name */}
    <div className="flex items-center gap-4 mb-12">
      <Coffee className="text-accent" size={32} />
      <span className="text-2xl font-extrabold text-accent">{appName}</span>
    </div>

    <div className="flex-1 flex flex-col justify-between">

      <div>
        {/* MENU */}
        <div className="mb-5 text-base font-bold text-accent uppercase tracking-widest">Menu</div>
        <nav className="space-y-2 mb-12">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-4 text-lg font-medium rounded-lg px-3 py-2 transition-colors
                 ${isActive ? 'text-accent bg-primary-light border-l-4 border-accent' : 'text-primary-darkest hover:text-accent hover:bg-primary-lightest'}`
              }
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* AUTHENTICATION */}
        <div className="mb-5 text-base font-bold text-accent uppercase tracking-widest">Authentication</div>
        <nav className="space-y-2">
          {authItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-4 text-lg font-medium rounded-lg px-3 py-2 transition-colors
                 ${isActive ? 'text-accent bg-primary-light border-l-4 border-accent' : 'text-primary-darkest hover:text-accent hover:bg-primary-lightest'}`
              }
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

      </div>

    </div>

  </aside>
);
