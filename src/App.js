import './App.css';
import {useState} from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

function App() {
  const Moralis = require('moralis');
  const serverUrl = 'https://mnz3ceef8fuw.usemoralis.com:2053/server';
  const appId= 'H5ZMxViMSncav4x9MprMJd3Bg3ZJfiyGo84OuO4h';
  Moralis.start({serverUrl,appId});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_id, setUser] = useState('');
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [addr,setAddr] = useState('');

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
    writeUserData(user_id,fName,lName,email,addr);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  function writeUserData(user_id, fName, lName, email, addr) {
    const db = getDatabase();
    set(ref(db, 'users/' + user_id), {
      first_name: fName,
      last_name: lName,
      email: email,
      address : addr
    });
  }
  async function login() {

    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Welcome",
      })
        .then(function (user) {
          setAddr(user.get('ethAddress'))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return(
    <div className='App'>
      <div>
      <form onSubmit={(e)=>{submit(e)}} >
        <label htmlFor="#user">
          Username
          <br />
          <input type="text" id='user' onChange={(e)=>{setUser(e.target.value)}} />
        </label>
        <br />

        <label htmlFor="#f_name">
          First Name
          <br />
          <input type="text" id='f_name' onChange={(e)=>{setFname(e.target.value)}} />
        </label>
        <br />

        <label htmlFor="#l_name">
          Last Name
          <br />
          <input type="text" id='l_name' onChange={(e)=>{setLname(e.target.value)}} />
        </label>
        <br />

        <label htmlFor="#user_id">
          Email
          <br />
          <input type="email" id='user_id' onChange={(e)=>{setEmail(e.target.value)}} />
        </label>
        <br />

        <label htmlFor="#password">
          Password
          <br />
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <br />
        <button onClick={login}>Get Metamask wallet</button>
        <input type="submit" value="submit" />
      </form>
      </div>
    </div>
  )
}

export default App;
