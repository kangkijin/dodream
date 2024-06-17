// JavaScript Document

var init = "open";
//반응형 메뉴
function responseLoad() {
	if ($(window).outerWidth() > 1024 && (init == "open" || init == "mForm")) {
		// 모바일용 이벤트 제거
		$('.pp_mobile_menubtn, .pp_mobile_menuclose').off("click");
		$('.pp_1depth_gnb > a').off("click");

		$('.pp_subgnb_bg').height(60);
		$('.pp_2depth_wrap, .pp_subgnb_bg').hide();
		$('.pp_1depth_gnb > a').css('color', '#3a3a3a');
		$('#pp_container, .pp_footer_wrap, .pp_main_wrap').show();

		//PC gnb메뉴
		$('.pp_1depth_gnb').bind('mouseover focusin', function () {
			$('ul:first', this).stop().slideDown(300);
			$('.pp_subgnb_bg').stop().slideDown(300);
			$(this).children('a').css('color', '#1a5592');
		});
		$('.pp_1depth_gnb').bind('mouseleave focusout', function () {
			$('ul:first', this).stop().slideUp(300);
			$('.pp_subgnb_bg').stop().slideUp(300);
			$(this).children('a').css('color', '#3a3a3a');
		});

		init = "pcForm";

	} else if ($(window).outerWidth() < 1025 && (init == "open" || init == "pcForm")) {
		//PC 이벤트 제거
		$(".pp_1depth_gnb, .pp_subgnb_bg").off("mouseover mouseleave");
		$(".pp_1depth_gnb, .pp_subgnb_bg").off("focusin focusout");

		// 모바일환경에서 설정 초기화
		$('.pp_subgnb_bg').hide();
		$('.pp_2depth_wrap').height('auto');

		// tab-mobile -1depth on
		$('.pp_subgnb_bg').height('auto');
		$('.pp_1depth_gnb > a').css('color', '#ffffff');

		$('.pp_gnb_wrapper, .pp_tnb_wrap').css('left', '-100%');
		$('.pp_mobile_menubtn').show();
		$('.pp_mobile_menuclose').hide();
		var headerHeight = $('.pp_header_wrap').height();
		$('.pp_subgnb_bg').height($(window).height() - headerHeight - 1);
		// mobile slide menu
		$('.pp_mobile_menubtn').on("click", function () {
			$('.pp_subgnb_bg').height($(window).height() - headerHeight - 1);
			$('.pp_subgnb_bg').css('display', 'block');
			$('.pp_gnb_wrapper, .pp_tnb_wrap').animate({
				left: 0
			}, 300);
			$('#pp_container, .pp_footer_wrap, .pp_main_wrap').fadeOut();
			$(this).hide();
			$('.pp_mobile_menuclose').show();
		});
		$('.pp_mobile_menuclose').on("click", function () {
			$('.pp_gnb_wrapper, .pp_tnb_wrap').animate({
				left: '-100%'
			}, 300);
			$('.pp_subgnb_bg').css('display', 'none');
			$('#pp_container, .pp_footer_wrap, .pp_main_wrap').fadeIn();
			$(this).hide();
			$('.pp_mobile_menubtn').show();
		});
		// tab-mobile -2depth on
		$('.pp_2depth_wrap').hide();
		$('.pp_1depth_gnb > a').click(function () {
			if ($(this).next().children().is(':hidden')) {
				$(this).parent().parent().find('.pp_2depth_wrap').slideUp();
				$(this).next().children().slideDown();
			} else {
				$(this).next().children().slideUp();
			}
		});

		// mobile size
		if ($(window).outerWidth() < 767) {
			
		}
		init = "mForm";
	}
};

// 슬라이더영역 높이값 채워주기
function sliderHeight() {
	var mainHeight = $('.pp_page_wrap').height();
	var headerHeight = $('.pp_header').height();
	$('.pp_slide').css('min-height', mainHeight - headerHeight);
};

// FAQ	
function faqList() {
	$('.pp_faqlist dt').on('click', function () {
		$(this).toggleClass('on');
		$(this).next('dd').slideToggle('fast');
	});
}

var timer;
window.onresize = function () {
	if (timer) clearInterval(timer);
	timer = setTimeout(resizeEnd, 200);
};

function resizeEnd() {
	responseLoad();
	sliderHeight();
};

$(window).on("load", function () {
	
	//lnb 높이값 100%채워주기
	var windowHeight = $(window).height();
	$('.pp_lnb_wrap').css('min-height', windowHeight - 425);
	
	
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 custom
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".pp_scrollx_tbl, .pp_scrollx_tbl_sm, .pp_scrollx_tbl_md, .pp_scrollx_tbl_lg, .pp_scrollx_tbl_xl").off(mCustomScrollbar);
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".pp_scrollx_tbl_lg, .pp_scrollx_tbl_xl").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: true
				}
			});
			$(".pp_scrollx_tbl, .pp_scrollx_tbl_sm, .pp_scrollx_tbl_md").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: false
				}
			});
		};
	};
	
});

