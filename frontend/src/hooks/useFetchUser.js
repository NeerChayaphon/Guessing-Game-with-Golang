import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/userContext'
import { useLocation,useNavigate } from 'react-router-dom';

export const useFetchUser = () => {
    const {userID, playerName, setUserID, setPlayerName} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!userID && !playerName) {
        if (localStorage.getItem('token')) {
          fetchUser(setUserID, setPlayerName);
        } 
      } 
    }, [setUserID, setPlayerName]);
  
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
        if (json.isAuthorized) {
          setUserID(json.UserData.ID);
          setPlayerName(json.UserData.Name);
          
        }
      } catch (err) {
        setUserID(null);
        setPlayerName(null);
        console.log(err.message);

        if(location.pathname != "/login") {
          navigate("/login")
        }
      }
    };
  
    return {
      refetch: refetch,
    };
  };
  

const useNavigateLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if(location.pathname != "/login") {
    navigate("/login")
  }
}