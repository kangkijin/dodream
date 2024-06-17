$(document).ready(function(){
	//new 2016추가
	$("#sub-header > ul").find("> li").hover(function(){
        if ($(this).hasClass("selected")){
            $(this).find(".twoDepth").show();
        } else {
            $("#sub-header > ul > li").find(".twoDepth").hide();
        }
        $(this).find(".twoDepth").slideDown("fast");
    }, function(){
        $("#sub-header > ul").find(">li").filter(function(){
            if ($(this).hasClass("selected")){
                $(this).find(".twoDepth").show();
            } else {
                $(this).find(".twoDepth").hide();
            }
        });
    });
	
	if ($(".top_nav").find("#navWrapper").size() > 0){
		$("body").addClass("admin_body");
		$("#wrap").addClass("admin_page");
	}

	$("#wrap").filter(function(){
		if ($(".nav").find(".adm").size() > 0){
			$("body").addClass("admin_body");
			$(this).addClass("admin_page");
		}



		$(".aside").filter(function(){
			if ($("#wrap").attr("class") != "admin_page"){
				$("#header").css({"height" : "146"});
			}
		});

	});

	// 탑 메뉴 영역 설정
	$(".adm_menu").find("li:last").css({"border" : "0"}); // Top Menu 마지막 영역 Border 제거

	$(".site_apply").find("tr:odd td").css({"border-bottom" : "1px solid #EFEFEF"});
	$(".site_apply").find("tr:last td").css({"border-bottom" : "none"});


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




	// 네비게이션 설정
	$("#header").find(".nav").append("<span class='nav_bg'></span>");
	$("#header").find(".nav").append("<span class='sub_bg'></span>");

	$(".nav > ul").find("> li").filter(function(){
		var itm_w = $(".nav").width();
		var itm_s = $(".nav > ul").find("> li").size();
		var itm = itm_w / itm_s;

		if ($(this).parent().attr("class") == "sub_nav pro" || $(this).parent().attr("class") == "sub_nav com"){

		} else {

			$(".nav > ul").find("> li").width(itm);
		}

		var nav_img = $(this).find("img");
		if (nav_img.parent().hasClass("on") > 0){
			//nav_img.attr("src", nav_img.attr("src").replace("_off.png","_on.png"))
		}

		var img = $(this).find("img");

		if ($(this).find(".menu_list li a.on").size() > 0){
			//$(img).attr("src", $(img).attr("src").replace("_off.png","_on.png"));
			$(this).find(".menu_list").show();
			$(".sub_bg").show();
		} else {

			$(this).find(".menu_list").hide();
		}

	});

	$(".top_nav > ul").find(">li").filter(function(){
		if ($(this).find(".menu_list li a.on").size() > 0){
			$(this).find(".menu_list").show();
			$("#banner").show();
		} else {

			$(this).find(".menu_list").hide();
		}
	});

	$(".top_nav > ul").find("> li").hover(function(){

		if ($(this).find(".menu_list a.on").size() > 0 ){
			$(this).find(".menu_list").show();

		} else {
			$(".top_nav > ul > li").find(".menu_list").hide();

		}

		$(this).find(".menu_list").slideDown("fast");

	}, function(){

		$(".top_nav > ul").find(">li").filter(function(){
			if ($(this).find(".menu_list li a.on").size() > 0){
				$(this).find(".menu_list").show();
				$("#banner").show();
			} else {

				$(this).find(".menu_list").hide();
			}
		});



	});

	$(".nav").hover(function(){

		if ($(".nav li").find("ul").size() == 0){
			$(".sub_bg").hide();
		} else {
			$(".sub_bg").slideDown("fast");
		}
	}, function(){
		if ($(this).find(".menu_list li a.on").size() > 0){
			var li_select = $(".menu_list").find("a.on").parent().parent().parent();
			li_select.show();
			//li_select.parent().find("img:first").attr("src", li_select.parent().find("img:first").attr("src").replace("_off.png","_on.png"));
			$(".sub_bg").show();
		} else {
			$(".sub_bg").slideUp("fast");
		}
	});


	$(".nav > ul").find("> li").hover(function(){
		$(".nav").find("img").each(function(i){
			//$(this).attr("src", $(this).attr("src").replace("_on.png","_off.png"));
		});

		if ($(this).find(".menu_list a.on").size() > 0 ){
			$(this).find(".menu_list").show();

		} else {
			$(".nav > ul > li").find(".menu_list").hide();

		}

		$(this).find(".menu_list").slideDown("fast");
		//$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.png","_on.png"));

	}, function(){

		$(".nav").find("img").each(function(i){
			if ($(this).parent().hasClass("on") > 0) {
				//$(this).attr("src", $(this).attr("src").replace("_off.png","_on.png"));
			}
		});

		$(this).find(".menu_list").hide();
		//$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.png","_off.png"));
	});


	// 메인 참여기업
	$(".main_intern").slides({
		effect: 'slide',
		play: 3500,
		pause: 1000,
		hoverPause: true,
		fadeSpeed: 450,
		generatePagination: false,
		generateNextPrev: false
	});

	// 메인 인턴쉽
	$(".main_internship").slides({
		effect: 'slide',
		play: 3500,
		pause: 1000,
		hoverPause: true,
		fadeSpeed: 450,
		generatePagination: false,
		generateNextPrev: false
	});


	// 사이드 메뉴
	$(".side_menu > ul > li").find("ul > li").addClass("sub_list");
	$(".side_menu > ul > li").find("ul > li:last").css({"border-bottom" : "0"});
	$(".side_menu").find(".on").filter(function(){
		var sub_list = $(".sub_list").find("a");

		$(this).find("img").attr("src", $(this).find("img").attr("src").replace(".gif","_on.gif"));
		$(this).next().show();

		if ($(".sub_list").find(".on").size() > 0){
			$(this).parent().parent().show();
		}
	});


	$(".side_menu").find("a").hover(function(){
		if ($(this).hasClass("on") > 0){
			$(this).find("img").attr("src", $(this).find("img").attr("src"));
		} else if ($(this).next().size() > 0){
			if ($(this).next().is(":animated")){
				return false;
			}

			$(this).next().slideDown("fast");
		} else {
			$(this).attr("title", $(this).find("img").attr("alt"));
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace(".gif","_on.gif"));
		}
	} , function() {
		if  ($(this).hasClass("on") > 0){
			$(this).find("img").attr("src", $(this).find("img").attr("src"));
		} else {
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.gif",".gif"));
		}
	});

	$(".side_menu").find("> ul > li").mouseleave(function(){
		if ($(this).find(".on").size() > 0){
			$(this).find("ul").show();
		} else {
			$(this).find("ul").slideUp("fast");
		}
	});

	// 참여기업 검색
	$(".search").find("input[type='text']").focus(function(){
		$(this).addClass("on");
		$(this).parent().css({"border-color" : "#83AACD"});
	});
	$(".search").find("input[type='text']").blur(function(){
		if ($(this).val().length == 0) {
			$(this).removeClass("on");
			$(this).parent().css({"border-color" : "#EAEAEA"});
		}
	});

	// 메인 비주얼
	$(".visual_slides").slides({
		effect: 'slide',
		play: 0,
		pause: 1000,
		hoverPause: true,
		fadeSpeed: 450,
		generatePagination: false,
		generateNextPrev: false
	});

	// 메인 왼쪽메뉴
	$(".link_solution").find(".pagination").find("li").filter(function(){
		if ($(this).hasClass("current") > 0){
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace(".png","_on.png"));
		} else {
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.png",".png"));
		}
	});
	$(".link_solution").find(".pagination").find("img").click(function(){
		var chg_tab = $(".link_solution").find(".pagination").find("img");

		for (i = 0; i < chg_tab.size() ; i++ ){
			if($(chg_tab[i]).attr("src").indexOf("_on.png") > 0){
				$(chg_tab[i]).attr("src",$(chg_tab[i]).attr("src").replace("_on.png",".png"));
			}
		}

		if ($(this).attr("src").indexOf("_on.png") > 0){
			$(this).attr("src", $(this).attr("src"));
		} else {
			$(this).attr("src", $(this).attr("src").replace(".png","_on.png"));
		}
	});

	// Stu Slide Setting
	$(".stu_slide").filter(function(){
		var box_h = $(this).find("li").height();
		var con_h = $(this).find("li span").height();
		var con_pos = (box_h - con_h)/2;
		$(".stu_slide ul li span").css({"margin-top" : (con_pos-10) + "px"});

		if ($(this).find(".slide_box").size() > 1){
			$(".prev_a").show();
			$(".next_a").show();
		} else {
			$(".prev_a").hide();
			$(".next_a").hide();
		}
	});

	// 메인 탭 슬라이드
	$(".stu_con_slide").slides({
		effect: 'slide',
		pause: 1000,
		hoverPause: true,
		fadeSpeed: 450,
		generatePagination: false,
		generateNextPrev: false,
		container: 'slides_cont',
		 prev: 'prev_a',
		 next: 'next_a'
	});


	// 달력
	 $(".datepicker").datepicker({
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd', //형식(2012-03-03)
		autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
		changeMonth: true, //월변경가능
		changeYear: true, //년변경가능
		showMonthAfterYear: true, //년 뒤에 월 표시
		buttonImageOnly: true, //이미지표시
		buttonImage: '../images/btn/btn_calendar.gif', //이미지주소
		showOn: "both"
	   });
	 
	// 달력 //2016.04.19 이력서-경력사항 (년도 월)
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

	// 필터 설정 버튼
	$(".btn_filter").find("a").click(function(){
		if ($(this).parent().parent().next().is(":animated")){
			return false;
		} else if ($(this).hasClass("on") > 0){
			$(this).removeClass("on");
			$(this).parent().parent().next().slideUp("fast");
			$('#filterYn').val("N");
		} else {
			$(this).addClass("on");
			$(this).parent().parent().next().slideDown("fast");
			$('#filterYn').val("Y");
		}
	});


	$(".content_area").filter(function(){
		$("dl.type_02, dl.type_03, dl.type_04, dl.type_05, dl.type_06, dl.type_07").filter(function(){			
			 if ($(this).find("dd").size() >= 5){
				$(this).find("select").css({"width" : "60"});
			}
		});


		$(".gray_box dl").find("dd:last > input[type='text']").filter(function(){
			if ($(this).parent().prev().text() != "제목"){
				$(this).css({"width" : "100"});
			}
		});

		$("#term").css({"width" : "75"});
		$("#season").css({"width" : "75"});
	});


	// 푸터 영역 설정
	$("#footer .footer_menu").find("ul").filter(function(){
		$(this).find("li:last").css({"background" : "none"}); // 푸터 메뉴 마지막 Li 백그라운드 제거
	});


	$("body").filter(function(){
		$(this).append("<div class='overlay'></div>");
		$(".overlay").css({"opacity" : ".6"});
		$(".overlay").hide();

		if ($(window).height() > $(".overlay").height()){
			$(".overlay").height($(window).height());
		} else {
			$(".overlay").height($(document).height());
		}
	});


	// 로그인
	$(".layer_login").find("li:last").css({"margin" : "0"});

	// 로그인 팝업 탭 (이전 로그인 유저타입 변경)
