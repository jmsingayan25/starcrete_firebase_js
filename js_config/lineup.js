    function add_machine1_employee(){

        event.preventDefault();

        $rowno = $("#machine1_table tr").length;
        $rowno = $rowno + 1;
        $("#machine1_table tr:last").after("<tr id='machine1_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='machine1_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_machine_1_row('machine1_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_machine_1_row(rowno){
        $('#'+rowno).remove();
    }

    function add_forklift_operator_employee(){

        event.preventDefault();

        $rowno = $("#forklift_operator_table tr").length;
        $rowno = $rowno + 1;
        $("#forklift_operator_table tr:last").after("<tr id='forklift_operator_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='forklift_operator_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_forklift_operator_row('forklift_operator_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_forklift_operator_row(rowno){
        $('#'+rowno).remove();
    }

    function add_machine3_employee(){

        event.preventDefault();

        $rowno = $("#machine3_table tr").length;
        $rowno = $rowno + 1;
        $("#machine3_table tr:last").after("<tr id='machine3_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='machine3_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_machine3_row('machine3_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_machine3_row(rowno){
        $('#'+rowno).remove();
    }

    function add_mechanic_employee(){

        event.preventDefault();

        $rowno = $("#mechanic_table tr").length;
        $rowno = $rowno + 1;
        $("#mechanic_table tr:last").after("<tr id='mechanic_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='mechanic_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_mechanic_row('mechanic_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_mechanic_row(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid1_employee(){

        event.preventDefault();

        $rowno = $("#nonskid1_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid1_table tr:last").after("<tr id='nonskid1_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='nonskid1_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid1_row('nonskid1_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_nonskid1_row(rowno){
        $('#'+rowno).remove();
    }

    function add_tagapukpok_employee(){

        event.preventDefault();

        $rowno = $("#tagapukpok_table tr").length;
        $rowno = $rowno + 1;
        $("#tagapukpok_table tr:last").after("<tr id='tagapukpok_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='tagapukpok_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_tagapukpok_row('tagapukpok_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_tagapukpok_row(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid2_employee(){

        event.preventDefault();

        $rowno = $("#nonskid2_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid2_table tr:last").after("<tr id='nonskid2_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='nonskid2_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid2_row('nonskid2_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_nonskid2_row(rowno){
        $('#'+rowno).remove();
    }

    function add_checker_employee(){

        event.preventDefault();

        $rowno = $("#checker_table tr").length;
        $rowno = $rowno + 1;
        $("#checker_table tr:last").after("<tr id='checker_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='checker_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_checker_row('checker_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_checker_row(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid3_employee(){

        event.preventDefault();

        $rowno = $("#nonskid3_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid3_table tr:last").after("<tr id='nonskid3_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='nonskid3_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid3_row('nonskid3_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_nonskid3_row(rowno){
        $('#'+rowno).remove();
    }

    function add_loader_employee(){

        event.preventDefault();

        $rowno = $("#loader_table tr").length;
        $rowno = $rowno + 1;
        $("#loader_table tr:last").after("<tr id='loader_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='loader_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_loader_row('loader_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_loader_row(rowno){
        $('#'+rowno).remove();
    }

    function add_nonskid4_employee(){

        event.preventDefault();

        $rowno = $("#nonskid4_table tr").length;
        $rowno = $rowno + 1;
        $("#nonskid4_table tr:last").after("<tr id='nonskid4_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='nonskid4_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_nonskid4_row('nonskid4_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_nonskid4_row(rowno){
        $('#'+rowno).remove();
    }

    function add_kamador_employee(){

        event.preventDefault();

        $rowno = $("#kamador_table tr").length;
        $rowno = $rowno + 1;
        $("#kamador_table tr:last").after("<tr id='kamador_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='kamador_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_kamador_row('kamador_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_kamador_row(rowno){
        $('#'+rowno).remove();
    }

    function add_others_employee(){

        event.preventDefault();

        $rowno = $("#others_table tr").length;
        $rowno = $rowno + 1;
        $("#others_table tr:last").after("<tr id='others_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='others_name[]' class='form-control input_type' autofocus required></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_others_row('others_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_others_row(rowno){
        $('#'+rowno).remove();
    }

    function add_absent_employee(){

        event.preventDefault();

        $rowno = $("#absent_table tr").length;
        $rowno = $rowno + 1;
        $("#absent_table tr:last").after("<tr id='absent_row" + $rowno + "' style='text-align: center;'><td class='col-md-5'><input type='text' name='absent_name[]' class='form-control input_type' autofocus required></td><td class='col-md-4'><textarea name='absent_reason[]' class='form-control input_type' rows='2'></textarea></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-md' onclick=remove_absent_row('absent_row" + $rowno + "')><span class='fa fa-minus'></span></button></td></tr>");
    }

    function remove_absent_row(rowno){
        $('#'+rowno).remove();
    }