import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/small-logo.svg';
import rickRollGif from '../assets/rickroll-roll.gif';

export const Landing = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/rollups');
    }
  }, [isConnected]);

  return (
    <div className="hero p-12 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex flex-col">
            <img className="h-28 w-auto m-auto" src={logo} alt="our logo" />
          <p className="py-6">Create your own rollup effortlessly.</p>
            <img className="h-64 w-auto mx-auto my-6" src={rickRollGif} alt="RickRollGif" />
          </div>
          <div className="flex">
            <div className="mx-auto">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
