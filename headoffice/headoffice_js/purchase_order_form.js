    $(document).ready(function() {
        
        var $form = $( "#form" );
        var $input = $form.find( "input[name='quantity[]'], input[name='psi[]']" );

        $form.on( "keyup", "input[name='quantity[]'], input[name='psi[]']", function( event ) {
            
            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }
            
            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }
            
            var $this = $( this );
            
            // Get the value.
            var input = $this.val();
            
            var input = input.replace(/[\D\s\._\-]+/g, "");
                    input = input ? parseInt( input, 10 ) : 0;

                    $this.val( function() {
                        return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
                    } );
        });   

        firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {

                var uid = user.uid;
        
                firebase.database().ref('users/'+uid).once('value').then(function(snapshot) {

                    issueFormDetails(); 
                    itemList();
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
        $("#item_table tr:last").after("<tr id='row"+$rowno+"' style='text-align: center;'><td class='col-md-1'><div class='form-group'><select name='item_no[]' class='form-control' required><option value=''>Select</option></select></div></td><td class='col-md-1'><div class='form-group'><input type='text' name='psi[]' class='form-control' autocomplete='off' placeholder='PSI'></div></td><td class='col-md-1'><div class='form-group'><input type='text'  name='quantity[]' class='form-control' placeholder='Quantity' required></div></td><td class='col-md-1'><div class='form-group'><input type='button' value='Remove' class='btn btn-danger btn-md' onclick=delete_row('row"+$rowno+"') style='font-weight: bold;'></div></td></tr>");

        firebase.database().ref('item').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                $('[name="item_no[]"]').append("<option value='" + childSnapshot.val().item + "'>" + childSnapshot.val().item + "</option>");
            });
        });
    }

    function delete_row(rowno){
     $('#'+rowno).remove();
    }

    function issueFormDetails(){

        firebase.database().ref('client').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){

                $("#client").append("<option value='" + childSnapshot.key + "'>" + childSnapshot.val().client_name + "</option>");
            });        
        });

        $("#client").change(function(){

            $('#div_contact_list').empty();
            var clientKey = this.value;
            // alert(clientKey);
            if(clientKey || 0 !== clientKey.length){

                // var siteList = "<select id='project_id' name='project_id' class='form-control' required><option value =''>Select</option>";
                var div_project_list = "<option value=''>Select</option>";
                firebase.database().ref('project/'+clientKey).once('value').then(function(snapshot){
                    snapshot.forEach(function(childSnapshot){

                        // $("#project_id").append("<option value='" + childSnapshot.key + "'>" + childSnapshot.val().project_name + " / " + childSnapshot.val().project_address + "</option>");

                        div_project_list += "<option value='" + childSnapshot.key + "'>" + childSnapshot.val().project_name + " / " + childSnapshot.val().project_address + "</option>";

                    document.getElementById('project_id').innerHTML = div_project_list;

                    });
                    // siteList += "</select>"
                });
            }else{
                // document.getElementById('div_site_list').innerHTML = "";
                // $("#project_id").remove();
                // $('#selectBox').find('option').remove().;
                document.getElementById("project_id").options.length = 1;
                $('#div_contact_list').empty();

            }

            $("#project_id").change(function(){

                $("#div_contact_list").empty();
                var projectKey = this.value;
                if(projectKey || 0 !== projectKey.length){
                    var div_contact_list = "";
                    firebase.database().ref('project/'+clientKey+'/'+projectKey+'/contact').once('value').then(function(snapshot){
                        snapshot.forEach(function(childSnapshot){

                            div_contact_list += "<div class='form-group'><div class='col-md-6'><strong>" + childSnapshot.val().project_contact_name + "</strong></div><div class='col-md-6'><strong>" + childSnapshot.val().project_contact_no + "</strong></div></div>";

                            document.getElementById('div_contact_list').innerHTML = div_contact_list;
                        });
                    });
                }else{
                    $("#div_contact_list").empty();
                }
            });
        });  
    }

    function itemList(){

        firebase.database().ref('item').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                $('[name="item_no[]"]').append("<option value='" + childSnapshot.val().item + "'>" + childSnapshot.val().item + "</option>");
            });
            // console.log(snapshot.val());
        });
    }

    function submitForm(){

        event.preventDefault();

        var po_no = document.getElementById('po_no').value;
        var plant = document.querySelector('input[name="plant"]:checked').value;
        var client_id = document.getElementById('client').value;
        var project_id = document.getElementById('project_id').value;
        var item_no = $("select[name='item_no[]']").map(function(){return $(this).val();}).get();
        var psi = $("input[name='psi[]']").map(function(){return $(this).val() || "";}).get();
        var quantity = $("input[name='quantity[]']").map(function(){return $(this).val();}).get();
        var date = new Date().toLocaleString();

        firebase.database().ref('project/'+client_id+'/'+project_id).once('value').then(function(snapshot){
            // console.log(snapshot.val());

            var poData = {
                po_no: po_no,
                date: date,
                reverseDate: firebase.database.ServerValue.TIMESTAMP,
                status: "PENDING"
            }
            console.log(poData);

            var postData = firebase.database().ref('purchase_order/'+plant+'/');
            var newPostRef = postData.push();
            newPostRef.set(poData);

            var postId = newPostRef.key;
            var count = 0;
            for(var i = 0; i < item_no.length; i++){

                var itemData = {
                    item_no: item_no[i],
                    psi: psi[i],
                    quantity: quantity[i].replace(",",""),
                    balance: quantity[i].replace(",","")
                }

                console.log(itemData);

                firebase.database().ref('purchase_order/'+plant+'/'+postId+'/item/'+item_no[i]).set(itemData);
                count++;
            }

            firebase.database().ref().child('purchase_order/'+plant+'/'+postId).once('value', function(snapshot){

                var timestamp = snapshot.val().reverseDate * -1;
                var timeUpdate = {
                    reverseDate: timestamp
                } 

                firebase.database().ref('purchase_order/'+plant+'/'+postId).update(timeUpdate);
            });

            var projectData = {
                project_name: snapshot.val().project_name,
                project_address: snapshot.val().project_address,
            }

            firebase.database().ref('purchase_order/'+plant+'/'+postId+'/project_detail/'+project_id).set(projectData);

            firebase.database().ref('project/'+client_id+'/'+project_id+'/contact').on('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){

                    var contactData = {
                        contact_name: childSnapshot.val().project_contact_name,
                        contact_no: childSnapshot.val().project_contact_no
                    }

                    // console.log(childSnapshot.key, contactData);
                    firebase.database().ref('purchase_order/'+plant+'/'+postId+'/contact/'+childSnapshot.key).set(contactData);
                    
                });
            });

            if(count == item_no.length){
                document.getElementById('msg').innerHTML = "Transaction complete. You can view the order on <a href='purchase_order.html?plant="+plant+"'>" + plant + " Purchase Order </a> page."
                    $('#success_msg').show();
            }
        });
    }