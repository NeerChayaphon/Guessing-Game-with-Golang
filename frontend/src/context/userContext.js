import {useState, createContext} from 'react';

export const UserContext = createContext();

function UserContextProvider(props) {
  const [userID, setUserID] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  const value = {userID, playerName, setUserID, setPlayerName};
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;

// /* React conntext API */
// import {createContext, useContext, useState, useEffect} from 'react';

// export const UserContext = createContext();

// // Give user information
// const UserContextProvider = (props) => {
//   const [state, setState] = useState({
//     isLoading: true,
//     data: null,
//     error: null,
//     isUpdating: false,
//   });
//   return (
//     <UserContext.Provider
//       value={{
//         state,
//         setState,
//       }}
//     >
//       {props.children}
//     </UserContext.Provider>
//   );
// };


// export default UserContextProvider;
