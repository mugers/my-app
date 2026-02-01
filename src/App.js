
import './App.css';
import {db} from './firebase.js';
import {useEffect, useState} from 'react';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Header from './Header.js';

function App() {

  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            info: doc.data()  
        })));
    });

    return () => unsubscribe(); 
}, []);


  return (
    <div className="App">

      <Header setUser={setUser} user={user}></Header>

      {
        posts.map(function(val) {
        return (
      <p>{val.info?.titulo}</p> 
    )
  })
      }

    </div>
  );
}

export default App;
