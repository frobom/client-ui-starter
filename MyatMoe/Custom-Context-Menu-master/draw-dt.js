$(function() {
	
	$('body').append('<table id="dtTable"></table>');
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


});