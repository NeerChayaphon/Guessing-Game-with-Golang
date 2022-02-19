import {useContext,useEffect} from 'react';
import {UserContext} from '../context/userContext';
import {useFetchUser} from '../hooks/useFetchUser';
import useTokenCheck from '../hooks/useTokenCheck';

const Home = () => {
  useTokenCheck();
  useFetchUser();

  const {playerName} = useContext(UserContext);
  return <div>User {playerName}</div>;
};

export default Home;
