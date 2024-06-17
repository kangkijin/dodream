var BASE_PATH =  sessionStorage.getItem("contextRootPath");


//팝업창으로 실행시 clientSubTemplate가 다시 로드 되는게 아니라 기존것을 사용하여서 테이블 가로스클롤을 적용시키기 위해 추가
function ScrollReady() {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 custom
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".pp_scrollx_tbl, .pp_scrollx_tbl_sm, .pp_scrollx_tbl_md , .pp_scrollx_tbl_lg, .pp_scrollx_tbl_xl").off(mCustomScrollbar);
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".pp_scrollx_tbl_lg, .pp_scrollx_tbl_xl").mCustomScrollbar({
				axis:"x",
				theme:"dark",
				advanced:{
					autoExpandHorizontalScroll:true
				}
			});
			$(".pp_scrollx_tbl, .pp_scrollx_tbl_sm, .pp_scrollx_tbl_md").mCustomScrollbar({
				axis:"x",
				theme:"dark",
				advanced:{
					autoExpandHorizontalScroll:false
				}
			});
		};
	};
}
//기본 DIV 호출
function getDataDivHtml(pageNo, _url, searchKey, portFoloiGbn, viewType) {
	//console.log("pageNo = " + pageNo);
	//console.log("_url = " + _url);
	//console.log("searchKey = " + searchKey);
	//console.log("portFoloiGbn = " + portFoloiGbn);
	//console.log("viewType = " + viewType);
	
	$.ajax({
		url : _url
		,type : "POST"
		,dataType : "html"
		,async : true
		,data : {
			searchKey : searchKey
		    ,portFoloiGbn : portFoloiGbn
		    ,pageIndex : pageNo
		    ,viewType : viewType
		}
		, success : function(res) {
			if(portFoloiGbn == "BASIC_USER_INFO"){
				$("#userBasicInfoDiv").html(res);
			}else if(portFoloiGbn == "RESUME_INFO"){
				$("#resumeInfoDiv").html(res);
			 }else if(portFoloiGbn == "SELF_INTRODUCE"){
		    	$("#selfIntroduceInfoDiv").html(res);
			}else if(portFoloiGbn == "V_RCR_PROGRAM_INFO"){
				$("#stdRcrListDiv").html(res);
			}else if(portFoloiGbn == "CPS_NCR_PROGRAM_INFO"){
		    	$("#stdNcrListDiv").html(res);
			}else if(portFoloiGbn == "CPS_ACTIVITY_OUT_MNG"){
				$("#stdOutActListDiv").html(res);
			}else if(portFoloiGbn == "PERFOR_ANALYS_GRAPH"){
				$("#perforAnalyDiv").html(res);
			}
		}
	});	
}

/* 이력서 등록  or 수정  팝업 */
resumePopup = function (_popType,_resumeSeq,_stdNo,_repYn){
	var popupDivId	= "#layerPopup";	// 팝업이 들어가는 div의 id
	var popupUrl	= BASE_PATH+"/portfolioClient/r/n/mergeResumePopup.do";	// 팝업 내용을 호출하는 url
	var popupParams = {
			popType:_popType,
			resumeSeq:_resumeSeq,
			stdNo:_stdNo,
			repYn:_repYn
	};	// 팝업 호출시의 파라미터
	loadPopup(popupDivId, popupUrl, popupParams);
}

/* 대표 이력서 등록 */
representResume = function(_resumeSeq, _stdNo){
	if( confirm("대표이력서로 설정하시겠습니까?") ){
		$.post(BASE_PATH+"/portfolioClient/r/n/updateRepresentResume.do"
			,{resumeSeq:_resumeSeq,stdNo:_stdNo}
			,function(result){
				if( result == 'success'){
					alert("대표이력서로 설정되었습니다.");
					location.reload();
				} else {
					alert("대표이력서로 설정하는데 실패하였습니다.\n잠시후 다시 시도해주세요");
				}
			}
		);
	}
}

