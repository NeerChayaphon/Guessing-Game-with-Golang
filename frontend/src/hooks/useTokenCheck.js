import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

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
