
// header 반응형
function headerStyle() {
	var windowWidth = $(window).outerWidth();
	var select = $('.select_lang').children('p');
	var selectList = select.next().children('li');

	if (windowWidth < 1025) {
		//console.log('모바일,태블릿');

		//PC 이벤트 제거
		$('body').removeClass('on');
		$('.btn_menu').removeClass('on');
		$('.gnb_1depth > li > a').unbind('mouseenter');
		$('.gnb_submenu').removeAttr('style');
		$('.gnb_submenu').unbind('mouseenter');
		$('.gnb_submenu .gnb_2depth').removeAttr('style');
		$('.gnb_submenu .gnb_2depth').hide();

		// 기본 설정
		$(".function_area").prependTo($(".gnb_submenu"));

		// gnb
		$('.btn_menu').on('click', function(e){
			e.stopImmediatePropagation();
			$('.gnb_list').removeClass('on');
			$('.gnb_2depth').stop().slideUp(200);
			if( $(this).hasClass('on') ){
				$('body').removeClass('on');
				$(this).removeClass('on');
				selectList.parent().slideUp(400);
			} else {
				$('body').addClass('on');
				$(this).addClass('on');
			}
		});

		// 2depth
		$('.gnb_list .gnb_tit').on('click', function(e){
			e.stopImmediatePropagation();
			$('.gnb_list').removeClass('on');
			$('.gnb_2depth').stop().slideUp(200);
			if( $(this).next('ul').is(':visible') ){
				$(this).parent().removeClass('on').children('ul').stop().slideUp(200);
			} else {
				$(this).parent().addClass('on').children('ul').stop().slideDown(200);
			}
		});

	} else {
//		console.log("PC");

		//TABLET,MOBILE 이벤트 제거
		$('body').removeClass('on');
		$('.btn_menu').removeClass('on');
		$('.gnb_submenu').removeAttr('style');
		$('.gnb_submenu .gnb_2depth').removeAttr('style');

		// 기본 설정
		
		$(".function_area").appendTo($(".gnb_wrap"));

		// 1depth
		// 마우스오버시 하위메뉴 show/hide :
		$('.gnb_1depth > li').on({
			'mouseenter focus':function(){
				$('.gnb_1depth > li > a').removeClass('on');
				$(this).addClass('on');
				$('.gnb_submenu').stop().slideDown(200);
			},
			'mouseleave blur':function(){
				$('.gnb_submenu').stop().slideUp();
				$('.gnb_1depth > li').removeClass('on');

				$('.gnb_submenu').on({
					'mouseenter focus':function(){
						$('.gnb_submenu').stop().slideDown(200);
					},
					'mouseleave blur':function(){
						$('.gnb_submenu').stop().slideUp(200);
					}
				});
			}
		})

		// 상위메뉴에 하이라이트 효과주기
		$('.gnb_submenu .gnb_list').on({
			'mouseenter focus':function(){
				var target = $(this).index();
				$('.gnb_1depth').children('li').eq(target).addClass('on');
			},
			'mouseleave blur':function(){
				var target = $(this).index();
				$('.gnb_1depth').children('li').eq(target).removeClass('on');
			}
		});

	}
}

// chatbot click
function chatbotClick() {

	var chatbot = $('.chatbot');
	var area = $('.chat_area');
	var close = $('.chat_close');
	var close2 = $('.help_close');
	var windowWidth = $(window).outerWidth();

	chatbot.off();

	if (windowWidth > 1025) {
		//chatbot.on('click',function(){
		//	if(area.hasClass('on')){
		//		area.removeClass('on');
		//	}else {
		//		area.addClass('on');
		//	}
		//});
		close.on('click',function(){
			$(this).parents(area).removeClass('on');
			$('.chat_header .select_lang ul').slideUp(400);
		});
		close2.on('click',function(){
			$(this).parents(area).removeClass('on');
		});
	} 
}

// 윈도우 resize 시 header 반응형
function resizeTimer(){
	var resizeTimer;
	$( window ).on( 'resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeEnd, 1000);
	} );
	function resizeEnd() {
		headerStyle();
		chatbotClick();
	}
}

