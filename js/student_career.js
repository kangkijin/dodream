
// 체크박스 콘트롤
function hiddenList(id){
	if($('#' + id + ':checked').length > 0){
		$('.' + id).css("display", "");
	} else if($('#' + id + ':checked').length == 0){
		$('.' + id).css("display", "none");
	}
}

// 외국어명 없음 선택시
function selectLanguage(val){
	var value = val.value;
	if(value == 'none'){
		$('input:radio[name="level_show"]').attr("checked", false); 
		$("input[name=level_show]").attr("disabled", true);
	} else {
		$("input[name=level_show]").attr("disabled", false);
	}
	
}

// 언어능력 공인시험 없음 선택시
function selectLanguageTest(val){
	var value = val.value;
	if(value == 'none'){
		$("#point_show").val("");
		$("#test_level_show").val("");
		$("#point_show").attr("disabled", true);
		$("#test_level_show").attr("disabled", true);
		$("#license_year_show").attr("disabled", true);
		$("#license_month_show").attr("disabled", true);
		$("#license_day_show").attr("disabled", true);
	} else {
		$("#point_show").attr("disabled", false);
		$("#test_level_show").attr("disabled", false);
		$("#license_year_show").attr("disabled", false);
		$("#license_month_show").attr("disabled", false);
		$("#license_day_show").attr("disabled", false);
	}
}

$(document).ready(function() {
	
	// 체크박스 콘트롤
	$('#add_academicAbility').click(function(){
	
		var setText = "";
		setText += '<tr>';
			
		setText += '<td><input type="text" class="input10" name="aa_s_date"  value=""  onkeydown="number_check();" onkeyup="date2(this);"/>';
		setText += ' ~ <input type="text" class="input10"  name="aa_e_date" value=""  onkeydown="number_check();" onkeyup="date2(this);"/></td>';
		setText +=  '<td><input type="text" class="input12" name="school_nm" value=""  /></td>';
		setText += '<td><input type="text" class="input12" name="major" value="" /></td>';
		setText += '<td><input type="text" class="input13" name="grade" value=""  /></td>';
		setText += '<td><input type="text" class="input13" name="avg" value="" /></td>';
		setText += '<td><span class="btn_search_area" ><a href="javascript:;" onclick="remove2(event, \'academicAbilityTable\')">삭제</a></span></td>';
		setText += '</tr>';

		$("#academicAbility_body").append(setText);		
	});
	
	$('#add_license').click(function(){
				
		var setText = "";
		setText += '<tr>';		
		setText += '<td><input type="text"  class="input14"  name="license_title" value=""/></td>';
		setText += '<td><input type="text"  class="input14"  name="license_level" value=""/></td>';
		setText += '<td><input type="text"  class="input14"  name="license_org" value=""/></td>';
		setText += '<td><input type="text"  class="input12"  name="license_date" value="" onkeydown="number_check();" onkeyup="date1(this);"/></td>'
		setText += '<td><span class="btn_search_area" ><a href="javascript:;" onclick="remove2(event, \'licenseTable\')">삭제</a></span></td>';
		setText += '</tr>';

		$("#license_tbody").append(setText);

	});
	
	$('#add_career').click(function(){
				
		var setText = "";
		setText += '<tr>';
		setText += '<td><input type="text" class="date-picker input10" readonly="readonly" name="career_s_date"  value=""  onkeydown="number_check();" onkeyup="date2(this);"/>';
		setText += ' ~ <input type="text" class="date-picker input10" readonly="readonly"  name="career_e_date" value=""  onkeydown="number_check();" onkeyup="date2(this);"/></td>';
		setText += '<td><input type="text"  class="input14" name="career_content" value="" /></td>';
		setText += '<td><input type="text"  class="input12" name="career_title" value="" /></td>';
		setText += '<td><span class="btn_search_area" ><a href="javascript:;" onclick="remove2(event, \'careerTable\')">삭제</a></span></td>';
		setText += '<tr>';
		
		$("#career_tbody").append(setText); 
		
		 $('.date-picker').datepicker( {
			 monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				weekHeader: 'Wk',
				dateFormat: 'yy.mm', //형식(2012-03-03)
				autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
				changeMonth: true, //월변경가능
				changeYear: true, //년변경가능
				showMonthAfterYear: true, //년 뒤에 월 표시
				buttonImageOnly: true, //이미지표시
				buttonImage: '../images/btn/btn_calendar.gif', //이미지주소
				showOn: "both"
		    });
	});
	
	$('#add_edu').click(function(){
		
		
		var setText = "";
		setText += '<tr>';
		setText += '<td><input type="text"  class="input12"  name="language_type" value="" /></td>';
		setText += '<td><input type="text"  class="input14"  name="test" value=""/></td>';
		setText += '<td><input type="text"  class="input14"  name="point" value=""/></td>';
		setText += '<td><input type="text"  class="input14"  name="date" value="" onkeydown="number_check();" onkeyup="date1(this);"/></td>';
		setText += '<td><span class="btn_search_area" ><a href="javascript:;" onclick="remove2(event, \'languageTable\')">삭제</a></span></td>';
		setText += '</tr>';

		$("#edu_tbody").append(setText);		
		
	});
	
});

function remove2(e, tblId){
	var rowIdx = getRowIndex(e);
	var oTbl = document.getElementById(tblId);
	if(confirm("삭제 하시겠습니까?")) {
		 oTbl.deleteRow(rowIdx);
	 }
		return false;
}

function getRowIndex(e) {
	 if(!e) var e = window.event;

	 var target = e.target || e.srcElement;
	 while(target.tagName != 'TR' && target.tagName != 'BODY') {
	  target = target.parentNode;
	 }
	 return target.rowIndex;
}