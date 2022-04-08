// JS function to insert the name of the logged in user on the "Welcome back" message.
// Use this for other pages.
function insertName() {
    //To check if the user is logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); //let me knwo who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); //will go to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user Name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-goes-here").innerHTML = user_Name;
            })
        }
    })
}
insertName();

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
                    var userSchool = userDoc.data().email;
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

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userSchool = document.getElementById('schoolInput').value;
    userCity = document.getElementById('cityInput').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            currentUser.update({
                    name: userName,
                    school: userSchool,
                    city: userCity
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;
                })
        }
    })
}

let predictionID = localStorage.getItem("predictionID");

db.collection("users").where("id", "==", predictionID)
    .get()
    .then(queryPrediction => {
        //see how many results you have got from the query
        size = queryPrediction.size;
        // get the documents of query
        Hikes = queryPrediction.docs;

        if (size = 1) {
            var thisPrediction = users[0].data();
            predictionName = thisPrediction.name;
            console.log(hikeName);
            document.getElementById("predictionName").innerHTML = predictionName;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the Prediction buttons.
// It adds the prediction to the "prediction" array
//-----------------------------------------------------------------------------
function savePrediction(predictionID) {
    currentUser.set({
            predictions: firebase.firestore.FieldValue.arrayUnion(predictionID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Prediction has been saved for: " + currentUser);
        });
}