$(document).ready( function() {

	$("#restoreButton").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightDiv").parent().css({position: 'absolute'});

			$("#rightDiv").css({bottom:0, right: 0,width:"10%", height:"25px",position:'absolute'});

			$(".center").css({width:"100%"});

			$(".rightOfCenter").css({width:"83%"});

			$(".rightBottomOfCenter").css({width:"82.9%"});
		}

		else{

			$(this).html("-");

			$("#rightDiv").parent().css({position: 'absolute'});

			$("#rightDiv").css({right:0,height:'100%',width:'15%',position:'absolute'});

			$(".center").css({width:"73%"});

			$(".rightOfCenter").css({width:"76.7%"});	

			$(".rightBottomOfCenter").css({width:"76.5%"});
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

	var leftOfCenter = $('<div/>');	

	$(leftOfCenter).attr({"class":"leftOfCenter"});

	var rightOfCenter = $('<div/>');

	$(rightOfCenter).attr({"class":"rightOfCenter"});

	var rightBottomOfCenter = $('<div/>');

	$(rightBottomOfCenter).attr({"class":"rightBottomOfCenter"});

	$('#centerDiv').append(leftOfCenter,rightOfCenter,rightBottomOfCenter);

	$('.leftOfCenter').append("<div class='titleMenu' id='titleMenuID'>"

		+ "<div class='createButton'>+</div></div>"

		+ "<div class='newProjectCreateDiv'><ul id='menu'></ul></div>");

	//$('.rightOfCenter').append("Thisisrightofcenterpage.Welcomefromthispage..Welcomefromthispage..Welcomefromthispage..Welcomefromthispage.HelloHowAreyouAreyouOKWhatareyoudoingnowWhatareyoudoingnowWhatareyoudoingnow");

	//$('.rightBottomOfCenter').append("this is a asfok afoa asfj afsjf afkajfal ljafa oijfa oijfa ijafa oifjajwfaageagaegageaggawtregeagbeagae oiajfka aiwjfda aoiwjfaiowf alijwdoiawf awifjwaoif <br>ijsef<br>ekl<br>ojef<br>kf<br>kjoae<br>");

	var counter=0;
	
	$('.createButton').click(function(){

		var newTextBoxDiv = $('<div/>').attr("id", "TextBoxDiv");		

		newTextBoxDiv.after().html('<form action=""><input type="text" id="textbox"></form>');			

		if($('#TextBoxDiv').length==0){

		//if($("#textbox").val()==null){

			$('.newProjectCreateDiv').append(newTextBoxDiv);

			counter++;

			$('#textbox').keydown(function() {

				var message = $("#textbox").val();

				if (event.keyCode == 13) {

					if (message == "") {

						alert("Enter Some Text In Textarea");

					} else {

						var li = $('<li/>').appendTo('#menu');

						$('<a />').text(message).attr('href', message).appendTo(li);

						$('#TextBoxDiv').remove( );
						
						//var sub_ul = $('<ul/>').appendTo(li);

						//newTextBoxDiv.after().html(message);

					}

					return false;
				}

			});

		}

	});

}