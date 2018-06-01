var clientKeyId = getUrlParameter('key');

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

        firebase.database().ref("client/"+clientKeyId).once("value").then(function(childSnapshot){

			document.getElementById('div_client_name').innerHTML = "<i class='fa fa-building'></i><a href='project.html?key=" + clientKeyId + "'</a>"+childSnapshot.val().client_name;
			document.getElementById('block_client_name').innerHTML = childSnapshot.val().client_name;
			document.getElementById('block_client_address').innerHTML = childSnapshot.val().client_address;

		}).catch(function(error){
			window.location.href = 'client.html';
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

    function getUrlParameter(name) {
	    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	function add_row(){
		$rowno=$("#item_table tr").length;
		$rowno=$rowno+1;
		$("#item_table tr:last").after("<tr id='row"+$rowno+"' style='text-align: center;'><td class='col-md-4'><div class='form-group'><input type='text' name='contact_name[]' id='contact_name[]' class='form-control' style='text-transform: uppercase;' autocomplete='off' required></div></td><td class='col-md-4'><div class='form-group'><input type='text' name='contact_no[]' id='contact_name[]' class='form-control' autocomplete='off' required></div></td><td class='col-md-4'><div class='form-group'><input type='button' value='Remove' class='btn btn-danger btn-md' onclick=delete_row('row"+$rowno+"') style='font-weight: bold;'></div></td></tr>");
	}

	function delete_row(rowno){
		$('#'+rowno).remove();
	}

	function insertProject(){

		event.preventDefault();

		var project_name = document.getElementById('project_name').value;
		var project_address = document.getElementById('project_address').value;
		var project_contact_name = $("input[name='contact_name[]']").map(function(){return $(this).val();}).get();
		var project_contact_no = $("input[name='contact_no[]']").map(function(){return $(this).val();}).get();

		for(var i = 0; i < project_contact_name.length; i++){
			console.log("Client Contact Name: " + project_contact_name[i].toUpperCase());
			console.log("Client Contact No: " + project_contact_no[i]);
		}

		var projectData = {
			project_name: project_name.toUpperCase(),
			project_address: project_address.toUpperCase()
		}

		var postData = firebase.database().ref('project/'+clientKeyId);
		var newPostData = postData.push();
		newPostData.set(projectData);

		var postId = newPostData.key;
		var postContact = firebase.database().ref('project/'+clientKeyId+'/'+postId+'/contact');
		var count = 0;

		for(var i = 0; i < project_contact_name.length; i++){

			var postContactData = {
				project_contact_name: project_contact_name[i].toUpperCase(),
				project_contact_no: project_contact_no[i]
			}
			postContact.push(postContactData);
			count++;
		}

		if(count == project_contact_name.length){
			if(confirm('New project added successfully. Add another project?')){
				window.location.href='add_project.html?key=' + clientKeyId;
			}else{
				window.location.href='project.html?key=' + clientKeyId;
			}
		}else{
			alert("Something went wrong. Please try again.");
		}
	}