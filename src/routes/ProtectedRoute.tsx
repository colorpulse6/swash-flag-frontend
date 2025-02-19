import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext)!;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
