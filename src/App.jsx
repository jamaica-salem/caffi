import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import { Tables } from './pages/Tables';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Library } from './pages/Library'; 

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes - RootLayout */}
        <Route element={<RootLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes - MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/library" element={<Library />} />
        </Route>

      </Routes>
    </Router>
  );
}
