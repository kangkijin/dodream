/**
 * 2018.06.05.
 * 최초 생성.
 * by KMJ K
 */

/** 빈값 체크 */
$.fn.emptyCheck = function(type) {
	var value = $.trim(this.val() + "");
	var msg = "";
	if (!value) {

		//alert($(this).attr("title") + "을(를) 입력해야 합니다.");
		msg = $(this).attr("title") + "을(를) 입력해야 합니다.";
		if(type == 0) msg = $(this).attr("title") + "을(를) 선택해야 합니다.";

		alert(msg);
		// 20180621 문성훈 추가 페이지 포커스시 상단 헤드가 고정이어서 그부분에 커서가 포커스 되어서 보임
//		$(window).scrollTop($("input").offset().top - 100)
		$("html").scrollTop(0);

		if (type == 0) {
			$(this).select();
		} else {
			$(this).focus();
		}
		return false;
	}
	return true;
};

/*
 * 체크박스 전체 선택 fn
 */
fn_checkAll = function(obj, byName) {
	if ($(obj).is(":checked")) {
		$("input[name=" + byName + "]").prop("checked", true);
	} else {
		$("input[name=" + byName + "]").prop("checked", false);
	}
};

/*
 * 체크박스 체크 여부에 따라 대표 체크 박스 체크/해제 fn
 */
fn_checkbox = function(className, targetId) {
	var count = 0;

	$("." + className).each(function(idx) {
		if (!$(this).is(":checked")) count++;
	});

	if (count > 0) {
		$("#" + targetId).prop("checked", false);
	} else {
		$("#" + targetId).prop("checked", true);
	}
};

resetData = function(obj) {
	$(obj).siblings("input").val("");
};

$(document).on("click", ".resetBtn", function(e) {
	e.stopImmediatePropagation();
	resetData(this);
});

var rval = "";
var timer = null;
checker = function(obj, count, textlimitName) {
	if (rval != obj.value) {
		if (textlimitName && document.getElementById(textlimitName)) {
			document.getElementById(textlimitName).innerHTML = obj.value
					.bytes();
		}
		rval = obj.value;
	}
	if (obj.value.bytes() > count) {
		alert("최대 " + count + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
		obj.value = obj.value.cut(count, '');
		stopchecker();
	}
	if (textlimitName) {
		timer = setTimeout(function() {
			checker(obj, count, textlimitName);
		}, 10);
	} else {
		timer = setTimeout(function() {
			checker(obj, count);
		}, 10);
	}
};

stopchecker = function() {
	clearTimeout(timer);
};

String.prototype.bytes = function() {
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++)
		l += (str.charCodeAt(i) > 128) ? 2 : 1;

	return l;
};

String.prototype.cut = function(len, tail) {
	if (tail == null) {
		tail = '...';
	}
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len)
			return str.substring(0, i) + tail;
	}
	return str;
};

// contents를 load후 팝업
loadPopup = function(popupDivId, popupUrl, popupParams, size) {
	if (popupUrl != null) {
		// 해당 영역을 지우고 ajax load를 이용하여 컨텐츠를 로딩한다.
		$(popupDivId).empty();
		$('#size').removeClass();
		if(size == 'L'){
			$('#size').addClass('modal-dialog modal-lg')
		}else if(size == 'XL'){
			$('#size').addClass('modal-dialog modal-xl')
		}else if(size == 'SM'){
			$('#size').addClass('modal-dialog modal-sm')
		}else if(size == 'XS'){
			$('#size').addClass('modal-dialog modal-xs')
		}else{
			$('#size').addClass('modal-dialog modal-lg')
		}
		$(popupDivId).load(popupUrl, popupParams, function() {
		});
	}
};

// 팝업 닫기
closePopup = function() {
	$('#COMMON_POP_UP_CLOSE_BTN').trigger('click');
};
// 숫자만 입력 가능
fn_numberOnly = function($obj) {
	$obj.keyup(function(event) {
		if (event.which && (event.which <= 47 || event.which >= 58)
				&& event.which != 8) {
			event.preventDefault();
		}
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
	});
};

// ajax 공통 셋팅 ERROR 메시지
$.ajaxSetup({
	error : function(req, status, error) {
		$("#loading").hide();
		console.log("### code : " + req.status + "\n### error : " + error);
		if(req.status == 500) {
			alert("현재 서비스가 원활하지 않습니다.\n잠시후 다시 이용해 주십시오.");
			console.log("500!");
			location.href = "${basePath}/login/a/n/logOut.do?requestKind=1";
		}
		if(req.status == 10001) {
//			alert("세션이 만료 되어 로그아웃 됩니다.");
			window.location.reload();
		}
	}
	, beforeSend : function(req) {
		req.setRequestHeader("IS_AJAX", "isAjax");
	}
});

// 파일 선택 후 input창에 셋팅
$(document).on("change", ".filebox .hidden", function() {
	// 값이 변경되면
	if (window.FileReader) {
		// modern browser
		var filename = $(this)[0].files[0].name;
	} else {
		// old IE
		var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
	}
	// 추출한 파일명 삽입
	$(this).parent("label").siblings(".upload_name").val(filename);
});

//파일 선택 후 input창에 셋팅 Client 교외활동
$(document).on("change", ".fileboxClient .hidden", function() {
	// 값이 변경되면
	if (window.FileReader) {
		// modern browser
		var filename = $(this)[0].files[0].name;
	} else {
		// old IE
		var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
	}
	// 추출한 파일명 삽입
	$(".pp_file_linkbox .upload_name").text(filename);
});


// 파일 리셋 버튼

// 파일 x버튼에 onclick에 다음 함수를 걸어준다
// ex) fn_resetFile(this, '파일 태그의 아이디값');
fn_resetFile = function(obj, id) {
	var agent = navigator.userAgent.toLowerCase();
	// browser check
	if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1)
			|| (agent.indexOf("msie") != -1)) {
		// IE
		$("#" + id).replaceWith($("#" + id).clone(true));
	} else {
		// Other browser
		$("#" + id).val("");
	}

	// 리셋버튼 기능
	resetData(obj);
};

