$.noConflict();

$(document).ready( function() {

	

	$("#restoreButtonID").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({bottom:0, right: 0,width:"5%", height:"25px",position:'absolute'});

			$(".center").css({width:"86%"});

			$(".bottomOfCenter").css({width:"86%"});

		}

		else{

			$(this).html("-");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({right:0,height:'100%',width:'15%',position:'absolute'});

			$(".center").css({width:" 71%"});	

			$(".bottomOfCenter").css({width:"71%"});
		}	

	});


	$("#treeID").delegate('li','click',function(event) {
    	drawDecisionTable();

	});

	function drawDecisionTable() {
		$('#centerID').append('<table id="dtTable"></table>');
		var table = $('table');    
		table.append('<thead id="header"> <tr> <th></th> <th class="task"></th> </tr> </thead>');
		table.append('<tbody id="condition"></tbody>');
		table.append('<tbody id="action"></tbody>');


		//var response = '{"dt":{"conditions":["condition2","condition3","condition1"],"actions":["action1","action2"],"rules":[{"conditions":["11","new","11"],"actions":["a1","a2"]},{"conditions":["22","new","22"],"actions":["b1","b2"]},{"conditions":["33","new","33"],"actions":["c1","c2"]}]}}';
		var response = '{"dt":{"conditions":["c1","c2","c3"],"actions":["a1","a2", "a3"],"rules":[{"conditions":["rc1","rc2","rc3"],"actions":["ra1","ra2", "a3"]},{"conditions":["r3c1","r3c2","r3c3"],"actions":["r3a1","r3a2", "a3"]},{"conditions":["r2c1","r2c2","r2c3"],"actions":["r2a1","r2a2", "a3"]}]}}';
		//convert string to JSON
		var dt = $.parseJSON(response);

		var conditions = dt.dt.conditions;
		var actions = dt.dt.actions;
		var rules = dt.dt.rules;

		var headerRow = $('#header tr');
		var conditionSection = $($('table').find('tbody')[0]);
		var actionSection = $($('table').find('tbody')[1]);

		$.each(conditions, function(index, condition) {
			$(conditionSection).append('<tr class="task"> <th>' + (index+1) +'</th><td><input type="text" value="' + condition +'"></td></tr>');		
		});

		$.each(actions, function(index, action) {
			$(actionSection).append('<tr class="task"> <th>' + (index+1) +'</th><td><input type="text" value="' + action +'"></td></tr>');		
		});

		$.each(rules, function(i, rule) {	
			$(headerRow).append('<th class="task">' + (i+1) +'</th>');
		});

		var rows = $(conditionSection).find('tr');

		$.each(rows, function(j, row) {
			$.each(rules, function(k, rule) {
				$(row).append('<td><input type="text" value="' + rule.conditions[j] +'"></td>');
			});
		});

		rows = $(actionSection).find('tr');

		$.each(rows, function(j, row) {
			$.each(rules, function(k, rule) {
				$(row).append('<td><input type="text" value="' + rule.actions[j] +'"></td>');
			});
		});

	}

});

$(document).ready( function() {

	$('.createButton').click(function(){

		var newTextBoxDiv = $('<div/>').attr("id", "textBoxID");		

		newTextBoxDiv.after().html('<form action=""><input type="text" id="textbox"></form>');			

		if($('#textBoxID').length==0){

			$('#treeID li').show();

			$('#minusID').text('- -');

			$('.newProjectCreate').append(newTextBoxDiv);

			$('#textbox').keydown(function(event) {

				var message = $("#textbox").val();

				if (event.keyCode == 13) {

					if (message == "") {

						alert("Enter Some Text In Textarea");

					} else {

						$('#textBoxID').remove( );

						//var div =$('<div/>').appendTo('#tree').attr({"class":"listdiv"});

						//var ul = $('<ul/>').appendTo('.newProjectCreateDiv').attr({"id":"tree"});	

						//var spans = $('<span/>').appendTo('#treeID').attr({"class":"context-menu-one"});

						var li = $('<li/>').appendTo('#treeID').text(message);
						
						//$('<a />').text(message).attr('href', "#").appendTo(li);

						
						
					}

					return false;
				}

			});

		}

		$('#minusID').click(function(){
			
			if($('#minusID').text()=='- -'){

				$('#treeID li').hide("fast", function(){

					$('#minusID').text('++');

				});

			}else{

				$('#treeID li').show("fast", function(){

					$('#minusID').text('- -');

				});

			}

		});	

	});


	

});

$( function() {

	$( "#treeID" ).selectable();	

});