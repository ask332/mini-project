import './App.css';
import {useState} from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var firebaseConfig = {
    apiKey: "AIzaSyDzGnYjcD6QCOKRLT_shOkDg_g-_HCU6V4",
  authDomain: "payapp-5208c.firebaseapp.com",
  databaseURL: "https://payapp-5208c-default-rtdb.firebaseio.com",
  projectId: "payapp-5208c",
  storageBucket: "payapp-5208c.appspot.com",
  messagingSenderId: "134691879308",
  appId: "1:134691879308:web:0b51f52534c5b8e2cdfea9",
  measurementId: "G-GPDC9LGEHN"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  
  const submit = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
  return(
    <div>
      <form onSubmit={(e)=>{submit(e)}} >
        <label htmlFor="#user">
          Username:- 
          <input type="email" id='user' onChange={(e)=>{setEmail(e.target.value)}} />
        </label>
        <br />
        <label htmlFor="#password">
          Password:- 
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default App;
