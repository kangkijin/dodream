	// 리플 저장
function memo_save(url, no, name) {
	if($("#memo").val() == ''){
		$("#memo").focus();
		alert("내용을 입력해 주세요.");
		return false;
	}
	if(confirm("저장 하시겠습니까?")) {
		// textarea에있는 내용
		var memo = $("#memo").val();
		$.ajax({
			url : url,
			type : "post",
			data : "memo=" + memo + "&no=" + no,
			dataType : "json",
			success : function(data) {
				if(data.no > 0){
					var setText = "";
					setText += '<ul class="' + data.no +'">';
					setText += '<li>';
					setText += '<p class="mb_15 re_top"><strong>' + name +'</strong><span class="re_date">' + data.reg_date +'</span><span class="re_hour">' + data.reg_time + '';
					setText += '<a href="javascript:;" onclick="delReply(\'/freeboard/delMemo.do\', \'' + data.no + '\', \'' + $("#no").val() +'\', event)">삭제</a></span>';
					
					
					setText += '<p>' + $("#memo").val().replace(/\n/gi,"<br />") +'</p>';
					setText += '</li>';
					setText += '</ul>';
					if($(".re_list ul").length > 0){
						$(".re_list ul:last").append(setText);
					} else if ($(".re_list ul").length == 0){
						$(".re_list").append(setText);
					}
					$("#reply_cnt").html(parseInt($("#reply_cnt").html()) + 1);
					$("#memo").val('');
				} else {
					alert("저장 중 오류가 발생하였습니다.");
				}
			}, error : function() {
				alert('서버와의 연결이 불안정 합니다.');
			}
		});
	}
}


function fileDown(file_name, file_size){
	$("#file_name").val(file_name);
	$("#file_size").val(file_size);
	$("#mainForm").attr("action","${pageContext.request.contextPath}/communityManage/fileDown.do");
	$("#mainForm").submit();
}

// 리플내용 임시저장할 변수
var textAsis = "";

// 리플수정 클릭시
function modifyReply(no, e){
	var rowIdx = getRowIndex(e);
	var tempText = "";
	
	for(var p = 0; p < $("#replyTable tr").length; p++){
		if(p != rowIdx){
			tempText = $("#replyTable tr:eq(" + p +") .rpl").html();
			$("#replyTable tr:eq(" + p + ") .rpl textarea").remove();
			$("#replyTable tr:eq(" + p + ") .rpl").html(tempText);
			$("#replyTable tr:eq(" + p + ") .rpl input:button").css("display", "");
		}
	}
	
	textAsis = $("#replyTable tr:eq(" + rowIdx + ") .rpl").html();
	
	$("#replyTable tr:eq(" + rowIdx + ") td input:button").css("display", "none");
	
	var setText = "";
	setText += '<textarea style="height:70px" name="modifyReply">' + $("#replyTable tr:eq(" + rowIdx + ") .rpl").html().replace(/<BR>/g, "\n") + '</textarea>';
	setText += '<input type="hidden" name="replyNo" value=' + no +' />';
	setText += '<span style="float:right">';
	setText += '<input type="button" class="button_medium" value="수정" onclick="updateReply(event)" />';
	setText += '<input type="button" class="button_large" value="수정취소" onclick="cancleModify(event)" />';
	setText += '</span>';
	$("#replyTable tr:eq(" + rowIdx + ") .rpl").html(setText);
}


//리플수정 후 저장시
function updateReply(e){
	var rowIdx = getRowIndex(e);
	
	if($("#replyTable tr:eq(" + rowIdx + ") textarea[name='modifyReply']").val() == ''){
		alert("내용을 입력해 주세요.");
		return false;
	}
	if(confirm("수정 하시겠습니까?")) {
		// textarea에있는 내용
		var memo = $("#replyTable tr:eq(" + rowIdx + ") textarea[name='modifyReply']").val();
		$.ajax({
			url : "${pageContext.request.contextPath}/communityManage/updateMemo.do",
			type : "post",
			data : "memo=" + memo + "&no=" + $("#replyTable tr:eq(" + rowIdx + ") input[name='replyNo']").val(),
			dataType : "text",
			success : function(data) {
				if(data > 0){
					
					$("#replyTable tr:eq(" + rowIdx + ") .rpl").html(memo.replace(/\n/gi,"<br />"));
					$("#replyTable tr:eq(" + rowIdx + ") td input:button").css("display", "");
					
				} else {
					alert("저장 중 오류가 발생하였습니다.");
				}
			}, error : function() {
				alert('서버와의 연결이 불안정 합니다.');
			}
		});
	}
	cancleModify(e);
}


// 리플 수정 후 수정취소 클릭시
function cancleModify(e){
	var oTbl = document.getElementById("replyTable");
	var rowIdx = getRowIndex(e);
	

	$("#replyTable tr:eq(" + rowIdx + ") .rpl").html('');
	$("#replyTable tr:eq(" + rowIdx + ") .rpl").html(textAsis);
	$("#replyTable tr:eq(" + rowIdx + ") td input:button").css("display", "");
}

function getRowIndex(e) {
	 if(!e) var e = window.event;

	 var target = e.target || e.srcElement;
	 while(target.tagName != 'UL' && target.tagName != 'BODY') {
	  target = target.parentNode;
	 }
	 return target.rowIndex;
}

// 리플 삭제시
function delReply(url, no, pno, e){
	if(confirm("삭제 하시겠습니까?")){
		$.ajax({
			url : url,
			type : "post",
			data : "no=" + no + "&pno=" + pno,
			dataType : "text",
			success : function(data) {
				if(data > 0){
					$("." + no).remove();
					$("#reply_cnt").html(parseInt($("#reply_cnt").html()) - 1);
				} else {
					alert("삭제 중 오류가 발생하였습니다.");
				}
			}, error : function() {
				alert('서버와의 연결이 불안정 합니다.');
			}
		});
	}
}
