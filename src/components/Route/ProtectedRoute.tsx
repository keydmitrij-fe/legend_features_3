import { Navigate, Outlet } from 'react-router';
import usePermissions from '../../hooks/usePermissions.ts';

const ProtectedRoute = () => {
  if (usePermissions()) {
    return <Outlet />;
  } else {
    return <Navigate to={'/'} />;
  }
};

export default ProtectedRoute;
