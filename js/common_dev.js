function number_check(){
    var txt  = window.event.keyCode;
	var keychar = String.fromCharCode(txt);
	//delete, enter, tab등 특수키 입력가능
    if(event.shiftKey){  
        window.event.returnValue = false;
    }else if((txt == 8)|| (txt == 9)||(txt == 13)||(txt == 37)||(txt == 39)||(txt == 46)||(txt == 116)){
    	window.event.returnValue = true;
    }else if((("0123456789").indexOf(keychar) >-1)){
        window.event.returnValue = true;
    }else if((txt >= 96)&& (txt <= 105)){
    	window.event.returnValue = true;
    }else{window.event.returnValue = false;}
}

function goPopup(url, w, h,ScrollbarsYn){
	if (ScrollbarsYn=='Y'){
		ScrollbarsYn="yes";
	} else {
		ScrollbarsYn="no";
	}
	var x = (screen.availWidth - w) / 2;
	var y = (screen.availHeight - h) / 2;
	var win = window.open(url, 'pop','width='+w+', height='+h+', left='+x+', top='+y+',scrollbars=yes');
	win.focus();
	
}