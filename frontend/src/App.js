
import './App.css';
import useFetch from './hooks/useFetch';

import {BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Home from './Page/Home';
import Login from './Page/Login';
import ErrorPage from './Page/ErrorPage';

function App() {
  // const requestOptions = {
  //   method: 'GET',
  //   headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjEiLCJOYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjQ1Mjg2ODQxfQ.u3tOB3za5DVyj7ZcqPy-JNGj_a-54YWdqxe614s07Ok'}
  // }
  // const {data} = useFetch('http://localhost:8080/showAnswer',requestOptions)
  // if (data) {
  //   console.log(data)
  // }
  return (
     <Router>
       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<ErrorPage />}/>
       </Routes>
     </Router>
  );
}

export default App;
