import { AuthProvider } from './context/AuthContext.tsx';
import { Navigate, Route, Routes } from 'react-router';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ApiTokens from './pages/APITokens.tsx';
import FlagList from './components/FlagList.tsx';
import Layout from './components/Layout.tsx';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<FlagList />} />
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
