import {useState, createContext} from 'react';

export const UserContext = createContext();

// Context API that use to store user data
function UserContextProvider(props) {
  const [userID, setUserID] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  const value = {userID, playerName, setUserID, setPlayerName};
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;