// 메인 - 언어선택 셀렉트박스
function selectLangBox(){

	//var windowWidth = $(window).outerWidth();
	var select = $('.select_lang').children('p');
	var selectList = select.next().children('li');

	select.on('click',function(e){
		e.stopImmediatePropagation();
		$(this).next().stop().slideToggle('fast');
	});

	selectList.on('click',function(){
		selectList.not($(this)).removeClass('on');
		$(this).addClass('on');
		$(this).parent().slideUp(400);
	});

	// 클릭시 변환
	$('.lang_kr').parent().on('click',function(){
		$(this).parent().siblings(select).html('KR<span class="lang_kr"></span>');
	});
	$('.lang_us').parent().on('click',function(){
		$(this).parent().siblings(select).html('EN<span class="lang_us"></span>');
	});
	$('.lang_cn').parent().on('click',function(){
		$(this).parent().siblings(select).html('CN<span class="lang_cn"></span>');
	});
	$('.lang_vn').parent().on('click',function(){
		$(this).parent().siblings(select).html('VN<span class="lang_vn"></span>');
	});

	// 윈도우 resize 시 변환
	$(window).resize(function(){
		if ( $('.lang_kr').parent().hasClass('on') === true ) {
			$(this).parent().siblings(select).html('KR<span class="lang_kr"></span>');
		} else if ( $('.lang_us').parent().hasClass('on') === true ) {
			$(this).parent().siblings(select).html('EN<span class="lang_us"></span>');
		} else if ( $('.lang_cn').parent().hasClass('on') === true ) {
			$(this).parent().siblings(select).html('CN<span class="lang_cn"></span>');
		} else if ( $('.lang_vn').parent().hasClass('on') === true ) {
			$(this).parent().siblings(select).html('VN<span class="lang_vn"></span>');
		}
	});
}

// swiper - 메인 슬라이드 이미지
function swiperSlide1() {
	var swiper1 = new Swiper('.swiper_mainimg', {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper_mainimg .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper_mainimg .swiper-button-next',
			prevEl: '.swiper_mainimg .swiper-button-prev',
		},
	});

	//var pagingSwiper = new Swiper(".swiper_mainimg", {
	//	pagination: {
	//	  el: ".swiper_mainimg .swiper-pagination2",
	//	  clickable: true,
	//	  type : 'fraction',
	//	//  renderCustom: function (swiper, current, total) {
	//	//	return current + ' of ' + total;
	//	//  },
	//	},
	//});

	$(".slide_start").on("click", function () {
		$(".slide_stop").removeClass("on");
		$(this).addClass("on");
		swiper1.autoplay.start();
	});
	$(".slide_stop").on("click", function () {
		$(".slide_start").removeClass("on");
		$(this).addClass("on");
		swiper1.autoplay.stop();
	});
}

//swiper - 메인 추천대학
function swiperSlide2() {
	$(".main_unirecommend .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass('instance1-' + index);

		var swiper = new Swiper('.instance1-' + index, {
			slidesPerView: 5,
			//slidesPerGroup : 5,
			spaceBetween: 20,
			//loop: true,
			/*loopFillGroupWithBlank: true,*/
			/*autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},*/
			pagination: {
				el: $('.instance1-' + index).siblings('.swiper-pagination'),
				clickable: true,
				//type: 'custom',
				//renderCustom: function (swiper, current, total) {
				//	return '<span>' + ('0' + current).slice(-2) + '</span>' + '/' + '<span>' + ('0' + total).slice(-2) + '</span>';
				//}
			},
			navigation: {
				nextEl: $('.instance1-' + index).siblings('.swiper_control_wrap').children('.swiperbtn_next'),
				prevEl: $('.instance1-' + index).siblings('.swiper_control_wrap').children('.swiperbtn_pre')
			},
			breakpoints: {
				1024: {
					slidesPerView: 4.2,
					spaceBetween: 10
				},
				768: {
					slidesPerView: 3.3,
					spaceBetween: 10
				},
				480: {
					slidesPerView: 2.3,
					spaceBetween: 5,
				}
			}
		});
	});
}

//swiper - 메인 대학목록 : 인증대학, 특성화대학
function swiperSlide3() {
	$(".unicatalog_wrap .uni_list .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass('instance2-' + index);

		var swiper = new Swiper('.instance2-' + index, {
			slidesPerView: 5,
			spaceBetween: 5,
			loop: false,
			loopFillGroupWithBlank: true,
			navigation: {
				nextEl: $('.instance2-' + index).siblings('.swiperbtn_next'),
				prevEl: $('.instance2-' + index).siblings('.swiperbtn_pre')
			},
			breakpoints: {
				1279: {
					slidesPerView: 4
				},
				1024: {
					slidesPerView: 3.7
				},
				768: {
					slidesPerView: 2.7
				},
				480: {
					slidesPerView: 1.7
				}
			}
		});
	});
}

