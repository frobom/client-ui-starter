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