// datepicker 설정
function datePicker(id) {
	var dates = $("#" + id)
			.datepicker(
					{
						dateFormat : 'yy-mm-dd',
						showOn : "both",
						buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
						closeText : '닫기',
						prevText : '이전달',
						nexttext : '다음달',
						currentText : '오늘',
						monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
						changeMonth: true,
						changeYear: true,
					});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

//JqGrid search용
function datePickerSearch(id) {
	var dates = $("#" + id)
	.datepicker(
			{
				dateFormat : 'yy-mm-dd',
				showOn : "both",
				buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
				closeText : '닫기',
				prevText : '이전달',
				nexttext : '다음달',
				currentText : '오늘',
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
				               '7월', '8월', '9월', '10월', '11월', '12월' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
				                    '7월', '8월', '9월', '10월', '11월', '12월' ],
				dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
				dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
				dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
				changeMonth: true,
				changeYear: true,
				beforeShow: function() {
				        setTimeout(function(){
				            $('.ui-datepicker').css('z-index', 99999999999999);
				        }, 0);
					}
			});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

// datepicker client 설정
function datePickerClient(id) {
	var dates = $("#" + id)
			.datepicker(
					{
						dateFormat : 'yy-mm-dd',
						showOn : "both",
						/*buttonText : "<button type='button' class='btn_calendar'>달력열기</button>",*/
						buttonText : "<button type='button' class='btn_cal btn_calendar'>달력보기</button>",
						closeText : '닫기',
						prevText : '이전달',
						nexttext : '다음달',
						currentText : '오늘',
						yearRange: 'c-100:c+10',
						monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
						changeMonth: true,
						changeYear: true,
					});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

// datepicker client 설정
function datePickerCns(id) {
	var dates = $("#" + id)
			.datepicker(
					{
						dateFormat : 'yy-mm-dd',
						showOn : "both",
						buttonText : "<a href='javascript:void(0);' class='cs_calendar_img'>달력열기</a>",
						closeText : '닫기',
						prevText : '이전달',
						nexttext : '다음달',
						currentText : '오늘',
						monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
						changeMonth: true,
						changeYear: true,
					});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

// datePicker 특허전용
function datePickerPat(id) {
	var dates = $("#" + id)
			.datepicker(
					{
						dateFormat : 'yymmdd',
						showOn : "both",
						buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
						closeText : '닫기',
						prevText : '이전달',
						nexttext : '다음달',
						currentText : '오늘',
						monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
								'7월', '8월', '9월', '10월', '11월', '12월' ],
						dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
						dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
						changeMonth: true,
						changeYear: true,
					});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

// 체크박스 체크
$.fn.emptyCheckBox = function() {

	if (!$(this).is(":checked")) {
		alert($(this).attr("title") + " 값을 체크해 주세요.");
		//상단으로 올리기
		$("html").scrollTop(0);
		$(this).focus();
		return false;
	}
	return true;
};

// 바이트 체크
$.fn.byteCheck = function(maxByte) {
	var codeByte = 0;
	var objLength = $(this).val().length;
	var stsBool = true;

	for (var i = 0; i < objLength; i++) {
		var oneChar = escape($(this).val().charAt(i));
		if (oneChar.length == 1) {
			codeByte++;
		} else if (oneChar.indexOf("%u") != -1) {
			codeByte += 3;
		} else if (oneChar.indexOf("%") != -1) {
			codeByte++;
		}

		if (Number(codeByte) > Number(maxByte)) {
			alert($(this).attr("title") + "의 입력 가능한 바이트수를 초과하였습니다.\n(byte제한: "
					+ maxByte + " byte)");
			// 글자수 삭제
			var objText = $(this).val().substring(0, i);
			$(this).val(objText);
			$(this).focus();
			stsBool = false;
			break;
		}
	}

	return stsBool;
};

// 숫자만 입력 클래스로
$(document).on("keyup focusout", ".numberOnly", function(e) {
	this.value = this.value.replace(/[^0-9]/g, "");
});

// 첨부파일 다운로드
fn_fileDownload = function(basePath, fileId) {
	if(fileId != null){
		location.href = basePath + "/cmm/fms/fileDownload.do?fileId=" + fileId;
	}
};

// 입력 문자 바이트 체크
// obj: 자바스크립트 object
// maxByte: 체크할 byte수 (DB Byte)
function chkByte(obj, maxByte) {
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for (var i = 0; i < str_len; i++) {
		one_char = str.charAt(i);
		if (escape(one_char).length > 4) {
			rbyte += 3; // 한글3Byte
		} else if (str.charCodeAt(i) == 10) {
			rbyte += 2; // 엔터는 2byte
		} else {
			rbyte++; // 영문 등 나머지 1Byte
		}

		if (rbyte <= maxByte) {
			rlen = i + 1; // return할 문자열 갯수
		}
	}

	if (rbyte > maxByte) {
		var max = Math.floor(maxByte / 3);
		alert("한글 " + max + "자 / 영문 " + maxByte + "자를 초과 입력할 수 없습니다.");
		str2 = str.substr(0, rlen - 1); // 문자열 자르기
		obj.value = str2;
		chkByte(obj, maxByte);
	}
}

//콤마 찍기
function comma(str){
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 콤마 풀기
function uncomma(str){
	str = String(str);
	return str.replace(/[^\d]+/g, '');
}

//input 값 입력시 콤마 찍기 키업 이벤트로
function commaKeyUp(obj){
	obj.value = comma(uncomma(obj.value));
}

//가로스크롤
//$(document).on("mousewheel", ".rowScrollEvent", function(e) {
//	e.preventDefault();
//	e.stopImmediatePropagation();
//	var wheelDelta = e.originalEvent.wheelDelta;
//	if(wheelDelta > 0){
//		//console.log("up");
//		$(this).scrollLeft(-wheelDelta*5 + $(this).scrollLeft());
//	}else{
//		//console.log("down");
//		$(this).scrollLeft(-wheelDelta*5 + $(this).scrollLeft());
//	}
//});

//input[type=file] 초기화
fn_clearFileBox = function(id){
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// ie 일때 input[type=file] init.
		$("#"+id).replaceWith( $("#"+id).clone(true) );
		$("#"+id+"Name").val("");
	} else {
		// other browser 일때 input[type=file] init.
		$("#"+id).val("");
		$("#"+id+"Name").val("");
	}
}

fn_check_reg_exp_tel = function(formId,tagId){
	var telChk = /^\d{2,3}-\d{3,4}-\d{4}$/;
	var flag = true;
	if(!telChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("전화번호 형식이 올바르지 않습니다.\n - 를 포함한 숫자만 입력하세요.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

fn_check_reg_exp_cel = function(formId, tagId){
	var celChk = /^\d{3}-\d{3,4}-\d{4}$/;
	var flag = true;
	if(!celChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("휴대전화 형식이 올바르지 않습니다.\n - 를 포함한 숫자만 입력하세요.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

fn_check_reg_exp_email = function(formId, tagId){
	var emailChk = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var flag = true;
	if(!emailChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("이메일 형식이 올바르지 않습니다.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

sessionInvalidate = function() {
	$.ajax({
		url : sessionStorage.getItem("contextRootPath") + "/login/a/n/sessionInvalidateForDevAjax.do"
		, success : function() {
			console.log("session invalidate success!");
		}
	});
};

//휴대폰 번호 자동으로 하이픈 넣기
function fnReplaceHpNumber(hPNumber) {
	var orHpNum = "";
	var regNumber = /^[0-9]*$/;
	var replaceHpNumber = "";
	orHpNum = hPNumber.replace(/\-/g,'');

	if(!regNumber.test(orHpNum)) {
	    console.log("휴대폰 양식이 올바르지 않습니다. 확인 부탁 드립니다.");
	    return;
	}
	replaceHpNumber = orHpNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")
	return replaceHpNumber;
}


/**
 * Null Object 체크
 * @param el
 * @returns
 */
function isNullObject(el) {
	return (el == null || el == "undefined" || typeof el == "undefined") ? true : false;
}


/**
 * Null 체크
 * @param el
 * @returns
 */
function isEmpty(el) {
	return (el == null || el == "" || typeof el == "undefined") ? true : false;
}

/**
 * 공통코드 조회
 * @param comnCdPcodeId = 조회할 코드
 * @param viewId        = 보여질 셀렉트 박스 ID
 * @param selValue      = 선택될 코드값
 * @param allValue      = 기본 노출값
 * @param useAsync      = ture / false
 * @returns
 */
function fnSetComnCdCombo(comnCdPcodeId, viewId, selValue, allValue, useAsync, basePathClient)  {
	var basePath = sessionStorage.getItem("contextRootPath");
	if(typeof basePath == "undefined" && basePath(allValue) || basePath == null || basePath == 'null') {
		basePath = basePathClient;
	}
	var _url = basePath+"/cmm/fms/getCodeListAjax.do";
	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#"+viewId);
	if(comnCdPcodeId == ""){return false;}
	if(typeof targetView == "undefined") {return;}

	if(typeof allValue != "undefined" && !isEmpty(allValue)) {
		targetView.children().remove().end().append('<option value="">'+allValue+'</option>') ;
	}

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			comnCdPcodeId   : comnCdPcodeId
		},
		success: function(r) {
			if (r.beanlist.length > 0) {
				for(var idx=0; idx<r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					if(typeof selValue != "undefined" && selValue == obj.codeId) {
						targetView.append("<option value='"+obj.codeId+"' selected>"+obj.codeName+"</option>");
					} else {
						targetView.append("<option value='"+obj.codeId+"'>"+obj.codeName+"</option>");
					}
				}
			} else {
				alert("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
			//alert("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
		}
	}) ;
}


/**
 * 담당자 조회
 * @param searchOpener = 담당자 이름
 * @returns
 */

function fnOpenStaffListPopUp(searchOpener, mngType) {
	var popupDivId = "#layerPopup"; // 팝업이 들어가는 div의 id
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupUrl = basePath+"/cmm/fms/getStaffListPopUp.do"; // 팝업 내용을 호출하는 url
	var popupParams = {
				searchOpener : searchOpener
				, mngType : mngType
				, searchCondition : 'addKorNm'
			}; // 팝업 호출시의 파라미터
	loadPopup (popupDivId, popupUrl, popupParams);
}

/**
 * 부서 조회
 * @param menuGubun = 부서검색 팝업 호출 메뉴
 * @returns
 */

function fnOpenDeptListPopup(_menuGubun, _inputVal, remarksA) {
	var popupDivId = "#layerPopup"; // 팝업이 들어가는 div의 id
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupUrl = basePath+"/cmm/fms/getDeptPopList.do"; // 팝업 내용을 호출하는 url
	var popupParams = {
			menuGubun : _menuGubun
		   ,deptKorNm : _inputVal
		   ,remarksA  : remarksA
		}; // 팝업 호출시의 파라미터
	loadPopup (popupDivId, popupUrl, popupParams);
}

/**
 * 인풋값 Null체크
 * @param id
 * comment :
 */

function fnChkIsNull(idName){
	 var msg = "";
	 for(var idx = 0; idx< idName.length; idx++){
		 if (document.getElementById(idName[idx]).value == "") {
			 var chkType = document.getElementById(idName[idx]).type;
			 var chkval = document.getElementById(idName[idx]).value;
			 var chkTitle = document.getElementById(idName[idx]).title;
			// console.log("chkType::"+chkType + "\n idName["+idx+"]::::"+idName[idx] +"\n:::\nchkval::"+chkval);

			 if(chkType =="select-one"){
				 msg = chkTitle+"(을)를 선택해 주세요.";
			 }else if(chkType =="hidden"){
				 msg = chkTitle+"(을)를 진행해 주세요";
			 }else if(chkType =="text"){
				 msg = chkTitle+"(을)를 입력해 주세요";
			 }else if(chkType =="password"){
				 msg = chkTitle+"(을)를 입력해 주세요";
			 }else if(chkType =="number"){
				 msg = chkTitle+"(을)를 입력해 주세요";
			 }else if(chkType =="textarea"){
				 msg = chkTitle+"(을)를 작성해 주세요";
			 }else {
				 alert("정의 되지 않은 체크 타입 입니다. \n chkType::"+chkType+"정의 후 사용해 주시기 바랍니다."  );
				 return false;
			 }
			 alert(msg);
			 document.getElementById(idName[idx]).focus();
			 return false;
		 }
	 }
	 return true;
}


/**
 * 날자 비교
 * @param _startDateId = 시작일 ID
 * @param _endDateId   = 종료일 ID
 * comment :
 */

function isCompareData(_startDateId , _endDateId) {
	var toDayDate = new Date(); // 시작일
	var startDate = new Date($("#"+_startDateId).val()); // 시작일
	var endDate = new Date($("#"+_endDateId).val());     // 종료일
	var startDateTitle =$("#"+_startDateId).attr("title");
	var endDateTitle =$("#"+_endDateId).attr("title");

	/*
		if((toDayDate <= startDate) == false ) {
			alert(startDateTitle+"은 금일 과 같은 날이거나 금일 보다 과거일 수 없습니다.");
			 document.getElementById(_startDateId).focus();
			return false;
		}
	*/

	if((startDate <= endDate) == false ) {
		alert(startDateTitle+"은 "+endDateTitle+" 보다 과거일 수 없습니다.");
		 document.getElementById(_startDateId).focus();
		return false;
	}
	return true;
}


/**
 * 날자 비교 - 모집기간 끝과 운영기간 시작 비교
 * @param _startDateId = 시작일 ID
 * @param _endDateId   = 종료일 ID
 * comment :
 */

function isCompareDataEach(_startDateId , _endDateId) {
	var toDayDate = new Date(); // 시작일
	var startDate = new Date($("#"+_startDateId).val()); // 시작일
	var endDate = new Date($("#"+_endDateId).val());     // 종료일
	var startDateTitle =$("#"+_startDateId).attr("title");
	var endDateTitle =$("#"+_endDateId).attr("title");

	if((startDate <= endDate) == false ) {
		alert(startDateTitle+"은 "+endDateTitle+" 보다 과거여야 합니다.");
		document.getElementById(_startDateId).focus();
		return false;
	}
	return true;
}


function cancleBackSpaceKey(e, type) {
	if(type == true){
		//input textarea 백스페이스 허용 그외의 구간 백스페이스 제한
	    if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
	        if(e.keyCode === 8){
	        return false;
	        }
	    }
		//readonly 백스페이스  제한
	    if(e.target.readOnly){
	        if(e.keyCode === 8){
	        return false;
	        }
	    }
	}
}

function chkComma(obj){
	if(obj.value.indexOf(",") != -1){
		obj.value = obj.value.replace(",", " ");
		alert(" , 를 입력할 수 없습니다.");
	}
};


function create_chart_radar(chartData) {
	chart = new AmCharts.AmRadarChart();
	chart.dataProvider = chartData;
	chart.categoryField = "title";
	chart.fontFamily = "NanumGothic";

	chart.panEventsEnabled = false;

	AmCharts.checkEmptyData = function (chart) {
	    if ( 0 == chart.dataProvider.length ) {

	        // add dummy data point
	        var dataPoint = {
	            dummyValue: 0
	        };
	        dataPoint[chart.categoryField] = '';
	        chart.dataProvider = [dataPoint];

	        // add label
	        chart.addLabel(0, '50%', '차트 데이터가 없습니다.', 'center');

	        // set opacity of the chart div
	        chart.chartDiv.style.opacity = 0.5;

	        // redraw it
	        chart.validateNow();
	    }
	}

    return chart;
}

function get_valueAxis_radar(max) {
	// VALUE AXIS
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.gridType = "polygons";
	valueAxis.axisAlpha = 0.15;
	valueAxis.minimum = 0;
	valueAxis.maximum = max;
	valueAxis.autoGridCount = false;
	valueAxis.gridCount = 5;

	return valueAxis;
}

function get_graph_radar1(valueField) {
	var graph = new AmCharts.AmGraph();
	if (valueField !== undefined) graph.valueField = valueField;

	return graph;
}

function create_chart_bar(chartData) {
	var chart = new AmCharts.AmSerialChart();
	if(chartData !== undefined) chart.dataProvider = chartData;
    chart.categoryField = "title";
    chart.fontFamily = "NanumGothic";

    AmCharts.checkEmptyData = function (chart) {
	    if ( 0 == chart.dataProvider.length ) {

	        // add dummy data point
	        var dataPoint = {
	            dummyValue: 0
	        };
	        dataPoint[chart.categoryField] = '';
	        chart.dataProvider = [dataPoint];

	        // add label
	        //chart.addLabel(0, '50%', '차트 데이터가 없습니다.', 'center');

	        // set opacity of the chart div
	        chart.chartDiv.style.opacity = 0.5;

	        // redraw it
	        chart.validateNow();
	    }
	};

    return chart;
}

function get_graph_bar1(valueField) {
	var graph = new AmCharts.AmGraph();
	if(valueField !== undefined) graph.valueField = valueField;
    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 0.8;

    return graph;
}

function get_valueAxis_bar() {
	// VALUE AXIS
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.minimum = 0;
    valueAxis.maximum = 100;
    valueAxis.autoGridCount = false;
    valueAxis.gridCount = 5;
    valueAxis.autoWrap = true;

    return valueAxis;
}

// 비교과 다중 첨부파일 수정하였을때 값넣기
$(document).on("change", ".attachFileTag", function() {

	var fileNameTag = "";

	var tagId = "";

	var tagIdNo = "";

	// 값이 변경되면
	if (window.FileReader) {
		// modern browser
		var filename = $(this)[0].files[0].name;
	} else {
		// old IE
		var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
	}
	// 추출한 파일명 삽입
	// $(this).parent("label").siblings(".upload_name").val(filename);

	tagId = $(this).attr("id");
	tagIdNo = tagId.substring(13);

	console.log("tagId: "+tagId);
	console.log("tagIdNo: "+tagIdNo);

	if(tagIdNo == '1') {
		fileNameTag = "<div class='filedown_row mg_t5'>"
	} else {
		fileNameTag = "<div class='filedown_row'>"
	}

	fileNameTag += "<a href='javascript:void(0);' class='ad_filelink'><i class='fa fa-file-o'></i>"+filename+"</a>"
			+"<button type='button' class='btn_reset' title='파일삭제'><i class='fa fa-times-circle'></i></button>"
		+"</div>"

	$(this).parent("td").append(fileNameTag);
});


function fnGoLoginPopUp(targetUrl) {
	var popupDivId = "#layerPopup";
	var basePath = sessionStorage.getItem("contextRootPath");
	var langValue = sessionStorage.getItem("langValue");
	var popupUrl = basePath+"/login/a/n/goOpenLoginPopUp.do";
	var popupParams = {
			targetUrl : targetUrl,
			langValue : langValue
		};

	$(popupDivId).load(popupUrl, popupParams, function(){
		$.magnificPopup.open({
			items: {
				src: popupDivId
			}
			, type: "inline"
			, enableEscapeKey : false
		});
	});
}

function IsAlphaNumeric(ee) {

	var inputChar = String.fromCharCode(event.keyCode);
	var ret = false;

	if (inputChar == "" && inputChar == null) {
		ret = false;
	} else {
			if (inputChar.search(/[a-z0-9]+$/gi) >= 0) { ret = true; } else { ret = false; }
	}
	// error message
	if (!ret) {
		alert("영어와 숫자만 입력 가능. \n char:" + String.fromCharCode(event.keyCode) + ", keycode: " + event.keyCode);
	}
	return ret;
}

/*
 * 두드림 client 파일 수정
 * obj 			: this로 가져온 파일 태그
 * delYn		: 삭제 가능 여부
 * maxCnt		: 최대 파일 추가 가능 수
 * fileType		: 허용하는 파일 타입(img:이미지, office:오피스, video:비디오, zip:압축 파일)
 * staffType	: client 부분인지 admin 부분인지 확인
*/
function fnOnChgFileNm(obj, delYn, maxCnt, fileType, staffType) {

	var basePath = sessionStorage.getItem("contextRootPath");
	var imagePath = basePath+"/contents/images";

	// 파일 태그에 값이 있을 때
	if (obj.value != "") {

		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');

		console.log("fileObjs: "+fileObjs);
		console.log("pTagRowCnt: "+pTagRowCnt);

		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}

		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";

		console.log("tagIdx: "+tagIdx);

		var fileNm = "";
		fileNm = obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length);

		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);

		// 학생 파일이면
		if( staffType == "CLIENT") {

			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChgFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parent().append(addFileInputHtml);

			if(obj.id == obj.name){
				appendFileNameHtml += '<div class="thumbnail" name="'+obj.name+'_link_file_del" id="'+obj.name+'_link_file_delDiv" >';
			}else{
				appendFileNameHtml += '<div class="thumbnail" name="'+obj.name+'_link_file_del" id="'+obj.name+'_'+delTagIdx+'_link_file_delDiv">';
			}

			appendFileNameHtml += '<div class="thumbnail_img">';

			if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
				appendFileNameHtml += 	'<img src="'+imagePath+'/client/sub/img_studyabroad_review2.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
			}else{
				appendFileNameHtml += 	'<img src="'+imagePath+'/client/formstyle/img_thumbnail_file.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
			}

			appendFileNameHtml += '</div>';
			appendFileNameHtml += '<span class="thumbnail_tit">'+fileNm+'</span>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" class="btn_del" id="'+obj.name+'_del" onclick="fnDelFileData(this.id, '+"'', '"+staffType+"'"+');">삭제</button>';
				}else{
					appendFileNameHtml += '<button type="button" class="btn_del" id="'+obj.name+'_'+delTagIdx+'_del" onclick="fnDelFileData(this.id, '+"'', '"+staffType+"'"+');">삭제</button>';
				}
			}

			if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
				readURL(obj, obj.name, tagIdx );
			}

			appendFileNameHtml += '</div>';

			$(obj).parent().parent("div .attach_file_wrapper").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);

		}

	}

}

function fnOnChangeFileNm(obj, delYn, maxCnt, fileType) {
	console.log("OBJ : " + obj);
	console.log("del : " + delYn);
	console.log("max : " + maxCnt);
	console.log("file : " + fileType);

	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}

		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"'"+')">';

			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("p").append(addFileInputHtml);

		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)

		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);
			 appendFileNameHtml += '<p class="link_file_del" name="'+obj.name+'_link_file_del">';
			 appendFileNameHtml += '<a href="javascript:void(0);" class="link_file" title="'+fileNm+'">'+fileNm+'</a>';


		 if(delYn == 'Y'){
			if(obj.id == obj.name){
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddFileData(this.id)"><i class="fa fa-close"></i></button>';
			}else{
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="link_del" onclick="fnDelAddFileData(this.id)"><i class="fa fa-close"></i></button>';
			}
		}
			appendFileNameHtml += '</p>';
			$('#'+obj.name+'_label').parents("p").parents("td").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
	}

}

