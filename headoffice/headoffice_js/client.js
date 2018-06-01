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
                 $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="3" style="height: 100%;background: white; text-align:center; vertical-align:middle;"><h4><p class="text-muted">No data found</p></h4></td></tr>'));
            }
        });

        firebase.auth().onAuthStateChanged(function(user) {
			if (user != null) {

				var uid = user.uid;
		
				firebase.database().ref('users/'+uid).once('value').then(function(snapshot) {

                    tableData();
					document.getElementById('username').innerHTML = snapshot.val().firstname; 
				},(error) => {
					console.error(error);
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

    // function tableData(){

    //     var myTbody = "";
    //     firebase.database().ref('client').orderByChild('client_name').on('value', function(snapshot){
    //         snapshot.forEach(function(childSnapshot){

    //             var clientName = childSnapshot.val().client_name;
    //             var clientAddress = childSnapshot.val().client_address;
    //             var key = childSnapshot.key;

    //             myTbody += "<tr><td><strong>" + clientName + "</strong></td>";
    //             myTbody += "<td><strong>" + clientAddress + "</strong></td>";
    //             myTbody += "<td>";
    //             firebase.database().ref('client/'+childSnapshot.key+'/contact').orderByChild('client_contact_name').on('value',function(contactSnapshot){
    //                 contactSnapshot.forEach(function(contactChildSnapshot){
    //                     console.log(contactChildSnapshot.val());
    //                     myTbody += "<div class='form-group'><div class='row' style=margin-bottom: 2px;><div class='col-md-6'><strong>" + contactChildSnapshot.val().client_contact_name + "</strong></div><div class='col-md-1'>-</div><div class='col-md-5'><strong>" + contactChildSnapshot.val().client_contact_no + "</strong></div></div></div>";
    //                 });
    //             });

    //             myTbody += "</td>";
    //             myTbody += "<td><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='add_client_contact.html?key=" + key + "'><button class='btn btn-sm btn-block' style='background-color: #1976d2; color: white;'><span class='fa fa-plus'></span> <strong>Add Contact</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='update_client_info.html?key=" + key + "'><button class='btn btn-sm btn-block' style='background-color: #ffa000; color: white;'><span class='fa fa-edit'></span> <strong>Update</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='project.html?key=" + key + "' class='btn btn-sm btn-block' style='background-color: #388e3c; color: white;'><span class='fa fa-info-circle'></span> <strong>Projects</strong></a></div></div></td></tr>";

    //             // console.log(JSON.stringify(childSnapshot));
    //             document.getElementById("clientList").innerHTML = myTbody;
    //         });

    //         if(myTbody == ""){

    //             myTbody = "<tr><td colspan='4' style='height: 100%; background: white; text-align:center; vertical-align:middle;'><h4><p class='text-muted'>No data found</p></h4></td></tr>";

    //             document.getElementById("clientList").innerHTML = myTbody;
    //         }
    //     });
    // }

    function tableData(){

        var myTbody = "";
        firebase.database().ref('client').orderByChild('client_name').on('child_added', function(clientSnapshot){
            // console.log(clientSnapshot.key, clientSnapshot.val());

            var client_name = clientSnapshot.val().client_name;
            var client_address = clientSnapshot.val().client_address;
            var clientKey = clientSnapshot.key;

            myTbody += "<tr><td><strong>" + client_name + "</strong></td>";
            myTbody += "<td><strong>" + client_address + "</strong></td>";
            myTbody += "<td>";

            firebase.database().ref('client/'+clientKey+'/contact').orderByChild('client_contact_name').once('value',function(contactSnapshot){
                contactSnapshot.forEach(function(contactChildSnapshot){
                        // console.log(contactChildSnapshot.val());

                    myTbody += "<div class='form-group'><div class='row' style=margin-bottom: 2px;><div class='col-md-6'><strong>" + contactChildSnapshot.val().client_contact_name + "</strong></div><div class='col-md-1'>-</div><div class='col-md-5'><strong>" + contactChildSnapshot.val().client_contact_no + "</strong></div></div></div>";
                });
            });

            myTbody += "</td>";
            myTbody += "<td><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='add_client_contact.html?key=" + clientKey + "'><button class='btn btn-sm btn-block' style='background-color: #1976d2; color: white;'><span class='fa fa-plus'></span> <strong>Add Contact</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='update_client_info.html?key=" + clientKey + "'><button class='btn btn-sm btn-block' style='background-color: #ffa000; color: white;'><span class='fa fa-edit'></span> <strong>Update</strong></button></a></div></div><div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><a href='project.html?key=" + clientKey + "' class='btn btn-sm btn-block' style='background-color: #388e3c; color: white;'><span class='fa fa-info-circle'></span> <strong>Projects</strong></a></div></div></td></tr>";

            document.getElementById("clientList").innerHTML = myTbody;
        });
    }