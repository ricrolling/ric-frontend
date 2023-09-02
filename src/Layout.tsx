import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAccount } from 'wagmi';

export const Layout = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  if (!isConnected) {
    // navigate('/');
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
