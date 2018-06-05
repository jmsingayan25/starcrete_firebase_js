	
	function dateFormat(date){

        var input_date = new Date(date);
        var dd = input_date.getDate();
        var mm = input_date.getMonth()+1;
        var yy = input_date.getFullYear();

        fulldate = mm+'/'+dd+'/'+yy;

        return fulldate;
    }

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