//swiper - 메인 대학목록 : 지역별 대학
function swiperSlide4() {
	$(".mapsel_wrap .uni_list .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass('instance3-' + index);

		var swiper = new Swiper('.instance3-' + index, {
			slidesPerView: 3,
			slidesPerColumn: 3,
			spaceBetween: 5,
			loop: false,
			//loopFillGroupWithBlank: true,
			pagination: {
				el: $('.instance3-' + index).children('.swiper-pagination'),
				clickable: true,
				//type: 'custom',
				//renderCustom: function (swiper, current, total) {
				//	return '<span>' + ('0' + current).slice(-2) + '</span>' + '/' + '<span>' + ('0' + total).slice(-2) + '</span>';
				//}
			},
			navigation: {
				nextEl: $('.instance3-' + index).siblings('.swiper_control_wrap').children('.swiperbtn_next'),
				prevEl: $('.instance3-' + index).siblings('.swiper_control_wrap').children('.swiperbtn_pre')
			},
			breakpoints: {
				1024: {
					slidesPerView: 2
				},
			}
		});
	});
}

//swiper - Dream Guide - 유학후기
function swiperSlide5() {
	$(".studyreview_card .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass('instance4-' + index);

		var swiper = new Swiper('.instance4-' + index, {
			slidesPerView: 4,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiperbtn_next',
				prevEl: '.swiperbtn_pre',
			},
			pagination: {
				el: $('.instance4-' + index).siblings('.swiper-pagination'),
				clickable: true,
				//type: 'custom',
				//renderCustom: function (swiper, current, total) {
				//	return '<span>' + ('0' + current).slice(-2) + '</span>' + '/' + '<span>' + ('0' + total).slice(-2) + '</span>';
				//}
			},
			breakpoints: {
				1025: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 2.1,
				},
				481: {
					slidesPerView: 1.2,
				}
			}
		});
	});
}

//swiper - Do Talking - Ask me
function swiperSlide6() {
	$(".askmecard_wrap.swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass('instance5-' + index);

		var swiper = new Swiper('.instance5-' + index, {
			slidesPerView: 2.5,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiperbtn_next',
				prevEl: '.swiperbtn_pre',
			},
			breakpoints: {
				768: {
					slidesPerView: 1.5
				},
				481: {
					slidesPerView: 1.2
				}
			}
		});
	});
}

//swiper - 메인 - 챗봇슬라이드
function swiperSlide7() {
	
	var swiper7 = new Swiper('.chat_slider', {
		slidesPerView: 1.5,
		spaceBetween: 15,
		observer: true,
		observeParents: true,
		loop: false,
		centeredSlides: false, 
		mousewheel: true,
		pagination: {
			el: ".chat_slider .swiper-pagination",
			dynamicBullets: true,
			//clickable: true,
		},
		on: {
			snapGridLengthChange : function() {
				this.slideTo(0);
			}
		},
		breakpoints: {
			1024: {
				slidesPerView: 3.5
			},
			768: {
				slidesPerView: 2.5
			},
			690: {
				slidesPerView: 1.5
			},
			480: {
				slidesPerView: 1.3
			}
		}   
	});
}

// 메인 - 선호지역 선택 지도
function mapSel(){
	var mapList = $('.mapsel_list');
	var mapCnt = $('.mapsel_cnt');
	mapCnt.find('img').hide();
	$('.' + mapList.find("input:checked").attr("data-img")).show();

	mapList.find('input').change(function() {
		var link = mapList.find("input:checked").attr("data-img");
		var mapImg = $('.' + link);
		mapCnt.find('img').not(mapImg).hide();
		mapImg.show();
	});
}

// tab 기능 : '.tab_js' 안에 '.tab_list_js' 와 '.tab_cnt_js'로 구분지어 사용.
function tab(){
	$('.tab_js').each(function(){
		var tabs = $(this).children('.tab_list_js').children('li').not('.disabled').children('a');
		var panels = $(this).children('.tab_cnt_js').children('div');
		var lastTab = tabs.filter('.on');
		var lastPanel = $(lastTab.attr('href'));
		panels.hide();
		lastPanel.show();
		tabs.on('click',function(e){
			e.preventDefault();
			var thisTab = $(this);
			var thisPanel = $(thisTab.attr('href'));
			lastTab.removeClass('on');
			thisTab.addClass('on');
			lastPanel.hide();
			thisPanel.show();
			lastTab = thisTab;
			lastPanel = thisPanel;
		});
	})
}

