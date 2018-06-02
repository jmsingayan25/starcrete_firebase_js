	$(document).ready(function(){

		firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {

                var uid = user.uid;
        
                firebase.database().ref('users/'+uid).once('value').then(function(snapshot) {
                    document.getElementById('username').innerHTML = snapshot.val().firstname; 
                },(error) => {
                    console.log(error);
                });
            } else {
                window.location.href = '../login.html';
            }
        });
		document.getElementById('logoutBtn').addEventListener('click', userSignOut, false);

	});

	function userSignOut(){

        firebase.auth().signOut().then(function() {
            window.location.href = '../login.html';
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    }

	function add_row(){
		$rowno=$("#item_table tr").length;
		$rowno=$rowno+1;
		$("#item_table tr:last").after("<tr id='row"+$rowno+"' style='text-align: center;'><td class='col-md-4'><div class='form-group'><input type='text' name='contact_name[]' class='form-control' style='text-transform: uppercase;' autocomplete='off' required></div></td><td class='col-md-4'><div class='form-group'><input type='text' name='contact_no[]' class='form-control' autocomplete='off' required></div></td><td class='col-md-4'><div class='form-group'><input type='button' value='Remove' class='btn btn-danger btn-md' onclick=delete_row('row"+$rowno+"') style='font-weight: bold;'></div></td></tr>");
	}

	function delete_row(rowno){
		$('#'+rowno).remove();
	}

	function insertClient(){

		event.preventDefault();

		var client_contact_name = $("input[name='contact_name[]']").map(function(){return $(this).val();}).get();
		var client_contact_no = $("input[name='contact_no[]']").map(function(){return $(this).val();}).get();
		var client_name = document.getElementById('client_name').value;
		var client_address = document.getElementById('client_address').value;

		console.log("Client Name: " + client_name.toUpperCase());
		console.log("Client Address: " + client_address.toUpperCase());

		for(var i = 0; i < client_contact_name.length; i++){
			console.log("Client Contact Name: " + client_contact_name[i].toUpperCase());
			console.log("Client Contact No: " + client_contact_no[i]);
		}

		var clientData = {
			client_name: client_name.toUpperCase(),
			client_address: client_address.toUpperCase()
		};

		var postData = firebase.database().ref().child("client");
		var newPostRef = postData.push();
		newPostRef.set(clientData);

		var postId = newPostRef.key;
		var postContact = firebase.database().ref("client/"+postId+"/contact");
		var count = 0;
		for(var i = 0; i < client_contact_name.length; i++){

			var postContactData = {
				client_contact_name: client_contact_name[i].toUpperCase(),
				client_contact_no: client_contact_no[i]
			}
			postContact.push(postContactData);
			count++;
		}
		
		if(count == client_contact_name.length){
			if(confirm("'New client added successfully. Proceed to Add Project?") == true){
				window.location.href='add_project.html?key=' + postId;
			}else{
				event.preventDefault();
        		window.location.href = 'add_client.html';
			}
		}else{
			alert("Failed");
		}
	}