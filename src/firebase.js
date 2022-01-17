
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNUSAuWAl0x_qoZCaAa-hpasT2zPNZm7w",
  authDomain: "react-auth-1af86.firebaseapp.com",
  projectId: "react-auth-1af86",
  storageBucket: "react-auth-1af86.appspot.com",
  messagingSenderId: "1062702224329",
  appId: "1:1062702224329:web:451fff6c2a21d185f88e18"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;