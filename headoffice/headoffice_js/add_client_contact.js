	var clientKeyId = getUrlParameter('key');

	$(document).ready(function(){

		firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {

                var uid = user.uid;
        
                firebase.database().ref('users/'+uid).once('value').then(function(snapshot) {

                	tableData();
                    document.getElementById('username').innerHTML = snapshot.val().firstname; 
                },(error) => {
                    console.log(error);
                });
            } else {
                window.location.href = '../login.html';
            }
        });
		document.getElementById('logoutBtn').addEventListener('click', userSignOut, false);

        firebase.database().ref("client/"+clientKeyId).once("value").then(function(childSnapshot){

			document.getElementById('div_client_name').innerHTML = "<i class='fa fa-building'></i><a href='project.html?key=" + clientKeyId + "'</a>"+childSnapshot.val().client_name;
			document.getElementById('block_client_name').innerHTML = childSnapshot.val().client_name;
			document.getElementById('block_client_address').innerHTML = childSnapshot.val().client_address;
		});
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
		$("#item_table tr:last").after("<tr id='row"+$rowno+"' style='text-align: center;'><td class='col-md-4'><div class='form-group'><input type='text' name='contact_name[]' id='contact_name[]' class='form-control' autocomplete='off' style='text-transform: uppercase;' required></div></td><td class='col-md-4'><div class='form-group'><input type='text' name='contact_no[]' id='contact_no[]' class='form-control' autocomplete='off' required></div></td><td class='col-md-4'><div class='form-group'><input type='button' value='Remove' class='btn btn-danger btn-md' onclick=delete_row('row"+$rowno+"') style='font-weight: bold;'></div></td></tr>");
	}

	function delete_row(rowno){
		$('#'+rowno).remove();
	}

	function tableData(){

		var divBody = "";
		firebase.database().ref('client/'+clientKeyId+'/contact').on('value', function(contactSnapshot){

			contactSnapshot.forEach(function(contactChildsnapshot){
				
				divBody += "<div class='form-group'>";
                divBody += "<div class='row' style='margin-bottom: 2px;'>";
				divBody += "<div class='col-md-3 col-md-offset-1'>";
				divBody += "<strong>" + contactChildsnapshot.val().client_contact_name + "</strong>";
				divBody += "</div>";
				divBody += "<div class='col-md-1'> - </div>";
				divBody += "<div class='col-md-7'>";
				divBody += "<strong>" + contactChildsnapshot.val().client_contact_no + "</strong>";
				divBody += "</div>";
				divBody += "</div>";
				divBody += "</div>";

				document.getElementById("div_contact_list").innerHTML = divBody;
			})
		});
	}

	function insertContact(){

		event.preventDefault();

		var client_contact_name = $("input[name='contact_name[]']").map(function(){return $(this).val();}).get();
		var client_contact_no = $("input[name='contact_no[]']").map(function(){return $(this).val();}).get();

		var postContact = firebase.database().ref('client/'+clientKeyId+'/contact');
		var count = 0
		for(var i = 0; i < client_contact_name.length; i++){

			var postContactData = {
				client_contact_name: client_contact_name[i].toUpperCase(),
				client_contact_no: client_contact_no[i]
			}

			postContact.push(postContactData);
			count++;
		}

		if(count == client_contact_name.length){
			if(confirm("'Contact details successfully added. Add another contact?")){
				window.location.href='add_client_contact.html?key=' + clientKeyId;
			}else{
				event.preventDefault();
				window.location.href='client.html';
			}
		}else{
			alert("Failed");
		}
	}