// tab 모양만 변경
function tabSwitch(){
	$('.tab_switch_js').each(function(){
		var tab = $(this).children('li').not('.disabled').children('a');

		tab.on('click',function(e){
			e.preventDefault();
			tab.removeClass('on');
			$(this).addClass('on');
		})
	})
}

// 책갈피 기능
function bookmark() {
	$('.bookmark_js').each(function(){
		var gotoTit = $(this).find('a');

		gotoTit.on('click',function(e){
			e.preventDefault();
			gotoTit.removeClass('on');

			var target = $(this).attr('href');

			if (target.length) {
				$(this).addClass('on');
				$('html,body').animate({
					scrollTop: $(target).offset().top - 220
				}, 'slow');
			}
		})
	})
}

// accordion : '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용.
function accordion(){
	$('.accordion_js').each(function(){
		var list = $(this).find('.acd_list_js');
		var contents = $(this).find('.acd_cnt_js');

		contents.hide();

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		list.filter('.on').next('.acd_cnt_js').show();

		// '.on'이 붙은 아이 속 화살표 페이지 진입시 방향 전환
		list.filter('.on').children('.btn_accordion').addClass('on');

		list.on('click',function(e){
			e.preventDefault();

			var thisList = $(this);
			var thisContents = thisList.next('.acd_cnt_js');
			var notThisList = list.not(thisList);
			var notThisContents = notThisList.next();
			var btn = thisList.find('.btn_accordion');

			notThisList.removeClass('on');
			notThisContents.slideUp(300);
			notThisList.children('.btn_accordion').removeClass('on');

			thisList.toggleClass('on');
			thisContents.stop().slideToggle(300);
			btn.toggleClass('on');
		});
	})
}

// multi accordion : 아코디언 안에 다른 아코디언 사용시 부모 아코디언에 사용. '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용.
function multiaAccordion(){
	$('.multiacd_js').each(function(){
		var list = $(this).children().children('.acd_list_js');
		var contents = $(this).children().children('.acd_cnt_js');

		contents.hide();

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		list.filter('.on').next('.acd_cnt_js').show();

		// '.on'이 붙은 아이 속 화살표 페이지 진입시 방향 전환
		list.filter('.on').children('.btn_accordion').addClass('on');

		list.on('click',function(e){
			e.preventDefault();

			var thisList = $(this);
			var thisContents = thisList.next('.acd_cnt_js');
			var notThisList = list.not(thisList);
			var notThisContents = notThisList.next();
			var btn = thisList.find('.btn_accordion');

			notThisList.removeClass('on');
			notThisContents.slideUp(300);
			notThisList.children('.btn_accordion').removeClass('on');

			thisList.toggleClass('on');
			thisContents.stop().slideToggle(300);
			btn.toggleClass('on');
		});
	})
}

// accordion with button : '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용. '.btn_accordion' 클릭시 아코디언 적용.
function accordionBtn(){
	$('.acdbtn_js').each(function(){
		var list = $(this).find('.acd_list_js');
		var contents = $(this).find('.acd_cnt_js');
		var btn = $(this).find('.btn_accordion');

		contents.hide();

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		btn.filter('.on').parents('.acd_list_js').next('.acd_cnt_js').show();

		btn.on('click',function(e){
			e.preventDefault();

			var thisList = $(this).parents('.acd_list_js');
			var thisContents = thisList.next('.acd_cnt_js');
			var notThisList = list.not(thisList);
			var notThisContents = notThisList.next();
			var notThisBtn = btn.not($(this));

			notThisBtn.removeClass('on');
			notThisList.removeClass('on');
			notThisContents.slideUp(300);

			$(this).toggleClass('on');
			thisList.toggleClass('on');
			thisContents.stop().slideToggle(300);
		});
	})
}

// 버튼 클릭시 '.on'으로 제어
function onoff(){
	$('.on_js').on('click',function(){
		$(this).toggleClass('on');
	});
}

// 셀렉트박스
function selectBox(){
	$('.select_form').each(function(){
		var target = $(this).children('select');
		var targetName = target.children('option:selected').text();
		var label = target.siblings('label');

		label.text(targetName);

		target.on('change',function(){
			var targetName = $(this).children('option:selected').text();
			label.text(targetName);
		});
	});
}

