import logo from './logo.svg';
import './App.css';
import {db} from './firebase.js';
import {useEffect, useState} from 'react';
import Header from './Header.js';

function App() {

  const [user, setUser] = useState('Murilo');

  useEffect(()=>{
    console.log(db);
  },[])

  return (
    <div className="App">

      <Header>

      </Header>



    </div>
  );
}

export default App;
