import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr_mNChbbcd9UhIMPhsTCjVS9vT2GdJjo",
  authDomain: "ecommerce-7d70f.firebaseapp.com",
  projectId: "ecommerce-7d70f",
  storageBucket: "ecommerce-7d70f.appspot.com",
  messagingSenderId: "562624650442",
  appId: "1:562624650442:web:2de4502ff56584c7686833",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
