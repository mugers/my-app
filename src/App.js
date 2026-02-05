
import './App.css';
import {db, auth} from './firebase.js';
import {useEffect, useState} from 'react';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Header from './Header.js';
import Post  from './Post.js'

function App() {

  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

useEffect(() => {
  // Monitora o estado de autenticação com segurança
  const unsubscribeAuth = auth.onAuthStateChanged((val) => {
    if (val) {
      setUser(val.displayName);
    } else {
      setUser(null);
    }
  });

  // Monitora os posts no Firestore
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const unsubscribePosts = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      info: doc.data()
    })));
  });

  // Limpa os dois listeners quando o componente desmontar
  return () => {
    unsubscribeAuth();
    unsubscribePosts();
  };
}, []);
  



  return (
    <div className="App">

      <Header setUser={setUser} user={user}></Header>

      {
  posts.map(function(val) {
    return (
      <Post 
        key={val.id} 
        info={val.info} 
        id={val.id} 
        user={user} // ESTA LINHA É ESSENCIAL
      />
    )
  })
}

    </div>
  );
}

export default App;
