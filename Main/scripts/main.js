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