$(document).ready(function () {
	responseLoad();
	sliderHeight();
	faqList();

	/*gnb_keyboard_access('.pp_gnb_wrap');*/
	$('.pp_gnb_wrapper').accessibleMegaMenu();
	
	// top btn hide
	$(".pp_top_btn").hide();
	// fade in #gotop
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.pp_top_btn').fadeIn();
		} else {
			$('.pp_top_btn').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('.pp_top_btn').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	// bx-slider
	$('.bxslider').bxSlider({
		auto: true, //회전 자동
		pause: 5000,
		speed: 1000, //슬라이드 속도
		moveSlides:1, //한개씩 이동
		controls: false, // prev, next  제거
		autoHover:true, // 오버되어있을때 슬라이딩이 멈춤
		adaptiveHeight: true,
		autoControls: true //시작,정지버튼 on
	});

	// tab - 모양만 class on으로 스타일 바꿔주기
	$('.pp_shapetab > li > a').click(function () {
		$('.pp_shapetab > li').removeClass('on');
		$('.pp_shapetab > li > a').removeClass('on');
		$(this).addClass('on');
		$(this).parent().addClass('on');
	});

	//tab - show, hide
	$('.pp_showtab, .pp_rental_tab').each(function () {
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
		$active.addClass('on');

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on('click', 'a', function (e) {
			$active.removeClass('on');
			$content.hide();

			$active = $(this);
			$content = $(this.hash);

			$active.addClass('on');
			$content.show();

			$('.pp_showtab li, .pp_rental_tab li').removeClass('on');
			if ($('.pp_showtab a, .pp_rental_tab a').hasClass('on')) {
				$active.parent().addClass('on');
			}

			e.preventDefault();
		});
		
	});

	// 이미지 클릭시 라이트박스
	$('.pp_openimg').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		callbacks: {
			resize: changeImgSize,
			imageLoadComplete: changeImgSize,
			change: changeImgSize
		}
	});

	function changeImgSize() {
		var img = this.content.find('img');
		img.css('max-height', '100%');
		img.css('height', 'auto');
		img.css('width', 'auto');
		img.css('max-width', '810px');
	};
	
	// 공간선택 시 클래스 on
	$('.pp_rental_roomlist').find('a').removeClass('on');
	$('.pp_rental_roomlist a').on('click', function (){
		$('.pp_rental_roomlist').find('a').removeClass('on');
		$(this).addClass('on');
	});
	
	// 예약가능,시간선택 토글 체크박스
	$('.pp_rental_toggle').on('click', function () {
		if ($(this).children('input').is(':checked')) {
			$(this).parent().parent().addClass('bg_on');
		} else {
			$(this).parent().parent().removeClass('bg_on');
		}
	});

	// 특허소개 toggle slideup/down
	$('.pp_toggleinfo_box dd').hide();
	$('.pp_toggleinfo_box dt').on('click', function () {
		$(this).toggleClass('on');
		$('.pp_toggleinfo_box dd').slideToggle('fast');
		if ($(this).hasClass('on')) {
			$(this).text('내용닫기');
		} else {
			$(this).text('내용보기');
		}
	});

});

//브라우저 하위버전 접속시 페이지 상단 알림창 닫기
$('.pp_upgradeinfo_close').on('click', function () {
	$('#pp_iever_upgradeinfo').slideUp();
});

// gnb 키보드 접근성
$(".pp_gnb_wrapper").accessibleMegaMenu({
	/* prefix for generated unique id attributes, which are required 
               to indicate aria-owns, aria-controls and aria-labelledby */
	uuidPrefix: "accessible-megamenu",

	/* css class used to define the megamenu styling */
	menuClass: "nav-menu",

	/* css class for a top-level navigation item in the megamenu */
	topNavItemClass: "nav-item",

	/* css class for a megamenu panel */
	panelClass: "sub-nav",

	/* css class for a group of items within a megamenu panel */
	panelGroupClass: "sub-nav-group",

	/* css class for the hover state */
	hoverClass: "hover",

	/* css class for the focus state */
	focusClass: "focus",

	/* css class for the open state */
	openClass: "open"
});

// outline 설정 - 키보드로 접근할때만 focus 시 아웃라인 노출
(function (focusLine) {
	var style_element = focusLine.createElement('STYLE'),
		dom_events = 'addEventListener' in focusLine,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				focusLine.addEventListener(type, callback);
			} else {
				focusLine.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};

	focusLine.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});

	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #797979;}::-moz-focus-inner{border:dotted 1px #797979;}');
	});

})(document);