// 첨부파일
function attachment(){
	$('.attachment_list').children('li').children('.btn_close').on('click',function(){
		$(this).parent().hide();
	});
}

// 관심등록내역 선택항목 삭제
function checkDelete(){
	$('.btn_checkdelete').each(function(){
		$(this).on('click',function(e){
			e.preventDefault();
			$(this).parents('section').find('.box_checkdelete').find('.check_row, .check_only').find('input:checked').parents('.box_checkdelete').hide();
		});
	});
}

// 공유 버튼 말풍선
function speechBubble(){
	$('.speechbubble_wrap').children('button').on('click',function(){
		var thisBubble = $(this).next();
		var otherBubble = $(this).parent().siblings().children('.speech_bubble');

		if( otherBubble.is(':visible') === false ) {
			thisBubble.toggle();
		} else {
			otherBubble.hide();
			thisBubble.toggle();
		}
	});
	$('.speech_bubble').on('click',function(){
		$(this).hide();
	});
}

// 글자수 표기
function letterCount(){
	$('#letter_coount').keyup(function(){
		var content = $(this).val();
		$('#letter_counter').html(content.length + '/100');
	});
	$('#letter_coount').keyup();
}

// 댓글 삭제
function deleteComment(){
	$('.comment_list > li').each(function(){
		$(this).find('.btn_close').on('click',function(){
			$(this).parent().parent().hide();
		});
	});
}

// 첨부파일 썸네일 삭제
function deleteThumb(){
	$('.thumbnail_wrap').each(function(){
		$(this).find('.thumbnail').find('.btn_del').on('click',function(){
			$(this).parent().hide();
		});
	});
}

// 태그 삭제
function deleteTag(){
	$('.tag_label').each(function(){
		$(this).find('.btn_close').on('click',function(){
			$(this).parent().hide();
		});
	});
}
// Dream Guide 맞춤유학설계 단계
function designStep(){
	var tabs = $('.designstep_list').children('li').not('.disabled');
	var panels = $('.designstep_cnt').children('div');
	var lastTab = tabs.filter('.on');
	var lastPanel = $(lastTab.children('a').attr('href'));
	panels.hide();
	lastPanel.show();
	tabs.on('click',function(e){
		e.preventDefault();
		var thisTab = $(this);
		var thisPanel = $(thisTab.children('a').attr('href'));
		tabs.removeClass('on_prev');
		lastTab.removeClass('on');
		thisTab.addClass('on');
		thisTab.prev().addClass('on_prev');
		lastPanel.hide();
		thisPanel.show();
		lastTab = thisTab;
		lastPanel = thisPanel;
	});
}

// 검색박스 상세조건
function extraInfo(){
	$('.toggle_box').each(function(){
		var wrapper = $(this);
		wrapper.find('.btn_searchextra').on('click',function(){
			$(this).toggleClass('on');
			wrapper.find('.search_extra').slideToggle(300);
		});
	});
}

// 토글박스 : 댓글보기, 답변보기
function toggleCnt(){
	$('.tgbox_js').each(function(){
		var box = $(this).find('.tgcnt_js');

		box.hide();

		$(this).find('.btn_tg_js').on('click', function(){
			$(this).toggleClass('on');
			box.slideToggle(400);
		});
	});
}

// 라디오버튼 클릭시 on/off
function radioToggle(){

	$('.switch_js').on('click',function(){
		var check;
		var radio = $(this).find('input[type=radio]');

		radio.on('click',function(){
			check = !check;
			$(this).attr("checked", check);
		});

	});
}

// 정사각형 이미지
function squareSizing() {
	$('.square_js').each(function(){
		var imgBox = $(this);
		var width = imgBox.width();

		$(this).height(width);

		$( window ).on('resize',function(){
			var width = imgBox.width();
			imgBox.height(width);
		});
	});
}

// 이미지 리사이징
function imgResizing() {
	$('.resize_js').each(function(){
		var img = $(this).children('img');
		var imgWidth = img.get(0).naturalWidth;
		var imgHeight = img.get(0).naturalHeight;

		if ( imgWidth > imgHeight ) {
			// 가로형 이미지
			img.css({
				'max-width' : 'none',
				width : 'auto',
				height : '100%'
			});
		} else {
			// 세로형 이미지, 정사각형 이미지
			img.css({
				width : '100%',
				height : 'auto'
			});
		}
	});
}

