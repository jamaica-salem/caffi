import { Link } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/tables', label: 'Tables' },
  { to: '/signin', label: 'Sign In' },
  { to: '/signup', label: 'Sign Up' },
];

export const Sidebar = () => (
  <aside className="w-60 bg-beige border-r border-gray-200 p-4 min-h-screen">
    <nav className="space-y-4">
      {links.map(link => (
        <Link key={link.to} to={link.to} className="block text-brown hover:text-brown/80 font-medium">
          {link.label}
        </Link>
      ))}
    </nav>
  </aside>
);