function fnOnChangeFileNmImg(obj, delYn, maxCnt, fileType) {
	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}

		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNmImg(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("p").append(addFileInputHtml);

		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)

		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);
			 appendFileNameHtml += '<div class="link_file_del_img" name="'+obj.name+'_link_file_del" id="link_file_del_img">';
			 appendFileNameHtml += '<a href="javascript:void(0);" id="'+obj.name+'A'+tagIdx+'" class="link_file" title="'+fileNm+'">';

			 appendFileNameHtml += '<img id="'+obj.name+'Img'+tagIdx+'" src="#" alt="image" width="100px" height="100px"/>';
			if(obj.files && obj.files[0]){
				var reader = new FileReader();
				reader.onload = function (e) {
					$("#"+obj.name+'Img'+tagIdx).attr('src', e.target.result);
				}
				reader.readAsDataURL(obj.files[0]);
			}
			appendFileNameHtml += '</a>';

		 if(delYn == 'Y'){
			if(obj.id == obj.name){
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}else{
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="link_del" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}
		}
			appendFileNameHtml += '</div>';
			$('#'+obj.name+'_label').parents("p").parents("td").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
	}
}

function fnOnChangeFileNmImgClient(obj, delYn, maxCnt, fileType) {

	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}

		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNmImgClient(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("p").append(addFileInputHtml);
//			console.log($('#'+obj.id).parents("p").html());

		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)

		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);
			appendFileNameHtml += '<p class="thumnailimg_view" name="'+obj.name+'_link_file_del" id="link_file_del_img">';
