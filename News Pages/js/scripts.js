/*!
* Start Bootstrap - Small Business v5.0.4 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


var currentUser;
// firebase.auth().onAuthStateChanged(user =>{
//     if (user){
//         currentUser = db.collection("users").doc(user.uid);
//         console.log(currentUser);
//     }
// })

console.log("Client script loaded.");

document.querySelector("#saved").addEventListener("click", myFunction1);
document.querySelector("#saved1").addEventListener("click", myFunction2);
document.querySelector("#saved2").addEventListener("click", myFunction3);
document.querySelector("#saved3").addEventListener("click", myFunction4);
document.querySelector("#saved4").addEventListener("click", myFunction5);


function myFunction1(){
    document.getElementById("action").innerHTML += "Saved!";
    console.log("button clicked!");
}

function myFunction2(){
    document.getElementById("action1").innerHTML += "Saved!";
    console.log("button clicked!");
}

function myFunction3(){
    document.getElementById("action2").innerHTML += "Saved!";
    console.log("button clicked!");
}

function myFunction4(){
    document.getElementById("action3").innerHTML += "Saved!";
    console.log("button clicked!");
}

function myFunction5(){
    document.getElementById("action4").innerHTML += "Saved!";
    console.log("button clicked!");
}

// time: 31.30 for saved bookmark colour
function saveBookmark(saveID){
    currentUser.set({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(saveID)
    }, {
        merge: true
    })
    .then(function(){
        console.log("bookmark has been saved for: " + currentUser);
        var iconID = 'save-' + saveID;
        document.getElementById(iconID).innerText = 'bookmark';
    });
}
