import React from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  if (location.pathname === '/login') {
    return <></>;
  }
  

  return (
    <>
      <nav className='flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-3 px-6 bg-gray-800 shadow sm:items-baseline w-full '>
        <div className='mb-2 sm:mb-0'>
          <a
            href='/'
            className='text-2xl no-underline text-white hover:text-blue-dark'
          >
            Guessing Game
          </a>
        </div>
        <div>
          <button onClick={signOut} className='py-1 w-24 text-xl text-white bg-red-500 rounded-md hover:bg-red-600'>
            Sign out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
