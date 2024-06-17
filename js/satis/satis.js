
/*
 * 만족도 조사 기능 시작
 */
function fnSatisOnOffAjax(satRschType, obj, scaleQusArry, openQusArry, choiceQusArry, choiceAnsQusArry) {
	
	
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath+"/cmm/fms/getSatRschListAjax.do";
	var _val = obj.value;
	var _id = obj.id;
	var _name = obj.name;
	console.log("_name = "+ _name );
	console.log("_id = "+ _id );
	console.log("_val = "+ _val );
	console.log("choiceAnsQusArry = "+ choiceAnsQusArry );
	console.log("scaleQusArry = "+ scaleQusArry );
	chkHtmlTr = $("#"+satRschType+"SatRschTr").html();
	
	if(_val == 'Y') {
		if(typeof chkHtmlTr != "undefined") {
			return false;
		}
		// 만족도 폼 추가할 위치
		var _obj = $("#"+_id).parent("p").parent("td").parent("tr").parent("tbody");
		// 만족도 폼 ajax
		$.ajax({
			url : _url
			, type : "POST"
			, async : false
			, dataType : "html"
			, data : {
				satRschType   : satRschType
			   ,scaleQus      : scaleQusArry
			   ,openQus       : openQusArry
			   ,choiceQus     : choiceQusArry
			   ,choiceAnsQus     : choiceAnsQusArry
			}
			, success : function(res) {
				_obj.append(res);
			}
		});
	// 만족도 미사용 선택
	} else {
		// 만족도 테이블 삭제되어애함
		if( confirm("미사용으로 하시면 입력하신 문항내용이 모두 지워집니다. 미사용으로 변경하시겠습니까?") ) {
			$("#"+satRschType+"SatRschTr").remove();
		}else {
			$("input[name="+_name+"][value=Y]").prop("checked", true);
		}
	}
}


