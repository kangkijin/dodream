/*
 * jqGrid 공통 기능
 */

/***********************************************************
@ function : 엑셀 다운로드 버튼 
@ comment  : 리스트를 엑셀로 다운로드 함. 
@ history  : 2018-11-13 (최초작성)
************************************************************/
function excelDown(fieldName,fileName){
	$("#"+fieldName).jqGrid("exportToExcel",{
		includeLabels : true,
		includeGroupHeader : false,
		includeFooter: true,
		mimetype : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		fileName : fileName+".xlsx"
	});
};

