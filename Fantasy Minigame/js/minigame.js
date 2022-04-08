let predictionID = localStorage.getItem("predictionID");

db.collection("users").where("id", "==", "buxbxEatHGdQ2nu8CEVkxgQQc0R2")
    .get()
    .then(queryPrediction => {
        //see how many results you have got from the query
        size = queryPrediction.size;
        // get the documents of query
        users = queryPrediction.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        console.log(users);
        for (i = 0; i < size; i++) {
            if (size = 1) {
                var thisPrediction = users[i].data();
                predictionName = thisPrediction.name;
                console.log(predictionName);
                document.getElementById("sell_buy").innerHTML = predictionName;
            } else {
                console.log("Query has more than one data")
            }
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

// JS function to insert the name of the logged in user on the "Welcome back" message.
// Use this for other pages.
function insertName() {
    //To check if the user is logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); //let me know who is the user that logged in to get the UID
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

/*!
 * Start Bootstrap - Grayscale v7.0.4 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
//
// Scripts
// 

// Predictions legend: 1 = yes, 0 = no

var sold = function (athlete_ID) {
    alert('You have selected "No"');
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                if(userDoc.data().predictions) {
                    var predictionArr = userDoc.data().predictions;
                if(predictionArr.find(p => p.athleteID == athlete_ID)) {
                    predictionArr.find(p => p.athleteID == athlete_ID).prediction = 0;
                } else {
                    const newPrediction = {
                        athleteID: athlete_ID,
                        prediction: 0
                    };
                    predictionArr.push(newPrediction);
                }
                currentUser.update({
                    predictions: predictionArr
                    }, {
                        merge: true
                    })
                    .then(function () {
                        console.log("Prediction has been saved for: " + currentUser.name);
                    });
                } else {
                    console.log("No predictions found.");
                    const Arr = [];
                    const newPrediction = {
                        athleteID: athlete_ID,
                        prediction: 0
                    };
                    Arr.push(newPrediction);
                    currentUser.set({
                        email: userDoc.data().email,
                        name: userDoc.data().name,
                        predictions: Arr
                        }, {
                            merge: true
                        })
                        .then(function () {
                            console.log("Prediction has been saved for: " + currentUser.name);
                        });
                }
            })
        }
    })
}

var bought = function (athlete_ID) {
    alert('You have selected "Yes"');
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                if(userDoc.data().predictions) {
                    var predictionArr = userDoc.data().predictions;
                if(predictionArr.find(p => p.athleteID == athlete_ID)) {
                    predictionArr.find(p => p.athleteID == athlete_ID).prediction = 1;
                } else {
                    const newPrediction = {
                        athleteID: athlete_ID,
                        prediction: 1
                    };
                    predictionArr.push(newPrediction);
                }
                currentUser.update({
                    predictions: predictionArr
                    }, {
                        merge: true
                    })
                    .then(function () {
                        console.log("Prediction has been saved for: " + currentUser.name);
                    });
                } else {
                    console.log("No predictions found.");
                    const Arr = [];
                    const newPrediction = {
                        athleteID: athlete_ID,
                        prediction: 1
                    };
                    Arr.push(newPrediction);
                    currentUser.set({
                        email: userDoc.data().email,
                        name: userDoc.data().name,
                        predictions: Arr
                        }, {
                            merge: true
                        })
                        .then(function () {
                            console.log("Prediction has been saved for: " + currentUser.name);
                        });
                }
            })
        }
    })
}

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