// 만족도 기능들
// 질문 추가, 삭제, 순위 변경에 따른 질문 order 순서변경
function qusNumbering(type) {
	if( type == "pre" ) { // 기업 만족도 이면
		$("#preSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	} else if(type == "peer") {// 동료평가 이면
		$("#peerSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	}else{// 만족도 이면
		$("#stdSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	}
}
/* 만족도 조사 질문 항목 추가*/
function addQus(type) {
	var $tableTr = "";
	//만족도 조사 이면
	if( type == "std" ) {  
		$tableTr = $("#stdSatisTable");
		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt1' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
					+"</td>"
				+"<td class='td_input'>"
					+"<select class='ad_formstyle_s wd_p100' name='qusTypCd1' onchange='changeType(this, \"std\");'>"
						+"<option value='SCALE'>5점척도</option>"
						+"<option value='OPEN'>주관식</option>"
						+"<option value='CHOICE'>자유형객관식</option>"
					+"</select>"
					+"<div id='satisInfoDiv' class='satisInfoDiv'>"
						+"<input type='hidden' name='qusMultyYn1' value='N' />"
						+"<input type='hidden' name='qusFstScore1' value='1' />"
						+"<input type='hidden' name='qusPerScore1' value='1' />"
						+"<input type='hidden' name='qusAnsCount1' value='5' />"
						+"<input type='hidden' name='qusFixedYn1' value='N' />"
						+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='매우 아니다' />"
						+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='아니다' />"
						+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='보통이다' />"
						+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='그렇다' />"
						+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='매우 그렇다' />"
					+"<div>"
				+"</td>"
				+"<td class='td_input'>"
					+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeQus(this,\"std\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
				+"</td>"
				+"<td class='td_input'>"
					+"<a href='javascript:void(0);' onclick='moveUp(this, \"std\");' class='btn btn_sort' title='위로'><i class='fa fa-caret-up'></i></a>"
					+"<a href='javascript:void(0);' onclick='moveDw(this, \"std\");' class='btn btn_sort' title='아래로'><i class='fa fa-caret-down'></i></a>"
				+"</td>"
			+"</tr>");
	}

	
	
	// 기업 만족도 이면
	if( type == "pre" ) { 
		$tableTr = $("#preSatisTable");
		
		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt2' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
				+"</td>"
				+"<td class='td_input'>"
					+"<select class='ad_formstyle_s wd_p100' name='qusTypCd2' onchange='changeType(this, \"pre\");'>"
						+"<option value='SCALE'>5점척도</option>"
						+"<option value='OPEN'>주관식</option>"
						+"<option value='CHOICE'>자유형객관식</option>"
					+"</select>"
					+"<div id='satisInfoDiv' class='satisInfoDiv'>"
						+"<input type='hidden' name='qusMultyYn2' value='N' />"
						+"<input type='hidden' name='qusFstScore2' value='1' />"
						+"<input type='hidden' name='qusPerScore2' value='1' />"
						+"<input type='hidden' name='qusAnsCount2' value='5' />"
						+"<input type='hidden' name='qusFixedYn2' value='N' />"
						+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='매우 아니다' />"
						+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='아니다' />"
						+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='보통이다' />"
						+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='그렇다' />"
						+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='매우 그렇다' />"
					+"<div>"
				+"</td>"
				+"<td class='td_input'>"
					+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeQus(this, \"pre\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
				+"</td>"
				+"<td class='td_input'>"
					+"<a href='javascript:void(0);' onclick='moveUp(this, \"pre\");' class='btn btn_sort' title='위로'><i class='fa fa-caret-up'></i></a>"
					+"<a href='javascript:void(0);' onclick='moveDw(this, \"pre\");' class='btn btn_sort' title='아래로'><i class='fa fa-caret-down'></i></a>"
				+"</td>"
			+"</tr>");
	}
	
	//동료평가 이면
	if( type == "peer" ) {  
		alert(3);
		$tableTr = $("#peerSatisTable");
		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt3' title='질문 내용'>"
				+"</td>"
				+"<td class='td_input'>"
				+"<select class='ad_formstyle_s wd_p100' name='qusTypCd3' onchange='changeType(this, \"peer\" );' style='display: none;'>"
					+"<option value='OPEN'>주관식</option>"
				+"</select>"
				+"<div id='satisInfoDiv' class='satisInfoDiv'>"
					+"<input type='hidden' name='qusMultyYn3' value='N' />"
					+"<input type='hidden' name='qusFstScore3' value='1' />"
					+"<input type='hidden' name='qusPerScore3' value='1' />"
					+"<input type='hidden' name='qusAnsCount3' value='5' />"
					+"<input type='hidden' name='qusFixedYn3' value='N' />"
					+"<input type='hidden' name='ansConts3' class='ad_formstyle wd_p15' value='주관식 답변' />"
				+"</div>"
				+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeQus(this, \"peer\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
			+"</tr>");
	}
	
	// 질문 넘버링
	qusNumbering(type);
}

// 질문유형변경_만족도
function changeType(obj, type) 

{
	var _val = $(obj).val();
	var $tableTd = $(obj).parent("td");
	
	if( type == "std" ) {
		// 5점척도 일때
		if(_val == "SCALE") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt1' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
					+"<input type='hidden' name='qusFstScore1' value='1' />"
					+"<input type='hidden' name='qusPerScore1' value='1' />"
					+"<input type='hidden' name='qusAnsCount1' value='5' />"
					+"<input type='hidden' name='qusFixedYn1' value='N' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='매우 아니다' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='아니다' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='보통이다' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='그렇다' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='매우 그렇다' />");

		// 주관실 일때
		} else if(_val == "OPEN") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt1' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' onkeyup='fnKeyUpCommaChk(this);'/>"
					+"<input type='hidden' name='qusFstScore1' value='1' />"
					+"<input type='hidden' name='qusPerScore1' value='1' />"
					+"<input type='hidden' name='qusAnsCount1' value='1' />"
					+"<input type='hidden' name='qusFixedYn1' value='N' />"
					+"<input type='hidden' name='ansConts1' class='ad_formstyle wd_p15' value='주관식 답변' />");

		// 자유형 객관식 일때
		} else if(_val == "CHOICE") {
			// var _row = $("#satisTable tr .qusNum").length;
			var _row = $tableTd.prev().prev().text();

			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt1' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
					+"<div class='ta_l mg_t5'>"
						+"<p class='ad_section_stit'>"
							+"<span class='stit_bullet'></span>자유형 객관식 답변 작성"
						+"</p>"
						+"<div class='ad_btn_area1'>"
							+"<p class='ad_survey_list'>"
								+"<input name='qusMultyYnChk1' class='check' id='qusMultyYnChk"+_row+"' type='checkbox' onclick='qusMultyYnClick(this);'>"
								+"<label class='check_label check_black' for='qusMultyYnChk"+_row+"'>다중 선택 허용</label>"
							+"</p>"
							+"<button type='button' class='btn btn_xs btn_deepblue' onclick='addAns(this, \"std\");'><i class='fa fa-plus'></i>답변추가</button>"
						+"</div>"
						+"<ul>"
							+"<li class='ta_l mg_t5'>"
								+"<input type='text' class='ad_formstyle_s wd_p94' name='ansConts1' title='답변 내용' onkeyup='fnKeyUpCommaChk(this);'>"
								+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeAns(this, \"std\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
							+"</li>"
						+"</ul>"
					+"</div>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' onkeyup='fnKeyUpCommaChk(this);'/>"
					+"<input type='hidden' name='qusFstScore1' value='1' />"
					+"<input type='hidden' name='qusPerScore1' value='1' />"
					+"<input type='hidden' name='qusAnsCount1' value='1' />"
					+"<input type='hidden' name='qusFixedYn1' value='N' />");
		}
	}
	
	// 기업만족도 일때
	if( type == "pre" ) {
		// 5점척도 일때
		if(_val == "SCALE") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt2' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn2' value='N' />"
					+"<input type='hidden' name='qusFstScore2' value='1' />"
					+"<input type='hidden' name='qusPerScore2' value='1' />"
					+"<input type='hidden' name='qusAnsCount2' value='5' />"
					+"<input type='hidden' name='qusFixedYn2' value='N' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='매우 아니다' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='아니다' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='보통이다' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='그렇다' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='매우 그렇다' />");

		// 주관실 일때
		} else if(_val == "OPEN") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt2' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn2' value='N' />"
					+"<input type='hidden' name='qusFstScore2' value='1' />"
					+"<input type='hidden' name='qusPerScore2' value='1' />"
					+"<input type='hidden' name='qusAnsCount2' value='1' />"
					+"<input type='hidden' name='qusFixedYn2' value='N' />"
					+"<input type='hidden' name='ansConts2' class='ad_formstyle wd_p15' value='주관식 답변' />");

		// 자유형 객관식 일때
		} else if(_val == "CHOICE") {
			// var _row = $("#satisTable tr .qusNum").length;
			var _row = $tableTd.prev().prev().text();

			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='ad_formstyle_s wd_p100' name='qusTxt2' title='질문 내용'>"
					+"<div class='ta_l mg_t5'>"
						+"<p class='ad_section_stit'>"
							+"<span class='stit_bullet'></span>자유형 객관식 답변 작성"
						+"</p>"
						+"<div class='ad_btn_area1'>"
							+"<p class='ad_survey_list'>"
								+"<input name='qusMultyYnChk2' class='check' id='qusMultyYnChk"+_row+"' type='checkbox' onclick='qusMultyYnClick(this, \"pre\");'>"
								+"<label class='check_label check_black' for='qusMultyYnChk"+_row+"'>다중 선택 허용</label>"
							+"</p>"
							+"<button type='button' class='btn btn_xs btn_deepblue' onclick='addAns(this, \"pre\");'><i class='fa fa-plus'></i>답변추가</button>"
						+"</div>"
						+"<ul>"
							+"<li class='ta_l mg_t5'>"
								+"<input type='text' class='ad_formstyle_s wd_p94' name='ansConts2' title='답변 내용'>"
								+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeAns(this, \"pre\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
							+"</li>"
						+"</ul>"
					+"</div>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='qusMultyYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='qusMultyYn2' value='N' />"
					+"<input type='hidden' name='qusFstScore2' value='1' />"
					+"<input type='hidden' name='qusPerScore2' value='1' />"
					+"<input type='hidden' name='qusAnsCount2' value='1' />"
					+"<input type='hidden' name='qusFixedYn2' value='N' />");
		}
	}
	
}

