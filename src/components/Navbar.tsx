import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import logo from '../assets/small-logo.svg';

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/rollups">My rollups</Link>
            </li>
            <li>
              <Link to="/providers">Providers</Link>
            </li>
          </ul>
        </div>
        <h1 className="normal-case text-xl mx-2">
          <img src={logo} alt="our logo" />
        </h1>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li className="mx-1">
              <Link to="/rollups">My rollups</Link>
            </li>
            <li className="mx-1">
              <Link to="/providers">Providers</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
};
