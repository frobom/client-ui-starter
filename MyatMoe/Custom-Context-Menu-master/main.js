(function() {
  
  "use strict";  

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

  var row;
  var colCount = 1;
  var currentColumn;
  var headerText = 0;
  var html;

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
        row = $(this);                

        console.log("row : " + row.html());
        console.log("row : " + row);        
    });

    $('table').on('contextmenu', 'td', function(){
      currentColumn = $(this).parent().children().index($(this));
      console.log('currentColumn: ' + currentColumn);
      
      var text = $("#header").find('th').eq(currentColumn).text();      
      headerText = parseInt(text) || 0;
      
      console.log('Get Header text: ' + headerText);
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
    console.log("currentColumn " + currentColumn);

    toggleMenuOff();
    
    if (link.getAttribute("data-action").includes("Row")) {
      headerText = row.find("th").text();
      console.log("headerText : " + headerText);
    }        

    if (link.getAttribute("data-action") == "Add Row Above") {
      addNewRow("above", row);
    }
    else if (link.getAttribute("data-action") == "Add Row Below") {
      addNewRow("below", row);
    }
    else if (link.getAttribute("data-action") == "Add Column Left") {
      addColumn(currentColumn, 'before', headerText);
    }
    else if (link.getAttribute("data-action") == "Add Column Right") {
      addColumn(currentColumn, 'after', headerText);
    }    
  }

  function addNewRow( place, selectedRow ) {
    
    var nextRowIndex = 0;
    var r = null;    

    if (place == "above") {

      prepareHtmlToInsertRow(headerText);            

      $(html).insertBefore(selectedRow);

      selectedRow.find("th").text(++headerText);

      r = selectedRow.next();        
          
     }

   else {

      prepareHtmlToInsertRow(++headerText);      

      $(html).insertAfter(selectedRow);

      r = selectedRow.next().next();           
    }

   nextRowIndex = r.index();

   while (nextRowIndex != -1) {
      r.find("th").text(++headerText);
      r = r.next();
      nextRowIndex = r.index();
    }

    console.log("html : " + html);

    console.log("==================");
  }

  function prepareHtmlToInsertRow( headerText ) {    
    var table = document.getElementById("dtTable");

    html = "<tr class='task'> <th>" + headerText + "</th>";

    for (var i = 1; i < table.rows[0].cells.length; i++) {
      html += "<td class='task'> <input type='text'> </td>";      
    }

    html += "</tr>";
  }

  // function addColumn() {
  //   console.log("new Column number : " + ++colCount);
  //   $("tr:first").append("<th>" + colCount + "</th>");
  //   $("tr:not(:first)").append("<td class='task'> <input type='text'> </td>");
  // }

function addColumn(currentColumn,afterOrBefore,headerText) {

  var insertedHeader;
  var colIndex = currentColumn - 1;

  if (afterOrBefore=='before') {
    insertedHeader = addNewColumnHeader(afterOrBefore, currentColumn, headerText++, insertedHeader);
  }
  else {
    insertedHeader = addNewColumnHeader(afterOrBefore, currentColumn, ++headerText, insertedHeader);
  }     
  //alert("insertedHeader : " + insertedHeader.html());

  alert("headerText in addNewColumnHeader : " + headerText);   

  if (insertedHeader.next().index() != -1) {
    updateOtherColumnHeader(insertedHeader, headerText);   
  }

  addCells(colIndex, afterOrBefore);
}

function addNewColumnHeader(afterOrBefore, currentColumn, headerText, insertedHeader) {
  var header = $('table tr:first th');
  
  if (afterOrBefore=='before') {
    
    $('<th>' + headerText +'</th>').insertBefore($(header[currentColumn]));
    $(header[currentColumn]).text(++headerText);
    return $(header[currentColumn]);      
  }
  else {

    alert("headerText in addNewColumnHeader : " + headerText);
    $('<th>' + headerText +'</th>').insertAfter($(header[currentColumn]));
    return $(header[currentColumn]).next();
  }
}

function updateOtherColumnHeader(insertedHeader, headerText) {
  var nextColHeader = insertedHeader.next();     

  while (nextColHeader.index() != -1) {
    alert("index of nextColHeader(old colum) : " + nextColHeader.index());
    nextColHeader.text(++headerText);
    alert("headerText for old column : " + headerText);
    //alert("nextColHeader: " + nextColHeader.html());
    nextColHeader = nextColHeader.next();
  }
}

function addCells(colIndex, afterOrBefore) {

  var allRows=$('table').find('tr');
    $.each(allRows,function(index,value){
          //alert("value : " + value);
          var cells = $(value).find('td');
          if(afterOrBefore=='before')
            {
              $('<td><input type="text"></td>').insertBefore($(cells[colIndex]));
            }
           else
             {
                $('<td><input type="text"></td>').insertAfter($(cells[colIndex]));
              }
              //$(element).on('click', function () { add_img(); });
    });
}

function createJsonObject() {

var json = {
  conditions : [],
  actions : [],
  rules :[]  
}; 

var table = document.getElementById("dtTable");
var colIndex = 1;
var conditionRowsCount = $( "#condition tr" ).length;

addConditions(json, colIndex, conditionRowsCount, table);

addActions(json, colIndex, conditionRowsCount+1, table);

colIndex++;

addRules(json, colIndex, conditionRowsCount, table);

console.log("json : " + JSON.stringify(json));

}

function addConditions(json, colIndex, conditionRowsCount, table) {
  console.log("conditionRowsCount : " + conditionRowsCount);

  for (var i = 1; i <= conditionRowsCount; i++) {

    json.conditions.push(table.rows[i].cells[colIndex].children[0].value);
   
  }
}

function addActions(json, colIndex, startIndex, table) {
  var totalRowsCount = $( "#dtTable tr" ).length;

  for (var i = startIndex; i < totalRowsCount; i++) {

      json.actions.push(table.rows[i].cells[colIndex].children[0].value);      
  }
}

function addRules(json, colIndex, conditionRowsCount, table){
  var colsCount = table.rows[0].cells.length;
console.log("colsCount : " + colsCount);

for (colIndex; colIndex < colsCount; colIndex++) {

     var rule = {
      rule : []
     };

     var conditions = {
        conditions : []
     };

     var actions = {
        actions : []
     };

    for (var i = 1; i <= conditionRowsCount; i++) {
      conditions.conditions.push(table.rows[i].cells[colIndex].children[0].value);        
    }    

    for (var i = conditionRowsCount+1; i < $( "#dtTable tr" ).length; i++) {

      actions.actions.push(table.rows[i].cells[colIndex].children[0].value);
    }

    rule.rule.push(conditions);
    rule.rule.push(actions);
    json.rules.push(rule);
    //console.log(JSON.stringify(rule));
  }
}
 
  /**
   * Run the app.
   */
  init();

})();