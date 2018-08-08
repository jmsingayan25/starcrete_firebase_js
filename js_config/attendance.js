    function add_office_employee(){

        event.preventDefault();

        $rowno = $("#office_table tr").length;
        $rowno = $rowno + 1;
        $("#office_table tr:last").after("<tr id='office_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='employee_name[]' class='form-control input_type' required></td><td><input type='time' name='employee_timein[]' class='form-control input_type'></td><td><input type='time' name='employee_timeout[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_office_row('office_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_office_row(rowno){
        $('#'+rowno).remove();
    }

    function add_agency_employee(){

        event.preventDefault();

        $rowno = $("#agency_table tr").length;
        $rowno = $rowno + 1;
        $("#agency_table tr:last").after("<tr id='agency_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='agency_employee_name[]' class='form-control input_type' required></td><td><input type='text' name='agency_comment[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_agency_employee('agency_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_agency_employee(rowno){
        $('#'+rowno).remove();
    }

    function add_plant_employee(){

        event.preventDefault();

        $rowno = $("#plant_table tr").length;
        $rowno = $rowno + 1;
        $("#plant_table tr:last").after("<tr id='plant_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='plant_employee_name[]' class='form-control input_type' required></td><td><input type='text' name='plant_comment[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_plant_employee('plant_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_plant_employee(rowno){
        $('#'+rowno).remove();
    }

    function add_motorpool_employee(){

        event.preventDefault();

        $rowno = $("#motorpool_table tr").length;
        $rowno = $rowno + 1;
        $("#motorpool_table tr:last").after("<tr id='motorpool_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='motorpool_employee_name[]' class='form-control input_type' required></td><td><input type='text' name='motorpool_comment[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_motorpool_employee('motorpool_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_motorpool_employee(rowno){
        $('#'+rowno).remove();
    }

    function add_trucking_employee(){

        event.preventDefault();

        $rowno = $("#trucking_table tr").length;
        $rowno = $rowno + 1;
        $("#trucking_table tr:last").after("<tr id='trucking_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='trucking_employee_name[]' class='form-control input_type' required></td><td><input type='text' name='trucking_comment[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_trucking_employee('trucking_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_trucking_employee(rowno){
        $('#'+rowno).remove();
    }

    function add_new_employee(){

        event.preventDefault();

        $rowno = $("#new_employee_table tr").length;
        $rowno = $rowno + 1;
        $("#new_employee_table tr:last").after("<tr id='new_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='new_employee_name[]' class='form-control input_type' required></td><td class='col-md-5'><button type='button' class='btn btn-danger btn-md' onclick=remove_new_employee('new_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_new_employee(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid1(){

        event.preventDefault();

        $rowno = $("#nonskid1_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid1_table tr:last").after("<tr id='nonskid1_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid1_name[]' class='form-control input_type' required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid1('nonskid1_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_nonskid1(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid2(){

        event.preventDefault();

        $rowno = $("#nonskid2_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid2_table tr:last").after("<tr id='nonskid2_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid2_name[]' class='form-control input_type' required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid2('nonskid2_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }
    
    function remove_nonskid2(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid3(){

        event.preventDefault();

        $rowno = $("#nonskid3_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid3_table tr:last").after("<tr id='nonskid3_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid3_name[]' class='form-control input_type' required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid3('nonskid3_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }
    
    function remove_nonskid3(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid4(){

        event.preventDefault();

        $rowno = $("#nonskid4_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid4_table tr:last").after("<tr id='nonskid4_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid4_name[]' class='form-control input_type' required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid4('nonskid4_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }
    
    function remove_nonskid4(rowno){
        $('#'+rowno).remove();
    }

    function add_dayshift_guard(){

        event.preventDefault();

        $rowno = $("#guard_day_table tr").length;
        $rowno = $rowno + 1;
        $("#guard_day_table tr:last").after("<tr id='guard_day_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='guard_day_name[]' class='form-control input_type'></td><td><input type='text' name='guard_day_position[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' onclick=remove_dayshift_guard('guard_day_row" + $rowno + "') class='btn btn-danger btn-md'><span class='fa fa-minus'></span></button></td></tr>");
    }
    
    function remove_dayshift_guard(rowno){
        $('#'+rowno).remove();
    }

    function add_nightshift_guard(){

        event.preventDefault();

        $rowno = $("#guard_night_table tr").length;
        $rowno = $rowno + 1;
        $("#guard_night_table tr:last").after("<tr id='guard_night_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='guard_night_name[]' class='form-control input_type'></td><td><input type='text' name='guard_night_position[]' class='form-control input_type'></td><td class='col-md-1'><button type='button' onclick=remove_nightshift_guard('guard_night_row" + $rowno + "') class='btn btn-danger btn-md'><span class='fa fa-minus'></span></button></td></tr>");
    }
    
    function remove_nightshift_guard(rowno){
        $('#'+rowno).remove();
    }