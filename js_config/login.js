
	  // Initialize Firebase
		var config = {
			apiKey: "AIzaSyCo9ZmFHKVof67xkCFblIlEE0U9FqPbWrg",
			authDomain: "starcrete-ff12d.firebaseapp.com",
			databaseURL: "https://starcrete-ff12d.firebaseio.com",
			projectId: "starcrete-ff12d",
			storageBucket: "starcrete-ff12d.appspot.com",
			messagingSenderId: "4339267998"
		};
		firebase.initializeApp(config);

		var submitLogin = function(){

			var email = $('loginEmail').val();
			var password = $('loginPassword').val();

			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode === 'auth/wrong-password') {
			    alert('Wrong password.');
			  } else {
			    alert(errorMessage);
			  }
			  console.log(error);
			});
		}

		$(window).load(function () {

			// Find the HTML element with the id recommendationForm, and when the submit
			// event is triggered on that element, call submitRecommendation.
			$("#loginForm").submit(submitLogin);

		});
	
