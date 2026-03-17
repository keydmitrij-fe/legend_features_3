import { FC } from 'react';
import { Route, Routes } from 'react-router';
import ProfilePage from '../../pages/ProfilePage';
import LoginPage from '../../pages/LoginPage';
import PrivateRoute from '../Route/PrivateRoute.tsx';
import TodoPage from '../../pages/TodoPage';
import RegisterPage from '../../pages/RegisterPage';
import ProtectedRoute from '../Route/ProtectedRoute';
import UsersPage from '../../pages/UsersPage';
import UserPage from '../../pages/UserPage';

const Routers: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={'/'} element={<TodoPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={'/users'} element={<UsersPage />} />
          <Route path={'/user/:id'} element={<UserPage />} />
        </Route>
      </Route>
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterPage />} />
    </Routes>
  );
};

export default Routers;
