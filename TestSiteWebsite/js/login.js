function toggleSignIn() {
    //If the current user object does not exist
    if (!firebase.auth().currentUser) {
      //Set the auth provider to yahoo
      var provider = new firebase.auth.GoogleAuthProvider();
      //And sign in with a popup
      firebase.auth().signInWithPopup(provider)
        .then(function (result) { //On Success save the token to session storage and output it to console
          var token = result.credential.accessToken;
          window.sessionStorage.setItem("token",token);
          console.log(result);
          document.getElementById('login').innerHTML = "Log out";
          let name = document.createElement("h5");
          name.id = "name";
          name.style.color = "white";
          name.innerHTML = firebase.auth().currentUser.displayName;
          document.getElementById("mainNav").appendChild(name);
          //console.log(firebase.auth().currentUser.displayName);
        })
        .catch(function (error) { //On failure alert user or report error to console
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        });
    } else {
      firebase.auth().signOut();
      document.getElementById('login').innerHTML = "Log in";
      var element = document.getElementById("name");
      element.parentNode.removeChild(element);  
    }
  
  }


document.getElementById('login').addEventListener('click', toggleSignIn, false);