//			 appendFileNameHtml += '<div class="link_file_del_img" name="'+obj.name+'_link_file_del" id="link_file_del_img">';
//			 appendFileNameHtml += '<a href="javascript:void(0);" id="'+obj.name+'A'+tagIdx+'" class="link_file" title="'+fileNm+'">';

			 appendFileNameHtml += '<img id="'+obj.name+'Img'+tagIdx+'" src="#" alt="image" width="100px" height="100px"/>';
			if(obj.files && obj.files[0]){
				var reader = new FileReader();
				reader.onload = function (e) {
					$("#"+obj.name+'Img'+tagIdx).attr('src', e.target.result);
				}
				reader.readAsDataURL(obj.files[0]);
			}
//			appendFileNameHtml += '</a>';

		 if(delYn == 'Y'){
			if(obj.id == obj.name){
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileDataImgClient(this.id)"></button>';
//				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}else{
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del ncrStdFileDel" onclick="fnDelAddFileDataImgClient(this.id)"></button>';
//				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del ncrStdFileDel" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}
		}
			appendFileNameHtml += '</p>';
//			console.log("yapyap"+appendFileNameHtml);
			$('#'+obj.name+'_label').parents("p").closest("div").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
	}
}

function fnOnChangeFileNmImgDoTalking(obj, delYn, maxCnt, fileType) {

	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}

		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNmImgDoTalking(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("div").append(addFileInputHtml);
//			console.log($('#'+obj.id).parents("div").html());

		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)

		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);
			appendFileNameHtml += '<p class="thumnailimg_view" name="'+obj.name+'_link_file_del" id="link_file_del_img">';
