$(document).ready( function() {

	$("#restoreButton").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightDiv").parent().css({position: 'absolute'});

			$("#rightDiv").css({bottom:0, right: 0,width:"10%", height:"25px",position:'absolute'});

			$(".center").css({width:"100%"});

			$(".rightOfCenter").css({width:"83.1%"});
		}

		else{

			$(this).html("-");

			$("#rightDiv").parent().css({position: 'absolute'});

			$("#rightDiv").css({right:0,height:'100%',width:'15%',position:'absolute'});

			$(".center").css({width:"73%"});

			$(".rightOfCenter").css({width:"76.8%"});	
		}	

	});

});

var myState=0;

$(document).ready(function(){	

	$('#myBtn1').click(function(){

		if (myState==0){

			leftAndRightCreateDiv();

			myState=1;

		} else {

			$( this ).replaceWith( $( this ) );	

		}

	});

});

$(document).ready(function(){

	$('#myBtn2').click(function(){

		if (myState==0){

			leftAndRightCreateDiv();

			myState=1;

		} else {

			$( this ).replaceWith( $( this ) );	

		}

	});

});

$(document).ready(function(){	

	$('#myBtn3').click(function(){

		if (myState==0){

			leftAndRightCreateDiv();

			myState=1;

		} else {

			$( this ).replaceWith( $( this ) );	

		}

	});

});

function leftAndRightCreateDiv(){

	var leftOfCenter = document.createElement('div');	

	$(leftOfCenter).attr({"class":"leftOfCenter"});

	var rightOfCenter = document.createElement('div');

	$(rightOfCenter).attr({"class":"rightOfCenter"});	

	$('#centerDiv').append(leftOfCenter,rightOfCenter);

	$('.leftOfCenter').append("<div class='titleMenu' id='titleMenuID'>"

		+ "<div class='createButton'>+</div></div> <br>"

		+ "<div class='newProjectCreateDiv'></div>");	

	$('.createButton').click(function(){

		var newTextBoxDiv = $(document.createElement('div')).attr("id", "TextBoxDiv");		

		newTextBoxDiv.after().html('<input type="text" id="textbox">');			

		if($('#TextBoxDiv').length==0){

			$('.newProjectCreateDiv').append(newTextBoxDiv);

		}	

	});

}