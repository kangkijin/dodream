$(document).ready(function(){

	// Window Resize 설정
	$(window).bind("resize", function(){
		lay_pop(); // 레이어 팝업 위치
		$(".visual_area").find("li").css({"width" : $(window).width()});
		$(".showcase-content").width($(window).width());
		$("#showcase").css({"width" : $(window).width()});
	});
	$(".link_solution").filter(function(){
		$("#contents").css({"overflow" : "visible"});
	});

	$(".main_section").filter(function(){
		$("body").addClass("main");
	});
	$(".aside").filter(function(){
		$("body").addClass("sub");
	});



	// 달력
	 $(".datepicker").datepicker({
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd', //형식(2012-03-03)
		autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
		//changeMonth: true, //월변경가능
		//changeYear: true, //년변경가능
		showMonthAfterYear: true, //년 뒤에 월 표시
		buttonImageOnly: true, //이미지표시
		buttonImage: '../images/btn/btn_calendar.gif', //이미지주소
		showOn: "both"
	   });	

	//레이어 팝업 닫기
	$(".layer_popup").find(".close").click(function(){
		$(this).parent().fadeOut("fast");
		$(".overlay").fadeOut("fast");
	});

	function lay_pop (){	
		var width = $(window).width();
		var height = $(window).height();
		var layerWidth = $(".layer_popup").width();
		var layerHeight = $(".layer_popup").height();
		var posWidth = (width-layerWidth)/2;
		var posHeight = (height-layerHeight)/2;

		$(".layer_popup").css({"left": ( $(window).width() -  layerWidth)/2,"top" :posHeight});
	}
	
	// 실습 후기 슬라이드
	/*
	 $(".biz_photo").find("a").click(function(){
		$(".com_re_view").show();
		lay_pop();
		$(".overlay").fadeIn("fast");
	});
	*/

	
	$(".com_re_view .view_slide").slides({
		effect: 'slide',
		pause: 1000,
		hoverPause: true,
		fadeSpeed: 450,
		generatePagination: true,
		generateNextPrev: true
	});	

	$(".com_re_view").filter(function(){
		var pa_li = $(this).find(".pagination li").size();
		var pa_width = pa_li * 10;
		$(this).find(".pagination").css({"width" : pa_width});
	});	
	
	$(".paging").filter(function(){		
		if ($(this).prev().hasClass("btn_set") > 0){			
			$(this).css({"margin-top" : "40" * (-1)});
		}
	});
});