//			 appendFileNameHtml += '<div class="link_file_del_img" name="'+obj.name+'_link_file_del" id="link_file_del_img">';
//			 appendFileNameHtml += '<a href="javascript:void(0);" id="'+obj.name+'A'+tagIdx+'" class="link_file" title="'+fileNm+'">';

			 appendFileNameHtml += '<img id="'+obj.name+'Img'+tagIdx+'" src="#" alt="image"/>';
			if(obj.files && obj.files[0]){
				var reader = new FileReader();
				reader.onload = function (e) {
					$("#"+obj.name+'Img'+tagIdx).attr('src', e.target.result);
				}
				reader.readAsDataURL(obj.files[0]);
			}
//			appendFileNameHtml += '</a>';

		 if(delYn == 'Y'){
			if(obj.id == obj.name){
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileDataImg(this.id)"></button>';
//				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}else{
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del" onclick="fnDelAddFileDataImg(this.id)"></button>';
//				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del ncrStdFileDel" onclick="fnDelAddFileDataImg(this.id)"><i class="fa fa-close"></i></button>';
			}
		}
			appendFileNameHtml += '</p>';
//			console.log("yapyap!!"+appendFileNameHtml);
//			console.log(obj.name);
			$('#'+obj.name+'_label').parents("div").siblings("div #snsimgDiv").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
	}
}
/**
 * 첨부파일 타입체크 조회
 * @param obj           = 파일 오브젝트
 * @param fileType      = 체크 첨부파일 타입
 * @comment : img       = 이미지만
 *            office    = 문서파일
 *            video     = 동영상파일
 *            zip       = 압축파일만
 *            공백      = 체크 없음
 * @returns
 */

function fnChkUploadFileType(obj,fileType) {
	if(fileType == "img"){
		if (!/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"이미지 파일 확장자 : gif, jpg, png \n"
				+"만 업로드 가능합니다."
				);
			obj.value = "" ;
			return false ;
		}
	}else if(fileType =="office"){
		if (!/(\.doc|\.docx|\.xls|\.xlsx|\.ppt|\.pptx|\.pdf)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
					+"오피스문서 파일 확장자 : doc, docx, xls, xlsx, ppt, pptx, pdf \n"
					+"만 업로드 가능합니다."
					);
				obj.value = "" ;
				return false ;
			}
	}else if(fileType =="video"){
		if (!/(\.mp4)$/i.test(obj.value) ){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"동영상 파일 확장자 : mp4 \n"
				+"만 업로드 가능합니다."
				);
				obj.value = "" ;
				return false ;
		}
	}else if(fileType =="zip"){
		if (!/(\.zip)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"실행파일 파일 확장자 : zip (실행파일은 압축해서 올려주세요) \n"
				+"만 업로드 가능합니다."
				);
			obj.value = "" ;
			return false ;
		}
	}
return true;
}

function fnDelAddFileData(objId, fileSubId) {

	if(confirm("삭제한 파일은 복구할 수 없습니다.\n진행하시겠습니까?")) {
		if(typeof fileSubId != "undefined") {
			var basePath = sessionStorage.getItem("contextRootPath");
			var _url = basePath+"/cmm/fms/removeFileData.do";
			jQuery.ajax({
				type: "POST",
				url: _url,
				dataType: "json",
				data : {
					fileSubId   : fileSubId
				},
				success: function(r) {
					if (r.rtnCode == '0') {
						$("#"+objId).parents("p").remove();
					} else {
					 alert("첨부파일 삭제에 실패 하였습니다.");
					 return false;
					}
				},error: function(r) {
				}
			}) ;
		}else{
			var delObjId = objId.replace('_del','');
			console.log(objId);
			console.log(fileSubId);
			console.log(delObjId);
			$("#"+objId).parents("p").remove();
			$("#"+delObjId).remove();
		}
	}
}

/*
 * 파일 삭제하기
*/
function fnDelFileData(objId, fileSubId, staffType) {

	if(isEmpty(fileSubId) == false) {
		var basePath = sessionStorage.getItem("contextRootPath");
		var _url = basePath+"/cmm/fms/removeFileData.do";

		jQuery.ajax({
			type: "POST",
			url: _url,
			dataType: "json",
			data : {
				fileSubId   : fileSubId
			},
			success: function(r) {
				if (r.rtnCode == '0') {
					if(staffType == 'CLIENT'){
						var delObjId = objId.replace('_del','');
						$("#"+delObjId+"_link_file_delDiv").remove();
						$("#"+delObjId).remove();
					}else{
						var delObjId = objId.replace('_del','');
						$("#"+objId).parent(".file_thumbnail").remove();
						$("#"+delObjId).remove();
					}
				} else {
				 alert("첨부파일 삭제에 실패 하였습니다.");
				 return false;
				}
			},error: function(r) {
			}
		});

	}else{
		if(staffType == 'CLIENT'){
			var delObjId = objId.replace('_del','');
			console.log("delObjId: "+delObjId);
			$("#"+delObjId+"_link_file_delDiv").remove();
			$("#"+delObjId).remove();
		}else{
			var delObjId = objId.replace('_del','');
			$("#"+objId).parent(".file_thumbnail").remove();
			$("#"+delObjId).remove();
		}
	}
}

