(function() {
  
  "use strict";

  

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

  /**
   * Initialise our application's code.
   */
  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();

    $("button").click(function(){
        //alert("The button was clicked.");
        createJsonObject();
    });

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

        text = document.getElementById(rowId).getElementsByTagName("td")[0].innerHTML;

        console.log("rowId: " + rowId);
        console.log("row : " + row);
        console.log("text : " + text);
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
    if (link.getAttribute("data-action") == "Add Row Above") {
      addNewRow("above");
    }
    else if (link.getAttribute("data-action") == "Add Row Below") {
      addNewRow("below");
    }
    toggleMenuOff();
  }


  function addNewRow( place ) {
    var table = document.getElementById("dtTable");

    var html = "<tr id='" + id + "'> <td class='task'>" + text + "</td>";
    id++;

    for (var i = 1; i < table.rows[0].cells.length; i++) {
      html += "<td class='task'>";

      if (i != table.rows[0].cells.length-1) {        
       html += "<input type='text'>";
      }

      html += "</td>";
    }

     html += "</tr>";

     console.log("html : " + html);

     if (place == "above") {
      $(html).insertBefore(row);
     }
    
    else {
      $(html).insertAfter(row);
    }

    console.log("==================");
  }

  function createJsonObject() {  
 
  var decisionArr = [];
  var actionArr = [];

  var rowsCount = document.getElementById("dtTable").rows.length;

  var decIndex = 0;
  var actIndex = 0;  

  for (var row = 1; row < rowsCount; row++) { 

      var cellsCount = document.getElementById("dtTable").rows[row].cells.length;      

      if (document.getElementById("dtTable").rows[row].cells[0].innerHTML == "Decision") {
        
           
              decisionArr[decIndex++] = document.getElementById("dtTable").rows[row].cells[1].children[0].value;
          
      }

      else {
            
              actionArr[actIndex++] = document.getElementById("dtTable").rows[row].cells[1].children[0].value;
              //alert(tbl.rows[rCount - 1].cells[0].getElementsByTagName("input")[0].value);
          
      }   
  }

  var jsonArray = '{"rulelist": [{';
  var decision = "decision";
  var action = "action";
// var text = '{"employees":[' +
// '{"firstName":"John","lastName":"Doe" },' +
// '{"firstName":"Anna","lastName":"Smith" },' +
// '{"firstName":"Peter","lastName":"Jones" }]}';

console.log("decisionArr : " + decisionArr.length);
console.log("actionArr : " + actionArr.length);

  for (var j = 0; j < decisionArr.length; j++) {
    jsonArray += '"' +decision + '":"' + decisionArr[j] + '",';
  }

  for (var k=0; k < actionArr.length; k++) {
    jsonArray += '"' +action + '":"' + actionArr[k] + '"';

    if (k != actionArr.length-1) {
      jsonArray += ",";
    }
  }

  jsonArray += '}]}'; 


// var count;

// if (decisionArr.length > actionArr.length) {
//   count = decisionArr.length;
// }
// else {
//   count = actionArr.length;
// } 

//   for (var i = 0; i < count; i++) {

//     if (i < decisionArr.length && i < actionArr.length) {
//        jsonArray += '{"' + decision + '":"' + decisionArr[i] + '","' + action + '":"' + actionArr[i] + '" }';
//     }

//     if (i < actionArr.length) {
//       jsonArray += '{"' + action + '":"' + actionArr[i] + '" }';
//     }

//     if (i < decisionArr.length) {
//       jsonArray += '{"' + decision + '":"' + decisionArr[i] + '" }';
//     }   

//     if ((i != actionArr.length-1) || (i != decisionArr.length-1)) {
//       jsonArray += ",";
//     }
//   }

//   jsonArray += ']}';

  console.log("jsonArray : " + jsonArray);
}

 
  /**
   * Run the app.
   */
  init();

})();