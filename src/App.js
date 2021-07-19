import "./App.css";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatRoom from "./pages/ChatRoom";
import Welcome from "./pages/Welcome";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});
const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <ToastContainer
        style={{ position: "fixed" }}
        position="top-left"
        autoClose={2500}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
      <div className="App">
        <div className="section">
          {user ? (
            <ChatRoom firebase={firebase} auth={auth} firestore={firestore} />
          ) : (
            <Welcome firebase={firebase} auth={auth} />
          )}
        </div>
      </div>
    </>
  );
}