// 질문 삭제 버튼
function removeQus(obj, type) {
	// 만족도 일때
	if(type == "std") {
		// 고정 질문이 있으므로 질문은 다 지워져도 된다
		$(obj).parent("td").parent("tr").remove();
	}
	if(type == "pre") {
		// 첫 질문이라면 삭제 불가
		// 첫질문이 아니라면
		if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
			// 질문삭제
			$(obj).parent("td").parent("tr").remove();
		} else {
			alert("첫 질문은 삭제할 수 없습니다.");
		}
	}
	
	if(type == "peer") {
		if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
			// 질문삭제
			$(obj).parent("td").parent("tr").remove();
		} else {
			alert("첫 문항은 삭제할 수 없습니다.");
		}
	}
	
	

	// 질문 넘버링
	qusNumbering(type);
}


// 질문 순서번경 올리기 버튼
function moveUp(obj, type) {
	// tr 가져오기
	var $qusTr = $(obj).parent("td").parent("tr");
	//만족도 일때
	if(type == "std" || type == "peer") {
		// 고정 만족도를 제외하고 수정되어야 한다
		// 위에 글이 고정 만족도가 아니면 수정
		if( $qusTr.prev().find("input[name=qusFixedYn1]").val() == "N" ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	} 
	
	//사전만족도 일때
	if(type == "pre" ) {
		// 첫 질문이라면 순서변경 불가
		// 첫 질문이 아니라면
		if( $qusTr.prev().html() !== undefined ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	}
	
	//동료평가 일때
	if(type == "peer") {
		// 고정 만족도를 제외하고 수정되어야 한다
		// 위에 글이 고정 만족도가 아니면 수정
		if( $qusTr.prev().find("input[name=qusFixedYn3]").val() == "N" ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	} 
}

// 질문 순서변경 내리기 버튼
function moveDw(obj, type) {
	// tr 가져오기
	var $qusTr = $(obj).parent("td").parent("tr");
	// 마지막 질문이면 내릴수 없음
	// 마지막 질문이라면
	if( $qusTr.next().html() !== undefined  ) {
		// tr 내리기
		$qusTr.next().after($qusTr);
		// 질문 넘버링
		qusNumbering(type);
	} else {
		alert("마지막 질문이여서 순서를 변경할 수 없습니다.");
	}

}

// 자유형 객관식 답변 추가
function addAns(obj, type) {
	if(type == "std") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=ansConts1]").length  == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}

		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='ad_formstyle_s wd_p94' name='ansConts1' title='답변 내용'>"
				+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeAns(this, \"std\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount1]").val( $(obj).parent("div").next().find("li").length );

	}
	
	if(type == "pre") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=ansConts2]").length == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}
		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='ad_formstyle_s wd_p94' name='ansConts2' title='답변 내용'>"
				+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeAns(this, \"pre\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount2]").val( $(obj).parent("div").next().find("li").length );
	}

	if(type == "peer") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=ansConts1]").length  == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}

		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='ad_formstyle_s wd_p94' name='ansConts1' title='답변 내용'>"
				+"<button type='button' class='btn btn_sm btn_red wd_30' onclick='removeAns(this, \"peer\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount3]").val( $(obj).parent("div").next().find("li").length );

	}

}