function fnDelAddFileDataImg(objId, fileSubId) {
	if(confirm("삭제한 파일은 복구할 수 없습니다.\n진행하시겠습니까?")) {
		if(typeof fileSubId != "undefined") {
			var basePath = sessionStorage.getItem("contextRootPath");
			var _url = basePath+"/cmm/fms/removeFileData.do";
			jQuery.ajax({
				type: "POST",
				url: _url,
				dataType: "json",
				data : {
					fileSubId   : fileSubId
				},
				success: function(r) {
					if (r.rtnCode == '0') {
						$("#"+objId).parents("p").remove();
					} else {
					 alert("첨부파일 삭제에 실패 하였습니다.");
					 return false;
					}
				},error: function(r) {
				}
			}) ;
		}else{
			var delObjId = objId.replace('_del','');
			$("#"+objId).parent().remove();
			$("#"+objId).parents("p").remove();
			$("#"+delObjId).remove();
		}
	}
}

function fnDelAddFileDataImgClient(objId, fileSubId) {
	var checkLangValue = sessionStorage.getItem("langValue");
	var _msg = '';

	if(checkLangValue == 'E'){
		_msg = "Deleted files cannot be recovered.\nDo you want to proceed?";
	}else if(checkLangValue == 'V'){
		_msg = "Không khôi phục được tập tin sẽ xóa.\nBạn có muốn thực hiện không?";
	}else if(checkLangValue == 'C'){
		_msg = "无法恢复已删除的文件。 继续进行吗？";
	}else{
		_msg = "삭제한 파일은 복구할 수 없습니다.\n진행하시겠습니까?";
	}

	if(confirm(_msg)) {
		if(typeof fileSubId != "undefined") {
			var basePath = sessionStorage.getItem("contextRootPath");
			var _url = basePath+"/cmm/fms/removeFileData.do";
			jQuery.ajax({
				type: "POST",
				url: _url,
				dataType: "json",
				data : {
					fileSubId   : fileSubId
				},
				success: function(r) {
					if (r.rtnCode == '0') {
						console.log("123");
						console.log(objId);
						$("#"+objId).parents("p").remove();
					} else {
						var _msg='';
						if(checkLangValue == 'E'){
							_msg = "Failed to delete attachment.";
						}else if(checkLangValue == 'V'){
							_msg = "Xóa thất bại file đính kèm.";
						}else if(checkLangValue == 'C'){
							_msg = "删除附件失败";
						}else{
							_msg = "첨부파일 삭제에 실패 하였습니다.";
						}
						alert(_msg);
						return false;
					}
				},error: function(r) {
				}
			}) ;
		}else{
			console.log("12344444");

			var delObjId = objId.replace('_del','');
			console.log(delObjId);
			$("#"+objId).parent().remove();
			$("#"+objId).parents("p").remove();
			$("#"+delObjId).remove();
		}
	}
}

/**
*********************************************************
@ function : 파일 추가 대진대 방식 적용
@ comment  :
@ history  : 2020-05-19 (최초작성)
**********************************************************
**/
function fnOnChangeFileName(obj, delYn, maxCnt, fileType, staffType) {

	var basePath = sessionStorage.getItem("contextRootPath");
	var imagePath = basePath+"/contents/images";

	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}
		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)
		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);

		//학생 파일이면
		if (staffType == "CLIENT") {

			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parent().append(addFileInputHtml);

			if(obj.id == obj.name){
				appendFileNameHtml += '<div class="file_thumbnail mg_r5" name="'+obj.name+'_link_file_del" id="'+obj.name+'_link_file_delDiv" >';
			}else{
				appendFileNameHtml += '<div class="file_thumbnail mg_r5" name="'+obj.name+'_link_file_del" id="'+obj.name+'_'+delTagIdx+'_link_file_delDiv">';
			}

			appendFileNameHtml += '<a href="javascript:void(0);" title="'+fileNm+'">';

			appendFileNameHtml += '<div class="thumbnail_img">';

			if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
				appendFileNameHtml += 	'<img src="'+imagePath+'/client/sub/img_nopreview.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
			}else{
				appendFileNameHtml += 	'<img src="'+imagePath+'/client/sub/img_preview_file.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
			}

			appendFileNameHtml += '</div>';
			appendFileNameHtml += '<span class="thumbnail_tit">'+fileNm+'</span>';
			appendFileNameHtml += '</a>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}else{
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}
			}

			if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
				readURL(obj, obj.name, tagIdx );
			}

			appendFileNameHtml += '</div>';

			//$('#attach_file_box_Div').append(appendFileNameHtml);
			$('#'+obj.name).parent().parent("div .attach_file_wrapper").append(appendFileNameHtml);
			$('#'+obj.name+'_label').parent().children("div .attach_file_wrapper").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);


		//관리자 파일이면
		}else {
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("p").append(addFileInputHtml);

			appendFileNameHtml += '<div class="file_thumbnail mg_r5" name="'+obj.name+'_link_file_del">';
			appendFileNameHtml += '	<a href="javascript:void(0);" title="'+fileNm+'">';
			appendFileNameHtml += '	<div class="thumbnail_img">';
				if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
					appendFileNameHtml += 	'<img src="'+imagePath+'/client/sub/img_nopreview.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
				}else{
					appendFileNameHtml += 	'<img src="'+imagePath+'/client/sub/img_preview_file.jpg" id="imageSrc_'+obj.name+'_'+tagIdx+'" />';
				}
			appendFileNameHtml += '	</div>';
			appendFileNameHtml += '	<span class="thumbnail_tit">'+fileNm+'</span>';
			appendFileNameHtml += '	</a>';
			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}else{
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}
			}
			appendFileNameHtml += '</div>';
			if (/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
				readURL(obj, obj.name, tagIdx );
			}

			/* 구버전
			appendFileNameHtml += '<p class="link_file_del file_box" name="'+obj.name+'_link_file_del">';
			appendFileNameHtml += '<a href="javascript:void(0);" class="link_file" title="'+fileNm+'">'+fileNm+'</a>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}else{
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}
			}
			appendFileNameHtml += '</p>';
			*/

			$('#'+obj.name+'_label').parents("p").parents("td").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
		}

	}

}

function readURL(input, objName , tagIdx) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#imageSrc_'+objName+'_'+tagIdx).attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

/**
*********************************************************
@ function :  validation empty check by class
@ comment  :
@ history  : 2019-05-17 (최초작성)
**********************************************************
**/
function fnEmptyCheckByClass(){
	var getClassDom = document.getElementsByClassName("emptyChkByClass");
	var flag = true;
	for(var i=0; i<getClassDom.length;i++){
		var domNodeName = getClassDom[i].nodeName;
		var domType = getClassDom[i].type;
		var domName = getClassDom[i].name;
		var domId = getClassDom[i].id;
		var domTitle = getClassDom[i].title;
		var domValue = getClassDom[i].value;

		if(domNodeName =="SELECT"){
			if (!domValue) {
				alert(domTitle+"을(를) 선택해야 합니다.");
				flag = false;
				$("#"+domId).selectedIndex=0;
				$("#"+domId).focus();
				return flag;
			}
		}else if(domNodeName =="INPUT"){
			if(domType == "checkbox"){
				if (!$("input[name="+domName+"]").is(":checked")) {
					alert(domTitle + " 값을 체크해 주세요.");
					flag = false;
					$("html").scrollTop(0);
					$("#"+domId).focus();
					return flag;
				}
			}else{
				if (!domValue) {
					alert(domTitle+"을(를) 입력해야 합니다.");
					flag = false;
					$("#"+domId).focus();
					return flag;
				}
			}

		}else if(domNodeName =="TEXTAREA"){
			if (!($.trim(CKEDITOR.instances[domName].getData()))) {
				alert("내용을 입력하세요.");
				document.insertForm.domName.focus();
				return flag;
			}
		}
	}
	return flag;
}