// ask me 채택버튼
function bestReply(){
	$('.cnt_top').each(function(){
		var windowWidth = $(window).outerWidth();
		var btn = $(this).find('.best_reply');
		if ( windowWidth < 1025 ) {
			//console.log("테블릿");
			btn.appendTo( btn.parents('.cnt_top') );
		} else {
			//console.log("pc");
			btn.appendTo( btn.siblings('h3') );
		}

		$(window).on('resize',function(){
			var windowWidth = $(window).outerWidth();
			if ( windowWidth < 1025 ) {
				//console.log("테블릿");
				btn.appendTo( btn.parents('.cnt_top') );
			} else {
				//console.log("pc");
				btn.appendTo( btn.siblings('h3') );
			}
		});
	});
}

// 일본어,한자 사용시 줄바꿈 설정
function cjLineBreak(){
	var str = $('h1, h2, h3, h4, h5, h6, p, span, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, q, samp, small, strong, sub, sup, b, i, dl, dt, dd, ol, ul, li, label, th, td');
	var regEx = ".*[\
					\u2e80-\u2eff\ \\한중일 부수 보충\
					\u3040-\u309f\ \\ 히라가나 \
					\u30a0-\u30ff\ \\ 가타카나 \
					\u31c0-\u31ef\ \\한중일 한자 획\
					\u3200-\u32ff\ \\한중일 괄호 문자\
					\u3400-\u4dbf\ \\한중일 통합 한자 확장A\
					\u4e00-\u9fbf\ \\한중일 통합 한자\
					\uf900-\ufaff\ \\한중일 호환용 한자\
					].*";

	str.each(function(){
		if ( $(this).html().match(regEx) ) {
			// console.log('found');
			$(this).css('word-break','break-all');
		}
	});
}


// Dream Guide 쿠폰 click 이벤트
function couponClick(){
    $('.voucher_list').on('click',function(){
        $('.voucher_list').removeClass('on');
        $(this).addClass('on');
    });
}


// 원서접수 정보이용 동의 - 라디오 체크시 on 클래스 추가
function radioCheck(){
    $('.agree_point').on('click', function(e){
        e.preventDefault();
        var target = $(this).find('input');
        var prevParent = target.parents('.consent_content').siblings('.consent_acd');

        if(target.is(':checked')){
            target.prop('checked',false); prevParent.find('.check_agree_ori').removeClass('on');
        }else{
            target.prop('checked',true); prevParent.find('.check_agree_ori').addClass('on'); target.parents('.consent_content').slideUp(500);
            prevParent.children('.btn_accordion').removeClass('on');
        }
   });
}

// 모의고사 상단에 시간 고정
function examScroll() {
    $(window).scroll(function(){
        var exam = $('.test_timeer');
        var scrollmove = $(window).scrollTop();

       if (matchMedia('screen and (min-width: 1025px)').matches) {
            exam.removeClass('fixed');
            exam.removeClass('fixed2');
          // 1024px 이상에서 사용할 JavaScript
            if (scrollmove > 340) {
                exam.addClass('fixed');

            }else if (scrollmove <=340){
                exam.removeClass('fixed');
            }
        }else if(matchMedia('screen and (min-width: 769px)').matches){
            exam.removeClass('fixed');
            exam.removeClass('fixed2');
            // 768px 에서 사용할 JavaScript
            if (scrollmove > 270) {
                exam.addClass('fixed2');

            }else if (scrollmove <=270){
                exam.removeClass('fixed2');
            }
        }else {
            exam.removeClass('fixed');
            exam.removeClass('fixed2');
            // 768px 이하 에서 사용할 JavaScript
            if (scrollmove > 140) {
                exam.addClass('fixed2');

            }else if (scrollmove <=140){
                exam.removeClass('fixed2');
            }
        }
    });
}

//topik 이벤트 페이지 더보기 클릭
function viewMore(){
	var viewBox = $('.viewbox');
	var viewClick = $('.viewbox_click');
	
	viewClick.on('click', function(){
		if (viewBox.hasClass('on')) {
			viewBox.removeClass('on');
			$(this).html('<p>더보기<span></span></p>');
		}else {
			viewBox.addClass('on');
			$(this).html('<p>접기<span></span></p>');
		}
	});
}

