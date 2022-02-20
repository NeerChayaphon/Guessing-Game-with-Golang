
import './App.css';

import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Page/Home';
import Login from './Page/Login';
import ErrorPage from './Page/ErrorPage';
import UserContextProvider from './context/userContext';
import Navbar from './components/Navbar';
import WinModal from './components/WinModal';

function App() {
  return (
    <UserContextProvider> 
     <Router>
     <Navbar/>
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<ErrorPage />}/>
          <Route path='/modal' element={<WinModal />}/>
       </Routes>
     </Router>
     </UserContextProvider>
  );
}

export default App;


  // const requestOptions = {
  //   method: 'GET',
  //   headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjEiLCJOYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjQ1Mjg2ODQxfQ.u3tOB3za5DVyj7ZcqPy-JNGj_a-54YWdqxe614s07Ok'}
  // }
  // const {data} = useFetch('http://localhost:8080/showAnswer',requestOptions)
  // if (data) {
  //   console.log(data)
  // }