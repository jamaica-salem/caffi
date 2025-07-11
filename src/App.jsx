import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import { Tables } from './pages/Tables';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>          
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="tables" element={<MainLayout><Tables /></MainLayout>} />
          <Route path="signin" element={<MainLayout><SignIn /></MainLayout>} />
          <Route path="signup" element={<MainLayout><SignUp /></MainLayout>} />
        </Route>
      </Routes>
    </Router>
  );
}