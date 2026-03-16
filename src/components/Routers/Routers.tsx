import { FC } from 'react';
import { Route, Routes } from 'react-router';
import ProfilePage from '../../pages/ProfilePage';
import LoginPage from '../../pages/LoginPage';
import PrivateRoute from '../Route/PrivateRoute.tsx';
import TodoPage from '../../pages/TodoPage';
import RegisterPage from '../../pages/RegisterPage';
import UsersPage from '../../pages/UsersPage';

const Routers: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={'/'} element={<TodoPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/users'} element={<UsersPage />} />
      </Route>
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterPage />} />
    </Routes>
  );
};

export default Routers;
