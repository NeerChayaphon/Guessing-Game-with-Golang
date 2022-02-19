import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const HandleSubmit = async () => {
    setError(null);
    const url = 'http://localhost:8080/login';
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({username: username, password: password}),
    };
    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const json = await res.json();
      setData(json);
      setError(null);
      localStorage.setItem('token', json.token);
      navigate("/")
    } catch (err) {
      if (err.message == 'Unauthorized') {
        setError('Incorrect Username or Password');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className='min-h-screen bg-sky-500 flex justify-center items-center '>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            User Sign in
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            Please Sign in to play the guessing game
          </p>
        </div>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            id='username'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            id='password'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='text-center mt-6'>
          {!data ? (
            <button
              type='submit'
              className='py-2 w-36 text-xl text-white bg-sky-500 rounded-2xl hover:bg-sky-700'
              onClick={HandleSubmit}
            >
              Sign in
            </button>
          ) : (
            <button
              type='button'
              disabled
              className='py-2 w-36 text-xl text-white bg-green-500 rounded-2xl '
              disabled
            >
              Processing...
            </button>
          )}

          {!error ? (
            <p className={'mt-4 text-sm text-white'}>----</p>
          ) : (
            <p className={'mt-4 text-sm text-red-500'}>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
