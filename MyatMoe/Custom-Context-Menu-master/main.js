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
  var text;
  var colCount = 1;
  var currentColumn;

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
        //contextListener();
        //alert($(this).attr('id'));
        row = $(this);        

        console.log("row : " + row.html());
        console.log("row : " + row);        
    });

    $('#dtTable').on('contextmenu', 'td', function(){
      currentColumn = $(this).parent().children().index($(this));
      text = $(this).parent().children(currentColumn).text();
      alert('Column: ' + currentColumn);
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
    
    
    text = row.find("th").text();
    console.log("text : " + text);    

    if (link.getAttribute("data-action") == "Add Row Above") {
      addNewRow("above", row);
    }
    else if (link.getAttribute("data-action") == "Add Row Below") {
      addNewRow("below", row);
    }
    else if (link.getAttribute("data-action") == "Add Column Left") {
      addColumn(currentColumn, 'before');
    }
    else if (link.getAttribute("data-action") == "Add Column Right") {
      addColumn(currentColumn, 'after');
    }
    toggleMenuOff();
  }


  function addNewRow( place, selectedRow ) {
    console.log("row in addNewRow : " + selectedRow);
    //console.log("selectedRow html: " + selectedRow.html());
    var table = document.getElementById("dtTable");

    var html;    

    if (place == "above") {

      html = "<tr class='task'> <th>" + text + "</th>";

      for (var i = 1; i < table.rows[0].cells.length; i++) {
        html += "<td class='task'> <input type='text'> </td>";      
      }
 
      html += "</tr>";      

      $(html).insertBefore(selectedRow);

      selectedRow.find("th").text(++text);
      
      var nextRowIndex = selectedRow.next().index();
      //alert("index of next row of selectedRow : " + nextRowIndex);

      var r = selectedRow.next();

      while (nextRowIndex != -1) { 

        r.find("th").text(++text);
        r = r.next();
        nextRowIndex = r.index();
      }
          
     }

   else {
      html = "<tr class='task'> <th>" + (++text) + "</th>";

      for (var i = 1; i < table.rows[0].cells.length; i++) {
        html += "<td> <input type='text'> </td>";      
      }

      html += "</tr>";

      $(html).insertAfter(row);
   }

     console.log("html : " + html);

    console.log("==================");
  }


  // function addColumn() {
  //   console.log("new Column number : " + ++colCount);
  //   $("tr:first").append("<th>" + colCount + "</th>");
  //   $("tr:not(:first)").append("<td class='task'> <input type='text'> </td>");
  // }

function addColumn(currentColumn,afterOrBefore)
{
  // var headerRow = $('table tr:first th:nth-child(' + currentColumn+ ')');
  // alert("header : " + headerRow.html());

  //var header = "$(th:nth-child(" +currentColumn+ ")";
  var header = $('table tr:first th:nth-child(' + currentColumn+ ')');
  alert("header : " + header.html());
  
  if (afterOrBefore=='before') {
    alert("before");
    //alert("$(headerRow[currentColumn]) : " + $(header).html());
    $('<th>' + --text +'</th>').insertBefore($(header));
  }

  currentColumn--;
   var allRows=$('table').find('tr');
    $.each(allRows,function(index,value){
          alert("value : " + value);
          var cells = $(value).find('td');
          var header = $(value).find('th');
          if(afterOrBefore=='before')
            {
              $('<td><input type="text"></td>').insertBefore($(cells[currentColumn]));
            }
           else
             {
                $('<td><input type="text"></td>').insertAfter($(cells[currentColumn]));
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

  var conditionRowsCount = $( "#condition tr" ).length;
  var colIndex = 1;

  console.log("conditionRowsCount : " + conditionRowsCount);
  
  for (var i = 1; i <= conditionRowsCount; i++) {

    json.conditions.push(table.rows[i].cells[colIndex].children[0].value);
   
  }
  
  var totalRowsCount = $( "#dtTable tr" ).length;

  for (var i = conditionRowsCount+1; i < totalRowsCount; i++) {

      json.actions.push(table.rows[i].cells[colIndex].children[0].value);
      
  }

  var colsCount = table.rows[0].cells.length;
  console.log("colsCount : " + colsCount);
 
  colIndex++;

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

      console.log(JSON.stringify(rule));

  }
  console.log("json : " + JSON.stringify(json));
}
 
  /**
   * Run the app.
   */
  init();

})();