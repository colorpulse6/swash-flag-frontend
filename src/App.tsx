import { AuthProvider } from './context/AuthContext.tsx';
import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ApiTokens from './pages/APITokens.tsx';
import Layout from './components/Layout.tsx';
import LandingPage from './pages/Landing.tsx';
import AuthPage from './pages/AuthPage.tsx';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage startLogin />} />
        <Route path="/signup" element={<AuthPage />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/api-tokens" element={<ApiTokens />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
