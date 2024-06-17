$(document).ready(function(){            
	// 옵션추가 버튼 클릭시            
	$("#addItemBtn").click(function(){
		var cnt = $("input[name='sub_menu']").length;
		if(cnt < 10){
			// item 의 최대번호 구하기                
			var lastItemNo = $("#example tr:last").attr("class").replace("item", "");
			var newitem = $("#example tr:eq(1)").clone();                
			newitem.removeClass();                
			newitem.find("td:eq(0)").attr("rowspan", "1");                
			newitem.addClass("item"+(parseInt(lastItemNo)+1));                 
			$("#example").append(newitem);            
			
			// 초기화
			$("input[name='main_menu']").last().val('');
			$("input[name='sub_menu']").last().val('');
			
			// 히든값 부여
			var trCnt = $("#example tr").length - 1;
			$("input[name='depth']").last().val(trCnt);
			$("input[name='sub_depth']").last().val(trCnt);
			
			var point_cnt = $("#example tr:last input[name='point']").length; 
			for(var j = 0; j < point_cnt; j++){
				 $("#example tr:last input[name='point']:eq(" + j + ")").val('');
			}
		} else if(cnt >= 10) {
			alert("더 이상 추가 하실 수 없습니다.");
			return false;
		}
	});              
	
	// 소 항목추가 버튼 클릭시            
	$(".addBtn").live("click", function(){
		var cnt = $("input[name='sub_menu']").length;
		if(cnt < 10){
			var clickedRow = $(this).parent().parent();     
			var cls = clickedRow.attr("class");
			
			// tr 복사해서 마지막에 추가               
			var newrow = clickedRow.clone();    
			newrow.find("td:eq(0)").remove();
			newrow.insertAfter($("#example ."+cls+":last"));                 
			
			// rowspan 조정                
			resizeRowspan(cls);  
			
			// 초기화
			$("input[name='main_menu']").last().val('');
			$("input[name='sub_menu']").last().val('');
			var point_cnt = $("#example tr:last input[name='point']").length; 
			for(var j = 0; j < point_cnt; j++){
				 $("#example tr:last input[name='point']:eq(" + j + ")").val('');
			}
		} else if(cnt >= 10) {
			alert("더 이상 추가 하실 수 없습니다.");
			return false;
		}
	});                                      
	
	// 삭제버튼 클릭시            
	$(".delBtn").live("click", function(){         
		var clickedRow = $(this).parent().parent().parent();                
		var cls = clickedRow.attr("class");               
		
		// 각 항목의 첫번째 row를 삭제한 경우 다음 row에 td 하나를 추가해 준다.  
		if( clickedRow.find("td:eq(0)").attr("rowspan") ){                    
			if( clickedRow.next().hasClass(cls) ){                        
				clickedRow.next().prepend(clickedRow.find("td:eq(0)"));                    
			}                
		} 
		
		clickedRow.remove();                 
		
		// rowspan 조정                
		resizeRowspan(cls);  
	});             
	
	// cls : rowspan 을 조정할 class ex) item1, item2, ...            
	
	function resizeRowspan(cls){                
		var rowspan = $("."+cls).length;                
		$("."+cls+":first td:eq(0)").attr("rowspan", rowspan);            
	}       
});   