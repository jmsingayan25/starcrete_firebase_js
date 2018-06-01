    var purchaseOrderKey = getUrlParameter('key');
	var plant = getUrlParameter('plant');

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

		firebase.database().ref('purchase_order/'+plant).once('value').then(function(poSnapshot){
			poSnapshot.forEach(function(poChildSnapshot){
				document.getElementById('li_plant').innerHTML = "<i class='fa fa-building'></i>"+plant;
				document.getElementById('li_po_list').innerHTML = "<i class='icon_document'></i><a href='purchase_order.html?plant=" + plant + "'>Pending P.O.</a>"
				document.getElementById('po_no_id').innerHTML = poChildSnapshot.val().po_no;
				document.getElementById('po_no_id1').innerHTML = poChildSnapshot.val().po_no;
				document.getElementById('po_no_id2').innerHTML = poChildSnapshot.val().po_no;
				document.getElementById('span_client_name').innerHTML = poChildSnapshot.val().po_no;
				document.getElementById('span_client_address').innerHTML = poChildSnapshot.val().po_no;
				document.getElementById('span_project_name').innerHTML = poChildSnapshot.val().project_name;
				document.getElementById('span_project_address').innerHTML = poChildSnapshot.val().project_address;
				document.getElementById('span_date').innerHTML = dateFormat(poChildSnapshot.val().date);
			});
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

	function dateFormat(date){

        var input_date = new Date(date);
        var dd = input_date.getDate();
        var mm = input_date.getMonth()+1;
        var yy = input_date.getFullYear();

        fulldate = mm+'/'+dd+'/'+yy;

        return fulldate;
    }

	function tableData(){

		var contactTbody = "";

        firebase.database().ref('purchase_order/'+plant+'/'+purchaseOrderKey+'/contact').once('value').then(function(contactSnapshot){
            contactSnapshot.forEach(function(contactChildSnapshot){

                contactTbody += "<tr><td><strong>" + contactChildSnapshot.val().contact_name + "</strong></td>";
                contactTbody += "<td><strong>" + contactChildSnapshot.val().contact_no + "</strong></td></tr>";

                document.getElementById('contacList').innerHTML = contactTbody;
            });
        }).catch(function(error){
            contactTbody = "<tr><td colspan='2' style='min-height: 100%; background: white; text-align:center; vertical-align: middle;'><h4><p class='text-muted'>No data found</p></h4></td></tr>";

            document.getElementById('contacList').innerHTML = contactTbody;
        });

        var itemTbody = "";
        count = 1;

        firebase.database().ref('purchase_order/'+plant+'/'+purchaseOrderKey+'/item').once('value').then(function(itemSnapshot){
            itemSnapshot.forEach(function(itemChildsnapshot){

                item_no = itemChildsnapshot.val().item_no;
                psi = itemChildsnapshot.val().psi || "";

                if(psi != ""){
                    var psi_ext = "(" + psi + " psi)";
                }else{
                    var psi_ext = "";
                }

                quantity = Number(itemChildsnapshot.val().quantity).toLocaleString('en');
                balance = Number(itemChildsnapshot.val().balance).toLocaleString('en');

                itemTbody += "<tr><td><strong>" + count + "</strong></td>";
                itemTbody += "<td><strong>" + item_no + " " + psi_ext + "</strong></td>";
                itemTbody += "<td><strong>" + quantity + " pcs / " + balance + " pcs</strong></td>";
                itemTbody += "<td><button type='button' class='btn btn-sm btn-block' style='margin-bottom: 5px; background-color: #ffa000; color: white;' data-toggle='modal' data-target='#purchaseOrderUpdateRow" + count + "'><span class='fa fa-edit'></span> <strong>Update</strong></button><div class='modal fade' id='purchaseOrderUpdateRow" + count + "' role='dialog'> <div class='modal-dialog modal-sm' style='max-width: 300px;'><div class='modal-content'><div class='modal-header'><div class='row' style='text-align: center;'><div class='col-md-12'><img src='../images/starcrete.png' width='150' height='50'></div></div></div><div class='modal-body' style='text-align: left;'><h4 class='modal-title' style='text-align: center'>Confirmation</h4><hr><div class='row'><div class='col-md-12'><div class='form-group'><label for='confirm_password'>Password</label><input type='password' name='confirm_password' class='form-control' required></div></div></div></div><div class='modal-footer'><button type='submit' name='update' id='update' class='btn btn-primary'><strong>Submit</strong></button><button type='button' class='btn btn-default' data-dismiss='modal'><strong>Close</strong></button></div></div></div></div></td></tr>";
                document.getElementById('itemList').innerHTML = itemTbody;
                count++;
            });
        });
	}