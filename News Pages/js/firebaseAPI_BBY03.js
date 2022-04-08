//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
function initializeApp() {
  firebase.initializeApp(firebaseConfig);
}
const firebaseConfig = {
  apiKey: "AIzaSyAukix7j36FB2dZbfCP2UvqOVPgz6Z-MPI",
  authDomain: "onlysportsfans-e0fef.firebaseapp.com",
  databaseURL: "https://onlysportsfans-e0fef-default-rtdb.firebaseio.com",
  projectId: "onlysportsfans-e0fef",
  storageBucket: "onlysportsfans-e0fef.appspot.com",
  messagingSenderId: "175994494569",
  appId: "1:175994494569:web:db40d82673ae7871df4cf8",
  measurementId: "G-5G8H57WFS4"
};
initializeApp();

const db = firebase.firestore();