//	$(".layer_login .menu li").find("a").live("click focus", function(){
//		var temp_g_tab = $(".layer_login .menu").find("a");
//
//		for (i = 0; i < temp_g_tab.size() ; i++ ){
//			if($(temp_g_tab[i]).find("img").attr("src").indexOf("_on.png") > 0){
//				$(temp_g_tab[i]).find("img").attr("src",$(temp_g_tab[i]).find("img").attr("src").replace("_on.png","_off.png"));
//				$(temp_g_tab[i]).removeClass("on");
//			}
//		}
//		$(this).addClass("on");
//		$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.png","_on.png"));
//	});
	
	// 로그인 팝업 탭 (20160406 메인페이지 로그인 유저타입변경)
	$(".login-block .type ").find("a").live("click focus", function(){
		var temp_g_tab = $(".login-block .type").find("a");

		for (i = 0; i < temp_g_tab.size() ; i++ ){
				$(temp_g_tab[i]).removeClass("selected");
		}
		$(this).addClass("selected");
	});

	// 로그인 팝업 도움말
	$(".layer_login").find(".btn").click(function(){
		$(this).find(".login_helper").slideToggle("fast");
	});

	$(".find_zip").click(function(){
		lay_pop();
		$(".layer_post").fadeIn("fast");
		$(".overlay").fadeIn("fast");
	});

	// 우편번호검색 input 클릭
	$(".layer_post").find("input[type='text']").attr("title", $(".layer_post").find("input[type='text']").val());
	$(".layer_post").find("input[type='text']").focus(function(){
		if ($(this).attr("title") != undefined ){
			if ($(this).attr("title") ==$(this).val()) {
				$(this).val("");
			}
		}
	});
	$(".layer_post").find("input[type='text']").blur(function(){
		if ($(this).val().length == 0) {
			$(this).val($(this).attr("title"));
		}
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

	// 이력서작성-종합보고서작성
	$(".report_write .sub_tab02").find("li").click(function(){
		$(".report_write .sub_tab02").find("li").removeClass("on");
		$(".report_write").find(".table_area").hide();
		$(".report_write .sub_tab02 li").find("img").attr("src", $(".report_write .sub_tab02 li").find("img").attr("src").replace("_on.gif",".gif"));
		$(this).addClass("on");

		var temp_g_tab =  $(".report_write .sub_tab02").find("li");
		var temp_g_view =  $(".report_write").find(".table_area");

		for (i = 0; i < temp_g_tab.size() ; i++ ){
			if($(temp_g_tab[i]).hasClass("on") > 0){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace(".gif","_on.gif"));
				$(temp_g_view[i]).show();
			}
		}
	});

	// 테이블 스크롤
	table_scroll();


	$(".btn_blue").filter(function(){
		if ($(this).find("a").text() == "검색"){
			$(this).addClass("btn_search");
		}
	});


	// 실습 후기 슬라이드
	$(".biz_photo").find("a").click(function(){
		$(".com_re_view").show();
		lay_pop();
		$(".overlay").fadeIn("fast");
	});


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


/*	$(".grid_body").filter(function(){
		$(this).height($(this).height() + 100);
	});*/



	$(".gray_box dl").find("dd:last").css({"margin-right" : "0"});


	$(".gray_box dl.type_07:last").removeClass("b_line").css({"margin-bottom" : "0"});


	$(".small_type01").find(".score > li:first > input[type='checkbox']").css({"background-color" : "#F2F2F2"});

	$(".cont_txt").filter(function(){
		$(this).find("img").wrap("<p class='bbs_img'></p>");
	});



	$("#surveytable").find("tr").filter(function(){
		$(this).mousedown(function(){
			$(this).find("td").css({"background" : "#DEF"});
		});

		$("body").mouseup(function(){
			$("#surveytable").find("tr td").css({"background" : "none"});
		});
	});




	$(".com_list").filter(function(){
		if ($(this).find(".com_re_list").size() == 0){
			$(this).find(".com_cont").addClass("com_con_list")
		}
	});

	// 서브 페이지 에서 로고 클릭시 넘어오는 메인 비주얼 설정


	$(".main_section").filter(function(){
		if ($("#wrap").find(".nav").size() > 0){
			$("body").removeClass("main").addClass("main02");
			$(".sub_visual").hide();
			$(".main_visual").addClass("main_visual_02");
			$(".contents_info").css({"padding" : "10px 0 167px 0"});
			//$(".main_section").css({"margin-top" : "-69px"});
			//$(".nav").css({"margin-top" : "21px"});
			//$(".contents_info").css({"padding-bottom" : "161px", "top" : "150px"});
			$(".main_section").addClass("ad_ie7");
			$("#footer").addClass("ad_ft_ie7");
		}
	});

	$(".main_section").filter(function(){
		if ($("#wrap").find(".top_nav").size() > 0){
			$("body").removeClass("main").addClass("main02");
			$(".sub_visual").hide();
			$(".main_visual").addClass("main_visual_02");
			$(".contents_info").css({"padding" : "10px 0 167px 0"});
			//$(".main_section").css({"margin-top" : "-69px"});
			//$(".nav").css({"margin-top" : "21px"});
			//$(".contents_info").css({"padding-bottom" : "161px", "top" : "150px"});
			$(".main_section").addClass("ad_ie7");
			$("#footer").addClass("ad_ft_ie7");
		}
	});

});


function table_scroll(){
	// 테이블 스크롤
	$(".grid_body").scroll(function() {
		grid_width = $(this).scrollLeft() *(-1);

		$(".grid_header").css("margin-left",grid_width+"px");

	});

}

function setHeader(chk){
	$(".type_03").find(".input_chk").each(function(i){
		if(chk){
			if(!$(this).is(':checked')){
				$(this).attr('checked' , true);
				hiddenList($(this).attr('id'));
			}
		}else{
			if($(this).is(':checked')){
				$(this).attr('checked' , false);
				hiddenList($(this).attr('id'));
			}
		}
	});
}

function initHeader(plusSize){
	var initTableSize = 0;
	$(".grid_header_wrap > div > table > thead > tr").find("> th").each(function(i){
		if($(this).css("display") != "none"){
		initTableSize = initTableSize + parseInt($(this).attr("width").replace("px", ""));
		}
	});
//	alert(initTableSize);
	$(".table_size").width((initTableSize+plusSize)+'px');
}

(function (){
	var msession=function (){
		$.get("/", function(res){});
		setTimeout(msession, 1000*60*10);
	}
	setTimeout(msession, 1000*60*10);
})();