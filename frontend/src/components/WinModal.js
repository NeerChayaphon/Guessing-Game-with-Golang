import React from 'react';
import {useNavigate} from 'react-router-dom';

// Pop up in the home page after the user has guessed the answer
const WinModal = (props) => {
  const navigate = useNavigate();
  const quitGame = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
      <div className='min-h-screen bg-green-500 flex justify-center items-center '>
        <div className='py-20 px-20 mb-6 bg-white rounded-2xl shadow-xl z-20 justify-center items-center'>
          <div>
            <h1 className='text-5xl font-bold text-center mb-2 cursor-pointer'>
              YOU WIN
            </h1>
            <h1 className='text-xl font-bold text-center mb-3 cursor-pointer'>
              Congratulations {props.data.playerName}
            </h1>
            <p className={'mb-1 text-lg text-black text-center'}>
              The correct number is{' '}
              <span className='text-red-500'>{props.data.guessNumber} </span>
            </p>
            <p className={'mb-1 text-lg text-black text-center'}>
              You have guessed{' '}
              <span className='text-red-500'>{props.data.count} </span>{' '}
              {props.data.count === 1 ? <span>time</span> : <span>times</span>}
            </p>
          </div>

          <div className='flex flex-row items-center justify-around text-center mt-10'>
            <button
              type='submit'
              className='py-2 px-1 w-32 mx-1 text-xl text-white bg-sky-500 rounded-lg hover:bg-sky-700'
              onClick={props.data.reset}
            >
              Play Again
            </button>
            <button
              type='submit'
              className='py-2 px-1 w-32 mx-1 text-xl text-white bg-red-500 rounded-lg hover:bg-red-700'
              onClick={quitGame}
            >
              Quit Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinModal;
