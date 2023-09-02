import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAccount } from 'wagmi';

export const Layout = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Only go to the dashboard if its connected, else if someone tries to visit it navigate to landing
  if (!isConnected) {
    navigate('/');
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
