
	function dateFormat(date){

        var input_date = new Date(date);
        var dd = input_date.getDate();
        var mm = input_date.getMonth()+1;
        var yy = input_date.getFullYear();

        fulldate = mm+'/'+dd+'/'+yy;

        return fulldate;
    }

    function dateDashFormat(date){

        var input_date = new Date(date);
        var dd = input_date.getDate();
        var mm = input_date.getMonth()+1;
        var yy = input_date.getFullYear();

        if(dd < 10){
            dd = "0"+dd;
        }

        if(mm < 10){
            mm = "0"+mm;
        }

        fulldate = yy+'-'+mm+'-'+dd;

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

    function searchMatch(searchWord, findWord){

        parse_word = searchWord.replace(/\s+/g, '|').toLowerCase();
        reg_word = new RegExp(parse_word, 'gi');
        search = findWord.match(reg_word);

        return search;
    }
    
    function startTime(time) {

        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
          timeValue= "" + hours;
        } else if (hours > 12) {
          timeValue= "" + (hours - 12);
        } else if (hours == 0) {
          timeValue= "12";
        }
         
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

        // show
        return timeValue;
    }

    