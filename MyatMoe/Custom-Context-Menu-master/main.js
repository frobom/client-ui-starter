(function() {
  
  "use strict";

  $("input").focusin(function(){
               $(this).css("border", "2px solid lightblue");
            });

  $("input").focusout(function(){
        $(this).css("border", "1px solid");
    });

  $("button").click(function(){
        //alert("The button was clicked.");
        createJsonObject();
    });

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // H E L P E R    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Function to check if we clicked inside an element with a particular class
   * name.
   * 
   * @param {Object} e The event
   * @param {String} className The class name to check against
   * @return {Boolean}
   */
  function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }

  /**
   * Get's exact position of event.
   * 
   * @param {Object} e The event passed in
   * @return {Object} Returns the x and y position
   */
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // C O R E    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Variables.
   */
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var taskItemClassName = "task";
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;

  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;

  var windowWidth;
  var windowHeight;

  var rowId;
  var row;
  var text;
  var id = 3;
  var colCount = 1;

  /**
   * Initialise our application's code.
   */
  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();   

  }



  /**
   * Listens for contextmenu events.
   */
  function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      taskItemInContext = clickInsideElement( e, taskItemClassName );

      if ( taskItemInContext ) {
        e.preventDefault();
        toggleMenuOn();
        //text = taskItemInContext.innerHTML;
        //console.log(text);
        positionMenu(e);        
      } else {
        taskItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  $(function() {
    $('table').on('contextmenu', 'tr', function(e) {
        e.preventDefault();
        //alert($(this).attr('id'));
        rowId = $(this).attr('id');
        row = $(this);        

        console.log("rowId: " + rowId);        
    });
});

  /**
   * Listens for click events.
   */
  function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( clickeElIsLink ) {
        e.preventDefault();
        menuItemListener( clickeElIsLink );
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff();
        }
      }
    });
  }

  /**
   * Listens for keyup events.
   */
  function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff();
      }
    }
  }

  /**
   * Window resize event listener
   */
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
  }

  /**
   * Turns the custom context menu off.
   */
  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
  }

  /**
   * Positions the menu properly.
   * 
   * @param {Object} e The event
   */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
  }

  /**
   * Dummy action function that logs an action when a menu item link is clicked
   * 
   * @param {HTMLElement} link The link that was clicked
   */
  function menuItemListener( link ) {
    console.log( "Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    
    text = document.getElementById(rowId).getElementsByTagName("th")[0].innerHTML;

    // console.log("text : " + text);
    // var condCount = $('#condition tr').length;
    // var cellsCount = $('#condition tr td').length;
    // var actCount = $('#action tr').length;
    // console.log("condCount : " + condCount);
    // console.log("actCount : " + actCount);
    // console.log("cellsCount : " + cellsCount);

    if (link.getAttribute("data-action") == "Add Row Above") {
      addNewRow("above");
    }
    else if (link.getAttribute("data-action") == "Add Row Below") {
      addNewRow("below");
    }
    else if (link.getAttribute("data-action") == "Add Column") {
      addColumn();
    };
    toggleMenuOff();
  }


  function addNewRow( place ) {
    var table = document.getElementById("dtTable");

    var html;    

    if (place == "above") {
      html = "<tr id='" + id + "'> <th class='task'>" + text + "</th>";
      id++;

      for (var i = 1; i < table.rows[0].cells.length; i++) {
        html += "<td class='task'> <input type='text'> </td>";      
      }

      html += "</tr>";

      $(html).insertBefore(row);

      document.getElementById(rowId).getElementsByTagName("th")[0].innerHTML = ++text;
     }

     else {
        html = "<tr id='" + id + "'> <th class='task'>" + (++text) + "</th>";
        id++;

        for (var i = 1; i < table.rows[0].cells.length; i++) {
          html += "<td class='task'> <input type='text'> </td>";      
        }

        html += "</tr>";

        $(html).insertAfter(row);
     }

    // for (var i = 1; i < table.rows[0].cells.length; i++) {
    //   html += "<td class='task'> <input type='text'> </td>";      
    // }

    //  html += "</tr>";

     console.log("html : " + html);

    console.log("==================");
  }

  function addColumn() {
    console.log("new Column number : " + ++colCount);
    $("tr:first").append("<th>" + colCount + "</th>");
    $("tr:not(:first)").append("<td class='task'> <input type='text'> </td>");
  }

  function createJsonObject() {  
 
  // var decisionArr = [];
  // var actionArr = [];  

  // var decIndex = 0;
  // var actIndex = 0;

  // var condCount = $('#condition tr').length;  

  // for (var row = 1; row < rowsCount; row++) { 

  //     var cellsCount = document.getElementById("dtTable").rows[row].cells.length;      

  //     if (document.getElementById("dtTable").rows[row].cells[0].innerHTML == "Decision") {
        
           
  //             decisionArr[decIndex++] = document.getElementById("dtTable").rows[row].cells[1].children[0].value;
          
  //     }

  //     else {
            
  //             actionArr[actIndex++] = document.getElementById("dtTable").rows[row].cells[1].children[0].value;
  //             //alert(tbl.rows[rCount - 1].cells[0].getElementsByTagName("input")[0].value);
          
  //     }   
  // }

  var jsonArray = '{"decTable": [{ "conditions" : [';
  var decision = "decision";
  var action = "action";

  var table = document.getElementById("dtTable");

  var rowsCount = $( "#condition tr" ).length;
  var colsCount = $( "#condition tr td" ).length;

  console.log("condition rowsCount : " + rowsCount);
  console.log("colsCount : " + colsCount);
  console.log("first cell: " + table.rows[1].cells[1].innerHTML);

  if (rowsCount == 1) {
    jsonArray += '"' + table.rows[1].cells[1].innerHTML + '"'; 
  }
  else {
    for (var i=1; i<rowsCount; i++) {
      jsonArray += '"' + table.rows[i].cells[1].innerHTML + '"'; 

      if (i != rowsCount - 1) {
          jsonArray += ',';
      }
    }
  }
  

  jsonArray += '], "actions" : [';

  //rowsCount = $( "#dtTable tr" ).length - $( "#condition tr" ).length;

  for (var i=rowsCount; i<$( "#dtTable tr" ).length; i++) {
      jsonArray += '"' + table.rows[i].cells[1].innerHTML + '"'; 

      if (i != rowsCount - 1) {
          jsonArray += ',';
      }
  }

  jsonArray += '],';

  jsonArray += '}]}';


// var text = '{"employees":[' +
// '{"firstName":"John","lastName":"Doe" },' +
// '{"firstName":"Anna","lastName":"Smith" },' +
// '{"firstName":"Peter","lastName":"Jones" }]}';

// console.log("decisionArr : " + decisionArr.length);
// console.log("actionArr : " + actionArr.length);

//   for (var j = 0; j < decisionArr.length; j++) {
//     jsonArray += '"' +decision + '":"' + decisionArr[j] + '",';
//   }

//   for (var k=0; k < actionArr.length; k++) {
//     jsonArray += '"' +action + '":"' + actionArr[k] + '"';

//     if (k != actionArr.length-1) {
//       jsonArray += ",";
//     }
//   }

 

  console.log("jsonArray : " + jsonArray);
}

 
  /**
   * Run the app.
   */
  init();

})();