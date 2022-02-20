import {useContext, useEffect} from 'react';
import { UserContext } from '../context/userContext'
import { useLocation,useNavigate } from 'react-router-dom';

// useFetchUser -- custom react hook to fetch user's information from the context API or Jwt token
// The main function is use to verify user in the system and set user data in context API
// It can also fetch user's information from the API using JWT token

export const useFetchUser = () => {
    const {userID, playerName, setUserID, setPlayerName} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!userID && !playerName) { // check for user in context API
        if (localStorage.getItem('token')) { // check for token
          fetchUser(setUserID, setPlayerName); // fetch user data from API using token
        } 
      } 
    }, [setUserID, setPlayerName]);
  
    // user for refetching the data
    const refetch = () => {
      fetchUser(setUserID, setPlayerName);
    };
  
    // fetch data from API
    const fetchUser = async (setUserID, setPlayerName) => {
      const url = 'http://localhost:8080/authCheck';
      const requestOptions = {
        method: 'GET',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
      };
  
      try {
        const res = await fetch(url, requestOptions);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        if (json.isAuthorized) { // if user is authorized, then set the data in context API
          setUserID(json.UserData.ID); 
          setPlayerName(json.UserData.Name);
          
        }
      } catch (err) { // error
        setUserID(null);
        setPlayerName(null);
        console.log(err.message);

        // if user isn't in the login page but don't have authorization. then redirect back to login page
        if(location.pathname != "/login") {
          navigate("/login")
        }
      }
    };
  
    return {
      refetch: refetch,
    };
  };
  
