function divCenterToggle(appName,switchApp){

	var ele = document.getElementById(appName).value; 

	var switchData = document.getElementById(switchApp); 	

	switch(ele){

		case "Application1":

		leftAndRightCreateDiv(switchData,ele);
		
		break;

		case "Application2":

		leftAndRightCreateDiv(switchData,ele);

		break;

		case "Application3":

		leftAndRightCreateDiv(switchData,ele);

		break;
	}
}

$(document).ready( function() {

	$("#restoreButton").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightDiv").parent().css({position: 'absolute'});

			$("#rightDiv").css({bottom:0, right: 0,width:"10%", height:"25px",position:'absolute'});

			$(".center").css({width:"100%"});
		}

		else{

			$(this).html("-");

			$("#rightDiv").parent().css({position: 'absolute'});
			$("#rightDiv").css({right:0,height:'100%',width:'15%',position:'absolute'});
			$(".center").css({width:"73%"});		
		}	
		
	});

});

// $(document).ready( function() {

// 	$("#createButton").click(function () {

// 		var counter=0;

// 		if($(this).html() == "+"){

// 			var newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + counter);

// 			newTextBoxDiv.after().html('<input type="text" name="textbox' + counter +'" id="textbox' + counter + '" value="" >');

// 			newTextBoxDiv.appendTo("#newProjectCreate");

// 			counter++;
// 		}

// 	});

// });

function leftAndRightCreateDiv(switchData,ele){

	var leftOfCenter = document.createElement('div');	

	$(leftOfCenter).attr({"id":"leftOfCenterID" , "class":"leftOfCenter"});
	
	var rightOfCenter = document.createElement('div');

	$(rightOfCenter).attr({"id":"rightOfCenterID" , "class":"rightOfCenter"});	

	$(switchData).append(leftOfCenter,rightOfCenter);

	$(leftOfCenter).css({"position":"absolute","left": "0","width": "18%","height":"100%","padding":"10px","background-color":"blue","overflow":"auto"});

	$(rightOfCenter).css({"position":"absolute","right": "0","width": "77.5%","height":"100%","padding":"10px","background-color":"magenta","overflow":"auto"});

	//$("#leftOfCenterID").append("<div class='menu'><ul>Folder<li><a href='#'>Apple</a></li><li><a href='#'>Orange</a></li><li><a href='#'>Grape</a></li></ul></div>" );

	$("#leftOfCenterID").append("<div class='titleMenu'></div>");	

}

function appendChildCreate(){



}