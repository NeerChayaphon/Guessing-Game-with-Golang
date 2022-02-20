import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// useTokenCheck -- react hook to check for a token in the localStorage
// if there is not token, then redirect to login page
const useTokenCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
};

export default useTokenCheck;