//태그 조건
function mustTag(boardTag){
	if(boardTag != null && boardTag != ''){
		if(boardTag.substring(0,1) == "#"){
			boardTag = boardTag.replace("#", "");
		}
	}
	if(boardTag.indexOf("#")!=-1){
		alert("단일 태그명만 검색됩니다.");
		$("#"+boardTag).focus();
		return "false";
	}
	return boardTag;
}

function likeChk(obj, CONN_KEY, BOARD_CATEGORY, LIKE_DIV, URL){
	var boardCategory=BOARD_CATEGORY;
	var userId = sessionStorage.getItem("sessionUserId");

	if(userId != null && userId != ''){
		var basePath = sessionStorage.getItem("contextRootPath");
		$.ajax({
			url : basePath+"/cmm/fms/likeCheck.do"
			, type : "post"
				, data : {
					connKey : CONN_KEY
					,boardCategory : BOARD_CATEGORY
					,likeDiv : LIKE_DIV
				}
		, success : function( res ){
//			$(obj).toggleClass("on");
			console.log($(obj).parent().find(".likeCnt").html());
			$(obj).parent().find(".likeCnt").text(res.likeCnt);
// 			document.getElementsByClassName("likeCnt")[0].innerHTML = "좋아요("+res.likeCnt+"건)";
			console.log(document.getElementsByClassName("likeCnt"));
// 			$(".likeCnt").text("좋아요("+res.likeCnt+"건)");
			}
		});
	}else{
		var _msg1="";
		if('V' == sessionStorage.getItem("langValue")){
			_msg1='Đây là dịch vụ cần đăng nhập.\nBạn có thực hiện đăng nhập không?';
		} else if('U' == sessionStorage.getItem("langValue")) {
			_msg1='This service requires login.\nAre you sure you want to log in?';
		} else if('C'== sessionStorage.getItem("langValue")) {
			_msg1='这是一项需要登录的服务。 您登录了吗？';
		} else {
			_msg1='로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?';
		}
		if(confirm(_msg1)){
			if(null != URL){
				fnGoLoginPopUp(URL);
			}else{
				fnGoLoginPopUp('/clientMain/a/t/main.do');
			}
		}
//		$(obj).removeClass('on');
//		alert("좋아요는 로그인후 사용 가능합니다.");
//		fnGoLoginPopUp('/clientMain/a/t/main.do');
	}
}

// 검색 focus
//검색창 입력 포커싱
function searchFocus(title) {
	var headerHeight = $(".header_wrapper").height()+30;
	$("#"+title).keyup (function () {
		var targetScroll= $(this);
		window.scrollTo(0, $(targetScroll).offset().top - headerHeight);
	});
}

//클라이언트 팝업
clientLoadPopup = function(popupDivId, popupUrl, popupParams) {
	if(popupUrl != null) {
		// 해당 영역을 지우고 ajax load를 이용하여 컨텐츠를 로딩한다.
		$(popupDivId).empty();

		$(popupDivId).load(popupUrl, popupParams, function() {
			$.magnificPopup.open({
				items: {
					src: popupDivId
				}
				, type: "inline"
				, enableEscapeKey : false
				, closeOnBgClick : false
			});
		});
	}
};

// 클라이언트 form 이동
function goClientFormMove(_url) {
	$("#headerTempForm").attr("action", _url);
	$("#headerTempForm").submit();
}

// 태그 저장
function fnTagHisRecord(_tag, _boardCategory, _tagList) {
	var basePath = sessionStorage.getItem("contextRootPath");
	// 현재는 언어타입 K로 고정 나중에 언어 설정이 정해지면 session에서 가져오게 변경
	var _langType = 'K';
	var _url = basePath + "/common/a/n/insertTagClick.do"
	var searchParam = $("#searchParam").val();
	var searchContent = _tag;
	if((searchParam != 'tag') || (searchContent == '') || !(_tagList.indexOf(searchContent) >= 0)) {
		return;
	}

	$.ajax({
		url : _url
		, type : "post"
		, data : {
			tag : _tag
			, boardCategory : _boardCategory
			, langType : _langType
		}
		, success : function ( res ){
			if(res.insertSuccess == false){
				console.log(res.insertSuccess);
			}
		}
	});
}

// 게시글 이력 저장
function fnBoardHisRecord(_borKey, _contentsType) {
	var basePath = sessionStorage.getItem("contextRootPath");
	// 현재는 언어타입 K로 고정 나중에 언어 설정이 정해지면 session에서 가져오게 변경
	var _langType = 'K';
	var _url = basePath + "/common/a/n/insertBoardClick.do"
	$.ajax({
		url : _url
		, type : "post"
		, data : {
			borKeyId : _borKey
			, contentsType : _contentsType
			, langType : _langType
		}
		, success : function ( res ){
			if(res.insertSuccess == false){
			}
		}
	});
}

//게시판 리스트 가져오기
function fnPopularTagListAjax(_boardCategory){
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath + "/common/a/n/selectPopularTagList.do";
	$.ajax({
		url : _url
		, type : "post"
		, async : false
		, dataType : "html"
		, data : {
			boardCategory : _boardCategory
		}
		, success : function(res) {
			$("#popularTagListAjaxDiv").empty();
			$("#popularTagListAjaxDiv").html(res);
		}
	});
}

function fnloginCheck(_url){
	var userId = sessionStorage.getItem("sessionUserId");
	var flag = false;
	if(userId == null || userId == ''){
		var _msg1 = "";
		if('K' == sessionStorage.getItem("langValue")){
			_msg1='로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?';
		} else if('V' == sessionStorage.getItem("langValue")) {
			_msg1='Đây là dịch vụ cần đăng nhập.\nBạn có thực hiện đăng nhập không?';
		} else if('C'== sessionStorage.getItem("langValue")) {
			_msg1='这是一项需要登录的服务。 您登录了吗？';
		} else {
			_msg1='This service requires login.\nAre you sure you want to log in?';
		}
		if(confirm(_msg1)){
			fnGoLoginPopUp(_url);
		}
		flag = false;
	} else {
		flag = true;
	}
	return flag;
}

// SMS 코드 만들어서 보내기
function sendSMSCode(_phone){
	console.log('확인 : '+ window.location.href);
	console.log('확인 : '+ window.location.hostname );
	console.log('확인 : '+ window.location.pathname );
	console.log('확인 : '+ window.location.protocol );
	sessionStorage.setItem("lala", "land");

	if(typeof(tid) != "undefined") clearInterval(tid);	// 타이머 초기화를 위함
	$('#loading').show();
	$("#setTime").val("180");
	var _code = Math.floor(Math.random()*(9999-(1000+1))) + 1000;
	var _receiverPhone  = _phone;
	var _nationNum  = $("#nationNum").val();
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath + '/common/a/n/sendSmsMessage.do';
	/*_code = 1000;*/

	$("#receiverPhone").val(_receiverPhone);
	$("#smsMessages").val(_code);
	$("#code").val(_code);
	$("#smsReqDiv").val("인증");

	$.ajax({
		url : _url
		, async: false
		, type : "POST"
		, data : {
			code : _code
			, receiverPhone : _receiverPhone
			, nationNum : _nationNum
		}
		, success : function(res) {
			if(res.result){
				smsHistroyInsert("CERTI_SMS_TYPE01");
				tid = setInterval('msg_time()',1000);
				alert("문자 전송되었습니다.");
			}else{
				smsHistroyInsert("CERTI_SMS_TYPE03");
				alert("서버 오류로 문자 전송에 실패하였습니다.");
			}
		}
		, error : function(error) {
			smsHistroyInsert("CERTI_SMS_TYPE03");
			alert("서버 오류로 문자 전송에 실패하였습니다.");
		}
	}).always(function(){
		$('#loading').hide();
	});
}

