import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATdoOUKEc8BwUYie1l96SQTcw27jTiob4",
  authDomain: "blog-app-e41d3.firebaseapp.com",
  projectId: "blog-app-e41d3",
  storageBucket: "blog-app-e41d3.appspot.com",
  messagingSenderId: "862413798019",
  appId: "1:862413798019:web:195cee58dfdef275d2f9b6",
  measurementId: "G-4YYC7LFR7H"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);