    var clientKeyId = getUrlParameter('key');

	$(document).ready(function(){
        $('.filterable .btn-filter').click(function(){
            var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
            if ($filters.prop('disabled') == true) {
                $filters.prop('disabled', false);
                $filters.first().focus();
            } else {
                $filters.val('').prop('disabled', true);
                $tbody.find('.no-result').remove();
                $tbody.find('tr').show();
            }
        });

        $('.filterable .filters input').keyup(function(e){
            /* Ignore tab key */
            var code = e.keyCode || e.which;
            if (code == '9') return;
            /* Useful DOM data and selectors */
            var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
            /* Dirtiest filter function ever ;) */
            var $filteredRows = $rows.filter(function(){
                var value = $(this).find('td').eq(column).text().toLowerCase();
                return value.indexOf(inputContent) === -1;
            });
            /* Clean previous no-result if exist */
            $table.find('tbody .no-result').remove();
            /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
            $rows.show();
            $filteredRows.hide();
            /* Prepend no-result row if all rows are filtered */
            if ($filteredRows.length === $rows.length) {
                 $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="4" style="height: 100%;background: white; text-align:center; vertical-align:middle;"><h4><p class="text-muted">No data found</p></h4></td></tr>'));
            }
        });

        firebase.auth().onAuthStateChanged(function(user) {
			if (user != null) {

				var uid = user.uid;
		
				firebase.database().ref('users/'+uid).once('value').then(function(snapshot) {
					// console.log(snapshot.val());
                    tableData();
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
			document.getElementById('link_add_project').innerHTML = "<a href='add_project.html?key=" + clientKeyId + "'><button type='submit' class='btn btn-info' style='font-weight: bold;'><span class='fa fa-plus'></span> Add Project</button></a>"
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

	// function tableData(){

 //        var myTbody = "";

 //        firebase.database().ref('project/'+clientKeyId).orderByChild('project_name').on('value', function(snapshot){
            
 //            if(snapshot != null){
 //                snapshot.forEach(function(childSnapshot){

 //                	console.log(childSnapshot.key, childSnapshot.val());
 //                    var projectName = childSnapshot.val().project_name;
 //                    var projectAddress = childSnapshot.val().project_address;
 //                    var key = childSnapshot.key;

 //                    myTbody += "<tr><td><strong>" + projectName + "</strong></td>";
 //                    myTbody += "<td><strong>" + projectAddress + "</strong></td>";
 //                    myTbody += "<td>";

 //                    firebase.database().ref('project/'+clientKeyId+'/'+childSnapshot.key+'/contact').orderByChild('project_contact_name').on('value',function(contactSnapshot){
 //                        contactSnapshot.forEach(function(contactChildSnapshot){

 //                            // console.log(childSnapshot.val());
 //                            myTbody += "<div class='form-group'><div class='row' style=margin-bottom: 2px;><div class='col-md-6'><strong>" + contactChildSnapshot.val().project_contact_name + "</strong></div><div class='col-md-1'>-</div><div class='col-md-5'><strong>" + contactChildSnapshot.val().project_contact_no + "</strong></div></div></div>";
 //                        });
 //                    });

 //                    myTbody += "</td>";
 //                    myTbody += "<td><div class='row' style='margin-bottom: 2px;'> <div class='col-md-12'> <a href='add_project_contact.html'><button class='btn btn-sm btn-block' style='background-color: #1976d2; color: white;'><span class='fa fa-plus'></span> <strong>Add Contact</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='project_update_info.html'><button class='btn btn-sm btn-block' style='background-color: #ffa000; color: white;'><span class='fa fa-edit'></span> <strong>Update</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'> <a href='client_sites_list_po.php'> <button class='btn btn-sm btn-block' style='background-color: #388e3c; color: white;'><span class='fa fa-info-circle'></span> <strong>List of P.O.</strong></button> </a></div></div></td></tr>";

 //                    document.getElementById("projectList").innerHTML = myTbody;
 //                });
 //            }

 //            if(myTbody == ""){

 //                myTbody = "<tr><td colspan='4' style='height: 100%; background: white; text-align:center; vertical-align:middle;'><h4><p class='text-muted'>No data found</p></h4></td></tr>";

 //                document.getElementById("projectList").innerHTML = myTbody;
 //            }
 //        });
 //    }

    function tableData(){

        var myTbody = "";

        firebase.database().ref('project/'+clientKeyId).orderByChild('project_name').on('child_added', function(projectSnapshot){
            console.log(projectSnapshot.key, projectSnapshot.val());

            var project_name = projectSnapshot.val().project_name;
            var project_address = projectSnapshot.val().project_address;

            myTbody += "<tr><td><strong>" + project_name + "</strong></td>";
            myTbody += "<td><strong>" + project_address + "</strong></td>";
            myTbody += "<td>";

            firebase.database().ref('project/'+clientKeyId+'/'+projectSnapshot.key+'/contact').orderByChild('project_contact_name').once('value',function(contactSnapshot){
                contactSnapshot.forEach(function(contactChildSnapshot){

                    // console.log(childSnapshot.val());
                    myTbody += "<div class='form-group'><div class='row' style=margin-bottom: 2px;><div class='col-md-6'><strong>" + contactChildSnapshot.val().project_contact_name + "</strong></div><div class='col-md-1'>-</div><div class='col-md-5'><strong>" + contactChildSnapshot.val().project_contact_no + "</strong></div></div></div>";
                });
            });

            myTbody += "</td>";
            myTbody += "<td><div class='row' style='margin-bottom: 2px;'> <div class='col-md-12'> <a href='add_project_contact.html'><button class='btn btn-sm btn-block' style='background-color: #1976d2; color: white;'><span class='fa fa-plus'></span> <strong>Add Contact</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='project_update_info.html'><button class='btn btn-sm btn-block' style='background-color: #ffa000; color: white;'><span class='fa fa-edit'></span> <strong>Update</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'> <a href='client_sites_list_po.php'> <button class='btn btn-sm btn-block' style='background-color: #388e3c; color: white;'><span class='fa fa-info-circle'></span> <strong>List of P.O.</strong></button> </a></div></div></td></tr>";

            document.getElementById('projectList').innerHTML = myTbody;
        });
    }