/* 이력서 삭제 */
removeResume = function(_resumeSeq){
	if( confirm("이력서를 삭제 하시겠습니까?") ){
		$.post(BASE_PATH+"/portfolioClient/r/n/deleteResumeList.do"
			,{resumeSeq:_resumeSeq}
			,function(result){
				if( result == 'success'){
					alert("삭제되었습니다.");
					location.reload();
				} else {
					alert("이력서를 삭제 하는데 실패하였습니다.\n잠시후 다시 시도해주세요");
				}
			}
		);
	}
}


/* 포트폴리오 공유 URL 팝업*/
sharePortfolio = function (_popType,_clSeq,_stdNo, _binfo){
	var popupDivId	= "#layerPopup";	// 팝업이 들어가는 div의 id
	var popupUrl	= BASE_PATH+"/portfolioClient/r/n/sharePortfolioPopup.do";	// 팝업 내용을 호출하는 url
	var popupParams = {
	};	// 팝업 호출시의 파라미터

	loadPopup(popupDivId, popupUrl, popupParams);
}


/* 선택출력 팝업 */
function selectPrint(stdNo){
	var popupDivId	= "#layerPopup";	// 팝업이 들어가는 div의 id
	var popupUrl	= BASE_PATH+"/portfolioClient/r/n/selectPrintPopup.do";	// 팝업 내용을 호출하는 url
	var popupParams = {
			stdNo : stdNo
	};	// 팝업 호출시의 파라미터

	loadPopup(popupDivId, popupUrl, popupParams);
}

/* 전체출력 팝업 */
function onPrint(stdNo){
	var url	= BASE_PATH+"/cmm/fms/goOnPrintPopUp.do?stdNo="+stdNo+"&p1=Y&p2=Y&p3=Y&p4=Y&p5=Y";
	window.open(url,"selectPrintForm","toolbar=no,directories=no,scrollbars=yes,resizable=no,status=no,menubar=no,width=1000, height=830, left=100");
}



/* 그래프 */
function drawProgramGraph(chartDataArry,chartTitleArry, divNm){
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
	chart.addValueAxis(valueAxis);
	chart.dataProvider = chartData;
	// 차트 그리기
	chart.write(divNm);
}

/* 그래프 */
function drawProgramGraphTwoLine(chartDataArry, chartDataTitleArry, chartDataArry2, chartDataTitleArry2, chartCategoryTitleArry, chartTitleArry, divNm){
	var chartData = new Array();
	// 차트데이터 생성
	var graphColor = ['#FF6600','#FCD202','#0A9696','#FF8200', '#0000FF', '#AE5E1A', '#7A00FC', '#FF1493', '#28E7FF','#009933']
	
	for(var idx= 0; idx < chartDataArry.length; idx++  ){
		var chartArray = {
						  "category": chartCategoryTitleArry[idx]
						  ,"graphColor": graphColor[0]
						  ,"data": chartDataArry[idx]
						  ,"dataTitle": chartDataTitleArry[idx]
						  ,"graphColor2": graphColor[1]
						  ,"data2": chartDataArry2[idx]
						  ,"dataTitle2": chartDataTitleArry2[idx]
		
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
		graph.balloonText = "[[dataTitle]]:[[value]]";
		graph.fillAlphas = 1;
		graph.id = "title";
		graph.title = chartTitleArry[0];
		graph.type = "column";
		graph.fillColorsField = "graphColor";
		graph.lineColorField = "graphColor";
		graph.columnWidth = 0.7;
		graph.valueField = "data";
	
		
	var graph2 = new AmCharts.AmGraph();
		graph2.balloonText = "[[dataTitle2]]:[[value]]";
		graph2.fillAlphas = 2;
		graph2.id = "title2";
		graph2.title = chartTitleArry[1];
		graph2.type = "column";
		graph2.fillColorsField = "graphColor2";
		graph2.lineColorField = "graphColor2";
		graph2.columnWidth = 0.7;
		graph2.valueField = "data2";
		
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
			
	chart.addGraph(graph);
	chart.addGraph(graph2);
	chart.addLegend(legend);
	chart.addValueAxis(valueAxis);
	chart.dataProvider = chartData;
	// 차트 그리기
	chart.write(divNm);
}


