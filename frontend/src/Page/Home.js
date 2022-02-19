import {useContext, useState} from 'react';
import {UserContext} from '../context/userContext';
import {useFetchUser} from '../hooks/useFetchUser';
import useTokenCheck from '../hooks/useTokenCheck';
import Navbar from '../components/Navbar';

const Home = () => {
  useTokenCheck();
  useFetchUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = async () => {};

  const {playerName} = useContext(UserContext);
  return (
    <>
      <div className='min-h-screen bg-sky-500 flex justify-center items-center '>
        <div className='pt-6 px-12 mb-6 bg-white rounded-2xl shadow-xl z-20 justify-center items-center'>
          <div>
            <h1 className='text-3xl font-bold text-center mb-2 cursor-pointer'>
              Guess a number between 1-100
            </h1>
            <p className={'mb-4 text-lg text-black text-center'}>
              Enter your number here
            </p>
          </div>

          <div class='flex flex-col justify-center items-center'>
            <input
              type='text'
              name='password'
              placeholder='Number'
              id='password'
              className='block py-4 px-4 rounded-lg w-1/3 border outline-none text-center text-xl'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='space-y-4 md:flex md:items-center mb-6'></div>

          <div className='text-center mt-6'>
            <button
              type='submit'
              className='py-2 w-36 text-xl text-white bg-sky-500 rounded-2xl hover:bg-sky-700'
              onClick={HandleSubmit}
            >
              Guess
            </button>
            <p className={'mt-3 text-sm text-red-500'}>Message</p>
            <p className={'mt-1 mb-4 text-sm text-black'}>Try from 1-100</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
