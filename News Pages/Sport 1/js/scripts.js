/*!
 * Start Bootstrap - Small Business v5.0.4 (https://startbootstrap.com/template/small-business)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project


// var currentUser;
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         currentUser = db.collection("users").doc(user.uid); //global
//         console.log(currentUser);

//         // the following functions are always called when someone is logged in
//         // insertName();
//         // populateCardsDynamically();
//     } else {
//         // No user is signed in.
//         console.log("No user is signed in");
//         window.location.href = "login.html";
//     }
// });

// lecture march 1st = time at 1:42:25
// function writeNewsData() {
//     max = 7;
//     //define a variable for the collection you want to create in firestore to populate the data
//     var newsRef = db.collection("News");
//     for (i = 1; i < max; i++) {
//         // this line below adds to database, autogenerates an ID
//         newsRef.add({
//             code: "id" + i,
//             name: "news" + i,
//             details: "Insert news data here" + i
//         })
//         newsRef.add({
//             code: "id" + i,
//             name: "news2" + i,
//             details: "Insert news data here" + i

//         })
//         newsRef.add({
//             code: "id" + i,
//             name: "news3" + i,
//             details: "Insert news data here" + i
//         })

//     }

function writeNewsData() {
    //define a variable for the collection you want to create in firestore to populate the data
    var newsRef = db.collection("News");

    newsRef.add({
        id: "NW1",
        name: "Curling 1",
        details: "Insert article info here"
    })
    newsRef.add({
        id: "NW2",
        name: "Curling 2",
        details: "Insert article info here"
    })
    newsRef.add({
        id: "NW3",
        name: "Curling 3",
        details: "Insert article info here"
    })
    newsRef.add({
        id: "NW4",
        name: "Curling 4",
        details: "Insert article info here"
    })

}


function populateCardsDynamically() {
    let newsCardTemplate = document.getElementById("cardBody");
    let newsCardGroup = document.getElementById("cardText");

    db.collection("News").get()
        .then(allNews => {
            allNews.forEach(doc => {
                var newsName = doc.data().name; //gets the name field
                var newsID = doc.data().id; //gets the unique ID field
                let testNewsCard = newsCardTemplate.content.cloneNode(true);
                testNewsCard.querySelector('.card-title').innerHTML = newsName;

                //testHikeCard.querySelector('.card-length').innerHTML = hikeLength;
                //NEW LINE: update to display details
                testNewsCard.querySelector('.card-text').innerHTML =
                    "Details: " + doc.data().details;

                testNewsCard.querySelector('a').onclick = () => setNewsData(newsID);

                // week 10 vid : time - 1:33:31 for image
                // testNewsCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + newsName + "&id=" + newsID;

                newsCardGroup.appendChild(testNewsCard);
            })

        })
}
populateCardsDynamically();

function setNewsData(id){
    localStorage.setItem('newsID', id);
}



// function displayCards(collection) {
//     let cardTemplate = document.getElementById("cardTemplate");
//     db.collection(collection).get()
//         .then(snap => {
//             var i = 1;
//             snap.forEach(doc => {
//                 var title = doc.data().name; // get the value of the "name" key
//                 var details = doc.data().details; // get the value of the "details" key
//                 let newCard = cardTemplate.contentEditable.cloneNode(true);

//                 //update title and text
//                 newCard.querySelector('.card-title').innerHTML = title;
//                 newCard.querySelector('.card-text').innerHTML = details;

//                 //attach to gallery
//                 document.getElementById(collection + "-go-here").appendChild(newCard);
//                 i++;
//             })
//         })
// }
// displayCards();

