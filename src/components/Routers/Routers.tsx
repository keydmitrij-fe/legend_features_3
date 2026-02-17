import { FC } from 'react';
import { Route, Routes } from 'react-router';
import TodoPage from '../../pages/TodoPage';
import Profile from '../../pages/ProfilePage';

const Routers: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TodoPage />} />
      <Route path={'profile'} element={<Profile />} />
    </Routes>
  );
};

export default Routers;
