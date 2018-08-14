	function add_employee_row(position){

        event.preventDefault();

        if(position == "office"){

            $rowno = $("#office_table tr").length;
            $rowno = $rowno + 1;
            $("#office_table tr:last").after("<tr id='office_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='employee_name[]' class='form-control input_type' required></td><td><input type='time' name='employee_timein[]' class='form-control input_type'></td><td><input type='time' name='employee_timeout[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_office_row('office_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
        
        }else if(position == "absent_plant"){

            $rowno = $("#plant_table tr").length;
            $rowno = $rowno + 1;
            $("#plant_table tr:last").after("<tr id='plant_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='plant_employee_name[]' class='form-control input_type' required></td><td><textarea name='plant_comment[]' class='form-control input_type'></textarea></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_plant_employee('plant_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "absent_motorpool"){

            $rowno = $("#motorpool_table tr").length;
            $rowno = $rowno + 1;
            $("#motorpool_table tr:last").after("<tr id='motorpool_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='motorpool_employee_name[]' class='form-control input_type' required></td><td><textarea name='motorpool_comment[]' class='form-control input_type'></textarea></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_motorpool_employee('motorpool_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "absent_trucking"){

            $rowno = $("#trucking_table tr").length;
            $rowno = $rowno + 1;
            $("#trucking_table tr:last").after("<tr id='trucking_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='trucking_employee_name[]' class='form-control input_type' required></td><td><textarea name='trucking_comment[]' class='form-control input_type'></textarea></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_trucking_employee('trucking_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "new_employee"){

            $rowno = $("#new_employee_table tr").length;
            $rowno = $rowno + 1;
            $("#new_employee_table tr:last").after("<tr id='new_employee_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='new_employee_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_new_employee('new_employee_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "machine1"){

            $rowno = $("#machine1_table tr").length;
            $rowno = $rowno + 1;
            $("#machine1_table tr:last").after("<tr id='machine1_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='machine1_name[]' class='form-control input_type'></td><td><input type='text' name='machine1_position[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_machine1('machine1_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");

        }else if(position == "machine2"){

            $rowno = $("#machine2_table tr").length;
            $rowno = $rowno + 1;
            $("#machine2_table tr:last").after("<tr id='machine2_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='machine2_name[]' class='form-control input_type'></td><td><input type='text' name='machine2_position[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_machine2('machine2_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");

        }else if(position == "nonskid1"){

            $rowno = $("#nonskid1_table tr").length;
            $rowno = $rowno + 1;
            $("#nonskid1_table tr:last").after("<tr id='nonskid1_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid1_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid1('nonskid1_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "nonskid2"){

            $rowno = $("#nonskid2_table tr").length;
            $rowno = $rowno + 1;
            $("#nonskid2_table tr:last").after("<tr id='nonskid2_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid2_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid2('nonskid2_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "nonskid3"){

            $rowno = $("#nonskid3_table tr").length;
            $rowno = $rowno + 1;
            $("#nonskid3_table tr:last").after("<tr id='nonskid3_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid3_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid3('nonskid3_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "nonskid4"){

            $rowno = $("#nonskid4_table tr").length;
            $rowno = $rowno + 1;
            $("#nonskid4_table tr:last").after("<tr id='nonskid4_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='nonskid4_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid4('nonskid4_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    
        }else if(position == "tagapukpok"){

        	$rowno = $("#tagapukpok_table tr").length;
	        $rowno = $rowno + 1;
	        $("#tagapukpok_table tr:last").after("<tr id='tagapukpok_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='tagapukpok_name[]' class='form-control input_type' required></td><td><input type='text' name='tagapukpok_position[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_tagapukpok_row('tagapukpok_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }else if(position == "checker"){

        	$rowno = $("#checker_table tr").length;
	        $rowno = $rowno + 1;
	        $("#checker_table tr:last").after("<tr id='checker_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='checker_name[]' class='form-control input_type' required></td><td><input type='text' name='checker_position[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_checker_row('checker_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }else if(position == "dayshift_guard"){

            $rowno = $("#guard_day_table tr").length;
            $rowno = $rowno + 1;
            $("#guard_day_table tr:last").after("<tr id='guard_day_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='guard_day_name[]' class='form-control input_type'></td><td><input type='text' name='guard_day_position[]' class='form-control input_type'></td><td><button type='button' onclick=remove_dayshift_guard('guard_day_row" + $rowno + "') class='btn btn-danger btn-md'><span class='fa fa-minus'></span></button></td></tr>");
        
        }else if(position == "nightshift_guard"){

            $rowno = $("#guard_night_table tr").length;
            $rowno = $rowno + 1;
            $("#guard_night_table tr:last").after("<tr id='guard_night_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='guard_night_name[]' class='form-control input_type'></td><td><input type='text' name='guard_night_position[]' class='form-control input_type'></td><td><button type='button' onclick=remove_nightshift_guard('guard_night_row" + $rowno + "') class='btn btn-danger btn-md'><span class='fa fa-minus'></span></button></td></tr>");
        
        }else if(position == "kamador"){

        	$rowno = $("#kamador_table tr").length;
	        $rowno = $rowno + 1;
	        $("#kamador_table tr:last").after("<tr id='kamador_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='kamador_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_kamador_row('kamador_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }else if(position == "mechanic"){

        	$rowno = $("#mechanic_table tr").length;
	        $rowno = $rowno + 1;
	        $("#mechanic_table tr:last").after("<tr id='mechanic_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='mechanic_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_mechanic_row('mechanic_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }else if(position == "loader"){

        	$rowno = $("#loader_table tr").length;
	        $rowno = $rowno + 1;
	        $("#loader_table tr:last").after("<tr id='loader_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='loader_name[]' class='form-control input_type' required></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_loader_row('loader_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }else if(position == "others"){

        	$rowno = $("#others_table tr").length;
	        $rowno = $rowno + 1;
	        $("#others_table tr:last").after("<tr id='others_row" + $rowno + "' style='text-align: center;'><td><input type='text' name='others_name[]' class='form-control input_type' required></td><td><input type='text' name='others_position[]' class='form-control input_type'></td><td><button type='button' class='btn btn-danger btn-md' onclick=remove_others_row('others_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
	    
        }
    }

    function remove_office_row(rowno){
        $('#'+rowno).remove();
    }

	function remove_machine1(rowno){
        $('#'+rowno).remove();
    }

    function remove_machine2(rowno){
        $('#'+rowno).remove();
    }

	function remove_plant_employee(rowno){
        $('#'+rowno).remove();
    }	

	function remove_motorpool_employee(rowno){
        $('#'+rowno).remove();
    }

	function remove_trucking_employee(rowno){
        $('#'+rowno).remove();
    }

	function remove_new_employee(rowno){
        $('#'+rowno).remove();
    }

	function remove_nonskid1(rowno){
        $('#'+rowno).remove();
    }	

	function remove_nonskid2(rowno){
        $('#'+rowno).remove();
    }

	function remove_nonskid3(rowno){
        $('#'+rowno).remove();
    }

	function remove_nonskid4(rowno){
        $('#'+rowno).remove();
    }

    function remove_tagapukpok_row(rowno){
        $('#'+rowno).remove();
    }

    function remove_checker_row(rowno){
        $('#'+rowno).remove();
    }

	function remove_dayshift_guard(rowno){
        $('#'+rowno).remove();
    }

	function remove_nightshift_guard(rowno){
        $('#'+rowno).remove();
    }

    function remove_kamador_row(rowno){
        $('#'+rowno).remove();
    }

    function remove_mechanic_row(rowno){
        $('#'+rowno).remove();
    }

    function remove_loader_row(rowno){
        $('#'+rowno).remove();
    }

    function remove_others_row(rowno){
        $('#'+rowno).remove();
    }