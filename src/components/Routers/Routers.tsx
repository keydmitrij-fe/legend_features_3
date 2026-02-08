import { FC } from 'react';
import { Route, Routes } from 'react-router';
import AuthPage from '../../pages/AuthPage';

const Routers: FC = () => {
  return (
    <Routes>
      <Route path={'authorization'} element={<AuthPage />}></Route>
      {/*<Route path={'/'} element={<TodoPage />}></Route>*/}
      {/*<Route path={'profile'} element={<Profile />}></Route>*/}
    </Routes>
  );
};

export default Routers;