//게시글 상세페이지 신고삭제 클릭
function reportClick() {
	var report = $(".report_wrap").find(".btn_report");
	var cnt = $(".report_wrap").find(".report_list");
	var cntList = cnt.find('a');
	
	report.off("click"); 

	report.on("click", function(){
		$(this).toggleClass("on");
		$(this).siblings(cnt).slideToggle(200);
	});

	cntList.on("click", function(){
		$(this).parent().parent().siblings(report).removeClass("on");
		$(this).parent().parent().slideUp(200);
	});
}

// 반응형 설정
/*function responsiveStyle(){}*/

// select2
function selectSearch(){
	$(".select_search select").select2({
		formatNoMatches: function() {
			return '결과가 없습니다.';
		}
	});
}

// magnific popup
function galleryPop() {
	$('.post_gallery, .gallery_pop').on('click', function () {
		$(this).next().magnificPopup('open');
	});
	$('.post_gallery, .gallery_pop').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('img');
				}
			}
		});
	});
}

// 토스트팝업
var intervalCounter = 0;

function hideToast(){
	var alert = document.getElementById("toast");
	alert.style.opacity = 0;
	clearInterval(intervalCounter);
	$("#toast").remove();
}

function drawToast(message){

	var alert = document.getElementById("toast");

	if (alert == null){
		var toastHTML = '<div id="toast">' + message + '</div>';
		document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	}
	else{
		alert.style.opacity = .9;
	}

	intervalCounter = setInterval("hideToast()", 1000);
}

// 테이블 스크롤 커스텀
function tableScroll() {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs, .scrollx_tbl_xxs").mCustomScrollbar("destroy");
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs, .scrollx_tbl_xxs").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: true,
					updateOnContentResize: true
				}
			});
		}
	}
}

$(document).ready(function(){

	// include HTML
	/*includeHTML(); */

	// header 반응형
	headerStyle();
	//챗봇 클릭
	 chatbotClick();
	// 윈도우 resize 시 header 반응형
	resizeTimer();

	// 메인 - 언어선택 셀렉트박스
	selectLangBox();

	// swiper - 메인 슬라이드 이미지
	swiperSlide1();

	// swiper - 메인 추천대학
	swiperSlide2();

	//swiper - 메인 대학목록 : 인증대학, 특성화대학
	swiperSlide3();

	//swiper - 메인 대학목록 : 지역별 대학
	swiperSlide4();

	//swiper - Dream Guide - 유학후기
	swiperSlide5();

	//swiper - Do Talking - Ask me
	swiperSlide6();

	//swiper - 메인 - 챗봇슬라이드
	swiperSlide7();

	// 메인 - 선호지역 선택 지도
	mapSel();

	// tab 기능
	tab();

	// tab 모양만 변경
	tabSwitch();

	// 책갈피 기능
	bookmark();

	// accordion
	accordion();

	// multi accordion
	multiaAccordion();

	// accordion with button
	accordionBtn();

	// 버튼 클릭시 '.on'으로 제어
	onoff();

	// 셀렉트박스
	selectBox();

	// 첨부파일
	attachment();

	// 관심등록내역 선택항목 삭제
	checkDelete();

	//  공유 버튼 말풍선
	speechBubble();

	// 글자수 표기
	letterCount();

	// 댓글 삭제
	deleteComment();

	// 첨부파일 썸네일 삭제
	deleteThumb();

	// 태그 삭제
	deleteTag();

	// Dream Guide 맞춤유학설계 단계
	designStep();

	// 검색박스 상세조건
	extraInfo();

	// 토글박스
	toggleCnt();

	// 라디오버튼 클릭시 on/off
	radioToggle();

	// 정사각형 이미지
	squareSizing();

	// 이미지 리사이징
	imgResizing();

	// ask me 채택버튼
	bestReply();

	// 일본어,한자 사용시 줄바꿈 설정
	cjLineBreak();

	// Dream Guide 쿠폰 click 이벤트
    couponClick();

    // 원서접수 정보이용 동의 - 라디오 체크시 on 클래스 추가
    radioCheck();

    // 모의고사 상단에 시간 고정
    examScroll();
	
	//topik 이벤트 페이지 더보기 클릭
	viewMore();

	//게시글 상세페이지 신고삭제 클릭
	reportClick();

	// 반응형 설정
	/*responsiveStyle();*/

	// select2
	selectSearch();

	// magnific popup
	galleryPop();

	// 테이블 스크롤 커스텀
	tableScroll();
});

