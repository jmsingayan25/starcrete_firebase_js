    var plant = getUrlParameter('plant');
    var timer = null;

    function goAway() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            window.location.reload(true);
        }, 60000);
    }

    window.addEventListener('mousemove', goAway, true);
    window.addEventListener('keypress', goAway, true);

    goAway();

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

		document.getElementById('page_header').innerHTML = "<a href='purchase_order.html?plant="+plant+"' style='color: inherit;'>"+ plant +" Pending Purchase Order</a>";
		document.getElementById('link_closed_po').innerHTML = "<i class='icon_document'></i><a href='purchase_closed_order.html?office="+plant+"'>Closed P.O.</a>";
		document.getElementById('link_plant_name').innerHTML = "<i class='fa fa-building'></i>"+plant;
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

    //     var myTbody = "";
    //     var count = 1;
        
    //     firebase.database().ref('purchase_order/'+plant).orderByChild('reverseDate').on('child_added', function(orderSnapshot){
    //         // console.log(orderSnapshot.key, orderSnapshot.val());    
    //         firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/item').on('child_added', function(itemSnapshot){
    //                 firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/project_detail').on('child_added', function(projectSnapshot){
    //                 myTbody += "<tr><td><strong>" + count + "</strong></td>";
    //                 myTbody += "<td><strong>" + orderSnapshot.val().po_no + "</strong></td>";
    //                 myTbody += "<td><strong>" + itemSnapshot.val().item_no + "</strong></td>";
    //                 myTbody += "<td><strong>" + Number(itemSnapshot.val().quantity).toLocaleString('en') + " pcs / " + Number(itemSnapshot.val().balance).toLocaleString('en') +" pcs</strong></td>";
    //                 myTbody += "<td><strong>" + projectSnapshot.val().project_name + "</strong></td>";
    //                 myTbody += "<td><strong>" + projectSnapshot.val().project_address + "</strong></td>";
    //                 myTbody += "<td>";

    //                 firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/contact').on('child_added', function(contactSnapshot){

    //                     myTbody += "<div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><strong>" + contactSnapshot.val().contact_name + "<br> (" + contactSnapshot.val().contact_no + ") <br><br></strong></div></div>";
    //                 });

    //                 myTbody += "</td>";
    //                 myTbody += "<td><strong>" + dateFormat(orderSnapshot.val().date) + "</strong></td></tr>";

    //                 document.getElementById('orderList').innerHTML = myTbody;
    //                 count++;   
    //             });                    
    //         });         
    //     });
    // }

    // function tableData(){

    //     var myTbody = "";
    //     var count = 1;
        
    //     firebase.database().ref('purchase_order/'+plant).orderByChild('reverseDate').on('child_added', function(orderSnapshot){
    //         // console.log(orderSnapshot.key, orderSnapshot.val());    
    //         firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/item').on('child_added', function(itemSnapshot){
    //             firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/project_detail').on('child_added', function(projectSnapshot){

    //                 $("<tr><td><strong>" + count + "</strong></td><td><strong>" + orderSnapshot.val().po_no + "</strong></td><td><strong>" + itemSnapshot.val().item_no + "</strong></td><td><strong>" + Number(itemSnapshot.val().quantity).toLocaleString('en') + " pcs / " + Number(itemSnapshot.val().balance).toLocaleString('en') +" pcs</strong></td><td><strong>" + projectSnapshot.val().project_name + "</strong></td><td><strong>" + projectSnapshot.val().project_address + "</strong></td><td><a data-toggle='collapse' data-target='#contacts"+count+"' style='cursor: default; color: inherit;'>Click to view</a><div id='contacts"+count+"' class='collapse'></td><td><strong>" + dateFormat(orderSnapshot.val().date) + "</strong></td></tr>").prependTo("table > tbody");

    //                 count++;   
    //             });                    
    //         });         
    //     });
    // }

    function tableData(){

        var myTbody = "";
        var count = 1;
        
        firebase.database().ref('purchase_order/'+plant).orderByChild('reverseDate').on('child_added', function(orderSnapshot){
            firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/item').once('value', function(itemSnapshot){
                itemSnapshot.forEach(function(itemChildSnapshot){
                    firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/project_detail').once('value', function(projectSnapshot){
                        projectSnapshot.forEach(function(projectChildSnapshot){

                            po_no = orderSnapshot.val().po_no;
                            item_no = itemChildSnapshot.val().item_no;
                            quantity = Number(itemChildSnapshot.val().quantity).toLocaleString('en');
                            balance = Number(itemChildSnapshot.val().balance).toLocaleString('en');
                            project_name = projectChildSnapshot.val().project_name;
                            project_address = projectChildSnapshot.val().project_address;
                            date = dateFormat(orderSnapshot.val().date);
                            psi = itemChildSnapshot.val().psi || "";

                            if(psi != ""){
                                var psi_ext = "(" + psi + " psi)";
                            }else{
                                var psi_ext = "";
                            }

                            myTbody += "<tr><td><strong>" + count + "</strong></td>";
                            myTbody += "<td><strong>" + po_no + "</strong></td>";
                            myTbody += "<td><strong>" + item_no + " " + psi_ext + "</strong></td>";
                            myTbody += "<td><strong>" + quantity + " pcs / " + balance + " pcs</strong></td>";
                            myTbody += "<td><strong>" + project_name + "</strong></td>";
                            myTbody += "<td><strong>" + project_address + "</strong></td>";
                            myTbody += "<td><a data-toggle='collapse' data-target='#contacts"+count+"' style='cursor: default; color: inherit;'>Click to view</a><div id='contacts"+count+"' class='collapse'>";

                            firebase.database().ref('purchase_order/'+plant+'/'+orderSnapshot.key+'/contact').once('value', function(contactSnapshot){
                                contactSnapshot.forEach(function(contactChildSnapshot){

                                    contact_name = contactChildSnapshot.val().contact_name;
                                    contact_no = contactChildSnapshot.val().contact_no;
                                    myTbody += "<div class='row' style='margin-bottom: 2px;'><div class='col-md-12'><strong>" + contact_name + "<br> (" + contact_no + ") <br><br></strong></div></div>";
                                }); 
                            });

                            myTbody += "</td>";
                            myTbody += "<td><strong>" + date + "</strong></td></tr>";

                            document.getElementById('orderList').innerHTML = myTbody;
                            count++;   
                        });
                    });   
                });                 
            }); 
        });        
    }

    function dateFormat(date){

        var input_date = new Date(date);
        var dd = input_date.getDate();
        var mm = input_date.getMonth()+1;
        var yy = input_date.getFullYear();

        fulldate = mm+'/'+dd+'/'+yy;

        return fulldate;
    }