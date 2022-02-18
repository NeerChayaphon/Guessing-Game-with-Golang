
import './App.css';
import useFetch from './hooks/useFetch';


function App() {
  const requestOptions = {
    method: 'GET',
    headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjEiLCJOYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjQ1Mjg2ODQxfQ.u3tOB3za5DVyj7ZcqPy-JNGj_a-54YWdqxe614s07Ok'}
  }
  const {data} = useFetch('http://localhost:8080/showAnswer',requestOptions)
  if (data) {
    console.log(data)
  }
  return (
    <h1 className="text-3xl font-bold text-blue-600 underline">
      Hello world!
    </h1>
  );
}

export default App;
