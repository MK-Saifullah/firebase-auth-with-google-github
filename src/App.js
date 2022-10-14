import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from  'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState({})

  //Google Sign In
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error => {
      console.error('error', error);
    })
  }


  // Github authentication
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
        console.log(token)
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      setUser(user)
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error)
      console.log(errorCode, errorMessage, email, credential)
    })
  }

  // SIGN OUT
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
    .catch((error)=> {
      //An error occurred
      setUser({});
    })
  }

  const {displayName, photoURL, email} = user;
  return (
    <div className="App">
      {/* Conditional Rendering by ternary operator */}
       {
        user.uid ? 
        <button onClick={handleSignOut} type=""> Sign Out</button>
        :
        <div>
          <button onClick={handleGoogleSignIn} type=""> Google Sign In</button> <br></br>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>
        }

        {user.uid && <div>
          <p><img style={{width: '100px'}} src={photoURL} alt=""/></p>
          <p>User Name: {displayName}</p>
          <p>Email: {email}</p>
        </div>}

    </div>
  );
}

export default App;
