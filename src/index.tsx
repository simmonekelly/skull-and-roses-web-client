import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIABzo-iYKM6aKRrllctCd3uR_1AQQsps",
  authDomain: "skull-and-roses.firebaseapp.com",
  databaseURL: "https://skull-and-roses-default-rtdb.firebaseio.com",
  projectId: "skull-and-roses",
  storageBucket: "skull-and-roses.firebasestorage.app",
  messagingSenderId: "88974096270",
  appId: "1:88974096270:web:32d4b10313f97d986f16df",
  measurementId: "G-HBSB97FDGJ",
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Get a reference to the Realtime Database service
// We call getDatabase() on the initialized app instance
const database = getDatabase(app);

// 4. Export the database reference so you can use it in other parts of your app
export { database };
