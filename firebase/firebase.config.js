import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWcc8BS_cXTvvYO_Tt5OpNPsnuamEMqto",
  authDomain: "geobiologie-loire.firebaseapp.com",
  projectId: "geobiologie-loire",
  storageBucket: "geobiologie-loire.appspot.com",
  messagingSenderId: "70868600746",
  appId: "1:70868600746:web:2e277f4e06f2e2e35f0dd3",
  measurementId: "G-HQLNCD5NSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
//const analytics = getAnalytics(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   //Copy API key INFO
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: "",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore();
// //const analytics = getAnalytics(app);