// 자유형 객관식 답변 삭제
function removeAns(obj, type) {

	// 만족도 이면
	if(type == "std" || type == "peer") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount1]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	} 
	
	//사전만족도 이면
	if(type == "pre") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount2]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	}
	
	//동료평가 이면
	if(type == "peer") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusAnsCount3]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	}

}

// 자유형 객관식에서 다중선택 여부 체크했을때
function qusMultyYnClick(obj, type) {

	// 다중선택이 체크 되었을때
	if( $(obj).prop("checked") ) {
		// 만족도 일때
		if(type == 'std') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn1]").val("Y");
		}
		// 사전 만족도 이면
		if(type == 'pre') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn2]").val("Y");
		}
		// 동료평가 이면
		if(type == 'peer') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn3]").val("Y");
		}
		
	// 체크되지 않았을때
	} else {
		// 만족도 이면
		if(type == 'std') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn1]").val("N");
		}
		// 사전 만족도 이면
		if(type == 'pre') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn2]").val("N");
		}
		
		// 동료평가 이면
		if(type == 'pree') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=qusMultyYn3]").val("N");
		}
		
	}

}
/* 만족도 통계 팝업 */
satisByProgramPopup = function(_satisGrpSeq, _programTotalCnt, _programRequestStdCnt, _rschType, _chartYn){
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupDivId = "#layerPopup"; 
	var popupUrl = basePath+"/cmm/fms/satisfactionByProgramListPop.do"; 
	var popupParams = {
		 satisGrpSeq : _satisGrpSeq
		,programTotalCnt : _programTotalCnt
		,programRequestStdCnt : _programRequestStdCnt
		,rschType : _rschType
		,chartYn : _chartYn
	}; 

	loadPopup (popupDivId, popupUrl, popupParams);
}

