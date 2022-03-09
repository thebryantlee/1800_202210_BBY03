var user = authResult.user; // get the user object from the Firebase authentication database
if (authResult.additionalUserInfo.isNewUser) { //if new user
    db.collection("users").doc(user.uid).set({ //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName, //"users" collection
            email: user.email //with authenticated user's ID (user.uid)
        }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("main.html"); //re-direct to main.html after signup
        })
        .catch(function (error) {
            console.log("Error adding new user: " + error);
        });
}

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    //method #2:  insert using jquery
                    $("#name-goes-here").text(user_Name); //using jquery
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();