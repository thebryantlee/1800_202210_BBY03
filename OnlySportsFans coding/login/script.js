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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function register() {
  email = document.getElementById('logemail').value
  password = document.getElementById('logpass').value
  full_name = document.getElementById('logname').value

  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser

      var database_ref = database.ref()

      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      }

      database_ref.child('users/' + user.uid).set(user_data)

      alert('User Created')
    })
    .catch(function (error) {
      var error_code = error_code
      var error_message = error.message
    })
}

function login() {
  email = document.getElementById('logemail').value
  password = document.getElementById('logpass').value
  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser

      var database_ref = database.ref()

      var user_data = {
        last_login: Date.now()
      }

      database_ref.child('users/' + user.uid).update(user_data)

    })
    .catch(function (error) {
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}