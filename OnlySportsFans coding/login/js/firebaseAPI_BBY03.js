// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAukix7j36FB2dZbfCP2UvqOVPgz6Z-MPI",
    authDomain: "onlysportsfans-e0fef.firebaseapp.com",
    projectId: "onlysportsfans-e0fef",
    storageBucket: "onlysportsfans-e0fef.appspot.com",
    messagingSenderId: "175994494569",
    appId: "1:175994494569:web:db40d82673ae7871df4cf8",
    measurementId: "G-5G8H57WFS4"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = firebase.firestore();