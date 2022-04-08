var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});

//--------------------------------------------------------------------------
// This is a function that we call only ONE time, to populate the database.
// It can be invoked one-time by typing "writeHikes();" at the inspector console.
// "Hikes" collection with a few hard-coded documents.
// Instead of hard-coding it, you can also read from csv, or json file.
//--------------------------------------------------------------------------
function writeSports() {
    //define a variable for the collection you want to create in Firestore to populate data
    var SportsRef = db.collection("Sports");

    SportsRef.add({
        id: "Curling",
        name: "Curling", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
    });
    SportsRef.add({
        id: "Hockey",
        name: "Hockey", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    SportsRef.add({
        id: "IceSkating",
        name: "Ice Skating", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2022"))
    });
    SportsRef.add({
        id: "SnowBoarding",
        name: "SnowBoarding", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
    });
    SportsRef.add({
        id: "FigureSkating",
        name: "Figure Skating", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
    });
}

//---------------------------------------------------------------------
// This is a function that is called when everytime the page loads
// to read from the Hikes collection, go through each card,
// and dynamically creates a bootstrap card to display each hike.
// You can change the card style by using a different template. 
//---------------------------------------------------------------------
function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("Sports")
        .orderBy("length_time") //NEW LINE;  what do you want to sort by?
        .limit(5) //NEW LINE:  how many do you want to get?
        .get()
        .then(allHikes => {
            allHikes.forEach(doc => {
                var hikeName = doc.data().name; //gets the name field
                var hikeID = doc.data().id; //gets the unique ID field
                var hikeLength = doc.data().length; //gets the length field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;

                //NEW LINE: update to display length, duration, last updated
                testHikeCard.querySelector('.card-length').innerHTML =
                    "Last updated: " + doc.data().last_updated.toDate();

                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);



                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
                //ps. this works because we have only one icon.
                //if you have other icons, you will need a unique selector
                testHikeCard.querySelector('i').id = 'save-' + hikeID;
                // this line will call a function to save the hikes to the user's document             
                testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);

                testHikeCard.querySelector('.read-more').href = "eachSport.html?hikeName=" + hikeName + "&id=" + hikeID;

                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                hikeCardGroup.appendChild(testHikeCard);
            })
        })
}

function saveBookmark(hikeID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + hikeID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

//--------------------------------------------------------------
// This function saves the current hikeID into the localStorage
//--------------------------------------------------------------
function setHikeData(id) {
    localStorage.setItem('hikeID', id);
}