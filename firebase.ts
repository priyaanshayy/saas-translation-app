 import { getApp, getApps, initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 import { getFunctions } from "firebase/functions";

 const firebaseConfig = {
    apiKey: "AIzaSyC0ehSwq2B6Nyeq-JpqNYdfAkNDIIxFJzw",
    authDomain: "saas-translator-app-yputube.firebaseapp.com",
    projectId: "saas-translator-app-yputube",
    storageBucket: "saas-translator-app-yputube.appspot.com",
    messagingSenderId: "106852309095",
    appId: "1:106852309095:web:4551a872d79456f8755cc2"
  };

  const app= getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app);

  export {db, auth, functions};