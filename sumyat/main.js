$.noConflict();

$(document).ready( function() {

	$("#restoreButtonID").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({bottom:0, right: 0,width:"5%", height:"25px",position:'absolute'});

			$(".center").css({width:"84.5%"});

			$(".bottomOfCenter").css({width:"84.5%"});

		}

		else{

			$(this).html("-");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({right:0,height:'100%',width:'15%',position:'absolute'});

			$(".center").css({width:" 69.5%"});	

			$(".bottomOfCenter").css({width:"69.5%"});
		}	

	});

});

$(document).ready( function() {

	$('.createButton').click(function(){

		var newTextBoxDiv = $('<div/>').attr("id", "textBoxID");		

		newTextBoxDiv.after().html('<form action=""><input type="text" id="textbox"></form>');			

		if($('#textBoxID').length==0){

			$('.newProjectCreate').append(newTextBoxDiv);

			$('#textbox').keydown(function() {

				var message = $("#textbox").val();

				if (event.keyCode == 13) {

					if (message == "") {

						alert("Enter Some Text In Textarea");

					} else {

						//var div =$('<div/>').appendTo('#tree').attr({"class":"listdiv"});

						//var ul = $('<ul/>').appendTo('.newProjectCreateDiv').attr({"id":"tree"});	

						//var spans = $('<span/>').appendTo('#tree');

						var li = $('<li/>').appendTo('#treeID').text(message);						
						
						//$('<a />').text(message).attr('href', "#").appendTo(li);

						$('#textBoxID').remove( );
						
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

		 $( function() {
    $( "#treeID" ).selectable();
  } );

	});

});