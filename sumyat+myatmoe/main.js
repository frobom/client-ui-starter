$.noConflict();

$(document).ready( function() {	

	var fileId=0;

	$("#json").hide();

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
		$('#centerID').empty();
    	drawDecisionTable($(this).text(), $(this).attr('id'));

	});


	function drawDecisionTable(fileName, id) {

		$('#centerID').append('<h2 align="center">' + fileName + '</h2>');
		$('#centerID').append('<table id="dtTable"></table>');
		var table = $('table');    
		table.append('<thead id="header"> <tr> <th></th> <th class="task"></th> </tr> </thead>');
		//$('<img id="createdImage" src="some.jpg"/>').appendTo(document.body).css(style);
		//$('<tbody id="condition"/>').appendTo(table).css("border-bottom", "3px solid blue");
		//$("<style/>").text("#condition { border-bottom: 3px solid blue; }").appendTo("head");
		table.append('<tbody id="condition" style="border-bottom: 3px solid blue;"></tbody>');		
		table.append('<tbody id="action"></tbody>');
		//$("<style/>").text("#condition { border-bottom: 3px solid blue; }").appendTo("head");
		//$('head').append("< style > #condition { border-bottom: 3px solid blue;}  < /style >");
		//$("head").append("<style/>").text("#condition { border-bottom: 3px solid blue; }");		

		//var response = '{"dt":{"conditions":["condition2","condition3","condition1"],"actions":["action1","action2"],"rules":[{"conditions":["11","new","11"],"actions":["a1","a2"]},{"conditions":["22","new","22"],"actions":["b1","b2"]},{"conditions":["33","new","33"],"actions":["c1","c2"]}]}}';
		var response = '{"dt":{"conditions":["c1","c2","c3"],"actions":["a1","a2", "a3"],"rules":[{"conditions":["rc1","rc2","rc3"],"actions":["ra1","ra2", "a3"]},{"conditions":["r3c1","r3c2","r3c3"],"actions":["r3a1","r3a2", "a3"]},{"conditions":["r2c1","r2c2","r2c3"],"actions":["r2a1","r2a2", "a3"]}]}}';
		
		if( $('#fileId').length )         // use this if you are using id to check
		{
     			// it exists
		}
		$("#json").append('<p id="' + fileName +'">' + response + '</p>');
		//convert string to JSON
		var dt = $.parseJSON(response);

		var conditions = dt.dt.conditions;
		var actions = dt.dt.actions;
		var rules = dt.dt.rules;

		var headerRow = $('#header tr');
		var conditionSection = $($('table').find('tbody')[0]);
		var actionSection = $($('table').find('tbody')[1]);

		//alert("conditionSection " + $('table').find('tbody')[0].html());

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

		$("#condition").css("border", "10px solid red");
		//$("#condition").css({ borderBottom: "2px solid #ff4141" });
		//alert("condition : " + $("#condition").html());
		//document.getElementById("condition").style.borderBottom = "15px solid blue";
		// $("#condition").css("border", "10px solid red");
		// alert("css of condition : " + $("#condition").css("border"));
		//$("p").css("background-color", "yellow");

		//$(".menu").css({ "border-bottom": "2px solid #ff4141": });
		//$("table").css("border", "3px solid blue");

		//$(conditionSection).css("borderBottom", "3px solid blue");
		//alert($(conditionSection).html());
		// $(this).attr('style', 'text-align: center');
	}


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

						var li = $('<li id="'+ (++fileId) +'" />').appendTo('#treeID').text(message);

						$('<div id="'+ fileId +'" />').appendTo('#centerID');
						
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