/* 만족도 조사응답 팝업 */
goSatisRequstStdPop = function(_satisGrpSeq, _programCode, _requestUserSeq, _remarksA, _type){
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupDivId = "#layerPopup"; 
	var popupUrl = basePath+"/cmm/fms/getSatisRschRequstStdListPopUp.do"; 
	var popupParams = {
			        satisGrpSeq : _satisGrpSeq
		           ,programCode : _programCode
		           ,requestUserSeq : _requestUserSeq
		           ,remarksA : _remarksA
		           ,type : _type
	}; 			   
	loadPopup (popupDivId, popupUrl, popupParams);
}

/* 만족도 조사 통계그래프 */
function drawGraph(chartDataArry,chartTitleArry, divNm){
	var chartData = new Array();
	// 차트데이터 생성
	var graphColor = ['#D0F5A9','#A9BCF5','#0A9696','#FF8200', '#0000FF', '#AE5E1A', '#7A00FC', '#FF1493', '#28E7FF','#009933']

	for(var idx= 0; idx < chartDataArry.length; idx++  ){
		var chartArray = {
						  "graphColor": graphColor[idx]
						  ,"category": chartTitleArry[idx]
						  ,"data": chartDataArry[idx]
						  ,"title": chartTitleArry[idx]
		};
		chartData.push(chartArray);
	}
	
	// 각 그래프 객체 설정

	//X 축 기준값 설정
	var chart = new AmCharts.AmSerialChart();
	    chart.dataProvider = chartData;
		chart.categoryField = "category";
		chart.fontSize = 12;
		chart.fontFamily = "NanumGothic";

	//y 축 기준값 설정
	var valueAxis = new AmCharts.ValueAxis();
		valueAxis.autoGridCount = false;
		valueAxis.axisColor = "#000000";
		valueAxis.baseValue = 0;
		valueAxis.gridCount = 5;
		valueAxis.gridThickness = 1;

	// legend (명각) 객체
	var legend = new AmCharts.AmLegend();
		legend.enabled = true;
		legend.useGraphSettings = true;
		legend.align = "center";
		legend.markerSize = 9;
		legend.valueWidth = 45;
		legend.autoMargins = false;
		legend.marginLeft = 0;
		legend.marginRight = 0;
		legend.spacing = 0;
	
	var graph = new AmCharts.AmGraph();
		graph.balloonText = "[[title]]:[[value]]";
		graph.fillAlphas = 2;
		graph.id = "title";
		graph.titleField = "title";
		graph.type = "column";
		graph.fillColorsField = "graphColor";
		graph.lineColorField = "graphColor";
		graph.columnWidth = 0.7;
		graph.valueField = "data";

	chart.addGraph(graph);
//	chart.addLegend(legend);
	chart.addValueAxis(valueAxis);
	chart.dataProvider = chartData;
	// 차트 그리기
	chart.write(divNm);
}


