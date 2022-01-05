import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword as signInWithEmailAndPasswordAuth, signOut, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb2uTTRbhDu9qSm7EvFo5R6SMYqXlsKt8",
  authDomain: "multi-currency-2517b.firebaseapp.com",
  projectId: "multi-currency-2517b",
  storageBucket: "multi-currency-2517b.appspot.com",
  messagingSenderId: "361301735062",
  appId: "1:361301735062:web:5cc9de81cfe546bc7734b7",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//****************************************************************************/
//**                  Login Functions                                       **/
//****************************************************************************/
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("credential", credential);
    // const token = credential.accessToken;
    // The signed-in user info.
    // const user = result.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//TODO: handle errors
const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
    // The signed-in user info.
    // const user = result.user;

    // localStorage.setItem('token', accessToken);
    // localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    // await auth.signInWithEmailAndPassword(email, password);

    const userCredential = await signInWithEmailAndPasswordAuth(auth, email, password);
    const user = userCredential.user;
    console.log("signInWithEmailAndPassword", user);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("registerWithEmailAndPassword", user);
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    // alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

const logout = async () => {
  await signOut(auth);
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
  // return res;
};

export { auth, db, signInWithGoogle, signInWithFacebook, signInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordResetEmail, logout };
