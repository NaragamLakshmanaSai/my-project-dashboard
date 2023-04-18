import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store';
// import firebase from "firebase/app"
// import 'firebase/auth'
// // import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBr0hgQgumLva-R5w4Wetkcm4NYtsdt8zA",
//   authDomain: "polar-protocol-357117.firebaseapp.com",
//   projectId: "polar-protocol-357117",
//   storageBucket: "polar-protocol-357117.appspot.com",
//   messagingSenderId: "99823031321",
//   appId: "1:99823031321:web:23b5d6daec7e2e61794688"
// };
// // const app = initializeApp(firebaseConfig);

// // import firebaseConnect from './firebaseAuth';

// // firebaseConnect()

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();