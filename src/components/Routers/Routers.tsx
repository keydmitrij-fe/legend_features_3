import { FC } from 'react';
import Profile from '../../pages/Profile';
import TodoPage from '../../pages/TodoPage';
import { Route, Routes } from 'react-router';

const Routers: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TodoPage />}></Route>
      <Route path={'profile'} element={<Profile />}></Route>
    </Routes>
  );
};

export default Routers;