// 문자 보낸 후 기록 저장
function smsHistroyInsert(_shipSts){
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath + "/common/a/n/insertSmsHistory.do";

	var _receiverPhone = $("#nationNum").val() + $("#receiverPhone").val();
	var _smsMessages = $("#smsMessages").val();
	var _smsReqDiv = $("#smsReqDiv").val();

	$.ajax({
		url : _url
		, type : "POST"
		, data : {
			receiverPhone : _receiverPhone
			, smsMessages : _smsMessages
			, shipSts : _shipSts
			, smsReqDiv : _smsReqDiv
		}
		, success : function(res) {
			$("#smsHisSeq").val(res.smsHisSeq);
		}
	});
}

var doubleCheckMatchCode=false;
// 인증 확인
function matchCode(obj) {
	if(doubleCheckMatchCode){
		return;
	}
	doubleCheckMatchCode=true;

	var langValue = sessionStorage.getItem("langValue");
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath + "/common/a/n/updateSmsHistory.do"
	var _smsHisSeq = $("#smsHisSeq").val();
	var _shipSts = "CERTI_SMS_TYPE02";

	var _code = $("#code").val();
	var _inputCode = $("#inputCode").val();

	if(_inputCode == "" || _inputCode == null){
		var msg='';
		if(langValue == 'K'){
			msg = "코드를 입력해주세요";
		}else if(langValue == 'V'){
			msg = "Vui lòng nhập mã.";
		}else if(langValue == 'C'){
			msg = "请输入代码。";
		}else{
			msg = "Please enter the code.";
		}
		draw_toast_top(3,"",msg);
		doubleCheckMatchCode = false;
		return;
	}
	if(_code != _inputCode){
		$("#noMatchCode").show();
		$(".input_count").css("top" , "30%");
		doubleCheckMatchCode = false;
		return;
	}
	$("#noMatchCode").hide();
	$(".input_count").css("top" , "50%");
	$.ajax({
		url : _url
		, type : "POST"
		, data : {
			smsHisSeq : _smsHisSeq
			, shipSts : _shipSts
		}
		, success : function(res) {
			$("#phoneCertiYn").val('Y');
			$("#inputPhone").attr("readonly", "true");
			$("#inputCode").attr("readonly", "true");
			clearInterval(tid);		// 타이머 해제

			$(obj).removeClass('btn_blue');
			$(obj).addClass('btn_green');
			$(obj).attr('onclick', 'javascript:void(0);');
			$('#sendCode').hide();

			var msg='';
			if(langValue == 'K'){
				$(obj).text('인증완료');
				msg = "인증이 완료되었습니다.";
			}else if(langValue == 'V'){
				$(obj).text('Hoàn thành xác nhận');
				msg = "Xác nhận đã được hoàn thành";
			}else if(langValue == 'C'){
				$(obj).text('完成认证');
				msg = "认证已完成。";
			}else{
				$(obj).text('Certification completed');
				msg = "Authentication completed successfully";
			}
			alert(msg);
		}
		, complete: function(){
			doubleCheckMatchCode=false;
		}
	});
}

// 인증 3분 시간
function msg_time() {	// 1초씩 카운트
	var setTime = parseInt($("#setTime").val());
	var zero = "";
	if((setTime % 60) < 10 ) zero = "0";
	else zero = "";
	var remainTime = "0" + Math.floor(setTime / 60) + ":" + zero + (setTime % 60) ;	// 남은 시간 계산

	$(".input_count").html(remainTime);		// div 영역에 보여줌
	setTime--;					// 1초씩 감소
	$("#setTime").val(setTime);
	if (setTime < 0) {			// 시간이 종료 되었으면..
		clearInterval(tid);		// 타이머 해제
		$("#code").val("");
		alert("인증 시간이 초과되었습니다.");
	}

}

/*
 * https://codeseven.github.io/toastr/demo.html
 * 위 사이트를 통해 테스트 진행 가능
 *
 * _type 1번 : Success  (초록색)
 * _type 2번 : Info     (파랑색)
 * _type 3번 : Warning  (노란색)
 * _type 4번 : Error    (빨강색)
 * _title : toast 창에 보여줄 문구
 * _ content : toast 창에 보여줄 문구
 */
function draw_toast_top(_type , _title ,_msg){
	toastr.options = {
		"closeButton": false
		, "debug": false
		, "newestOnTop": false
		, "progressBar": false
		, "positionClass": "toast-top-full-width"	// 위치
		, "preventDuplicates": false
		, "onclick": null
		, "showDuration": "300"
		, "hideDuration": "1000"
		, "timeOut": "5000"
		, "extendedTimeOut": "1000"
		, "showEasing": "swing"
		, "hideEasing": "linear"
		, "showMethod": "fadeIn"
		,"hideMethod": "fadeOut"
	}
	if(_type == 1) {
		toastr.success(_title, _msg);
	} else if(_type == 2) {
		toastr.info(_title, _msg);
	} else if(_type == 3) {
		toastr.warning(_title, _msg);
	} else {
		toastr.error(_title, _msg);
	}
}

function sendFile(file, obj) {
	var form_data = new FormData();
	form_data.append('file', file);
	$.ajax({
		data: form_data,
		type: "POST",
		url: sessionStorage.getItem("contextRootPath")+'/common/a/n/summernoteFileUpload.do',
		cache: false,
		contentType: false,
		enctype: 'multipart/form-data',
		processData: false,
		success: function(res) {
			console.log('go');
			console.log(res);
			$(obj).summernote('editor.insertImage', res.filePath);
		}
	});
}


/**
 * @param _returnUrl	로그인후 돌아갈 return URL
 * @param _paymentKey	결제 제품 정보 키
 * @param _referKey		상품 SEQ
 * @param _idx			토픽 모의고사 번호
 */
function fnGoPayment(_returnUrl, _paymentKey, _referKey, _idx) {
	var loginChk = fnloginCheck(_returnUrl);
	if(!loginChk){
		return;
	}
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath + "/payment/a/m/showPaymentPage.do";
	$("#paymentForm [name='backUrl']").val(_returnUrl);			// 취소 시 돌아갈 url
	$("#paymentForm [name='paymentKey']").val(_paymentKey);		// 결제 제품 정보 키
	$("#paymentForm [name='referKey']").val(_referKey);			// referKey
	$("#paymentForm [name='idx']").val(_idx);					// 모의고사용 idx
	$("#paymentForm").attr("action", _url);
	$("#paymentForm").submit();
}

/*
 * 챗봇 모바일 및 테블릿 컨트롤_모바일 테블릿 일때는 새팡으로 띄운다.
 */
function fnChatbotSet() {

	chatbotClick();

	if( !matchMedia("screen and (min-width: 1024px)").matches ) {
		console.log('모바일');
		window.open("https://answerny.ai/chatbot/projects/datavoucher2020/dain/chatbot_dain.html", "_blank");
	}

}

function fnDeviceChk() {
	// 디바이스 종류 설정
	var pcDevice = "win16|win32|win64|mac|macintel";
	// 접속한 디바이스 환경
	if ( navigator.platform ) {
		var deviceType = 'MOBILE';
		if ( pcDevice.indexOf(navigator.platform.toLowerCase()) < 0 ) {
			$("#deviceShow1").hide();
			$("#deviceShow2").hide();
			$("#deviceShow3").hide();
			$("#deviceShow4").hide();
		} else {
			deviceType = 'PC';
		}
	}

	return deviceType;
}

