import { FC } from 'react';
import { Route, Routes } from 'react-router';
import TodoPage from '../../pages/TodoPage';
import Profile from '../../pages/ProfilePage';

const Routers: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TodoPage />}></Route>
      <Route path={'profile'} element={<Profile />}></Route>
    </Routes>
  );
};

export default Routers;
