function divCenterToggle(appName,switchApp){

	var ele = document.getElementById(appName).value; 

	var switchData = document.getElementById(switchApp);  

	switch(ele){

		case "Application1":

		switchData.innerHTML='<object width=\"100%\" height=\"100%\" type=\"text/html\" data=\"application1.html\" ></object>';

		break;

		case "Application2":

		switchData.innerHTML='<object width=\"100%\" height=\"100%\" type=\"text/html\" data=\"application2.html\" ></object>';

		break;

		case "Application3":

		switchData.innerHTML='<object width=\"100%\" height=\"100%\" type=\"text/html\" data=\"application3.html\" ></object>';

		break;

	}

}

$(document).ready( function() {

	$("#button").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

		}
		else{

			$(this).html("-");

		}
		$("#box").slideToggle();	

	});

});

$(document).ready( function() {

	$("#createButton").click(function () {

		var counter=0;

		if($(this).html() == "+"){

			var newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + counter);

			newTextBoxDiv.after().html('<input type="text" name="textbox' + counter +'" id="textbox' + counter + '" value="" >');

			newTextBoxDiv.appendTo("#newProjectCreate");

			counter++;
		}

	});

});
