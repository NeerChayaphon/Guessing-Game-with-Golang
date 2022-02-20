import {useContext, useState} from 'react';
import {UserContext} from '../context/userContext';
import {useFetchUser} from '../hooks/useFetchUser';
import useTokenCheck from '../hooks/useTokenCheck';
import {useNavigate} from 'react-router-dom';
import WinModal from '../components/WinModal';

// The main page of the guessing game
const Home = () => {
  useTokenCheck(); // token check
  useFetchUser(); // user information checking or fetching
  const navigate = useNavigate();
  const {playerName} = useContext(UserContext); // player's name from context API

  const [guessNumber, setGuessNumber] = useState(null); // number that user guess
  const [result, setResult] = useState({
    message: '',
    status: false,
  });
  const [min, setMin] = useState(1); // min value
  const [max, setMax] = useState(100); // max value
  const [count, setCount] = useState(0); // count of guess

  // Function for submiting number and getting the result
  const HandleSubmit = async (e) => {
    e.preventDefault();
    // validate user input
    if (isNumeric(guessNumber)) {
      setCount(count + 1); // count the number of guess
      const url = `http://localhost:8080/guess?guessNumber=${guessNumber}`;
      const requestOptions = {
        method: 'GET',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
      };
      try {
        const res = await fetch(url, requestOptions); // fetch data
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        // set the result
        setResult({
          message: json.message,
          status: json.status,
        });

        updateRange(json.message, guessNumber); // update the range of the answer for hint
      } catch (err) {
        // if user is Unauthorized, then back to login page
        if (err.message == 'Unauthorized') {
          navigate('/login');
        } else {
          setResult({
            message: err.message,
            status: false,
          });
        }
      }
    } else {
      setResult({
        message: 'Enter only number',
        status: false,
      });
    }
  };

  // validate user input
  const isNumeric = (guessNumber) => {
    return /^-?\d+$/.test(guessNumber);
  };

  // change the range of the answer
  const updateRange = (message, guessNumber) => {
    const guessInt = parseInt(guessNumber);
    if (message.includes('low')) {
      if (guessInt >= min) {
        setMin(guessInt + 1);
      }
    } else if (message.includes('high')) {
      if (guessInt <= max) {
        setMax(guessInt - 1);
      }
    }
  };

  // restart game
  const reset = () => {
    setMin(1);
    setMax(100);
    setResult({
      message: '',
      status: false,
    });
    setCount(0);
    setGuessNumber(null);
  };

  // if the user guess the correct number
  if (result.status) {
    return <WinModal data={{playerName, guessNumber, count, reset}} />;
  } else {
    return (
      <>
        <div className='min-h-screen bg-sky-500 flex justify-center items-center '>
          <div className='pt-6 px-12 mb-14 bg-white rounded-2xl shadow-xl z-20 justify-center items-center'>
            <div>
              <h1 className='text-3xl font-bold text-center mb-2 cursor-pointer'>
                Guess a number between 1-100
              </h1>
              <p className={'mb-4 text-lg text-black text-center'}>
                Enter your number here
              </p>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <input
                type='text'
                required
                name='guessNumber'
                placeholder='Number'
                id='guessNumber'
                className='block py-4 px-4 rounded-lg w-1/3 border outline-none text-center text-xl'
                onChange={(e) => setGuessNumber(e.target.value)}
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
              {!result.message ? (
                <p className={'mt-3 text-base text-white'}>----</p>
              ) : (
                <p className={'mt-3 text-base text-red-500'}>
                  {result.message}
                </p>
              )}

              {min === 1 && max === 100 ? (
                <p className={'mt-1 mb-2 text-base text-white'}>----</p>
              ) : (
                <p className={'mt-1 mb-2 text-base text-black'}>
                  Try again from {min}-{max}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
