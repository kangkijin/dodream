// include HTML
function includeHTML(){
	var includeArea = $('[data-include]');
	var self, url;
	$.each(includeArea, function () {
		self = $(this);
		url = self.data('include');
		self.load(url, function () {
			$(this).children().unwrap();

			// header 반응형
			headerStyle();

			// 윈도우 resize 시 header 반응형
			resizeTimer();

			// 메인 - 언어선택 셀렉트박스
			selectLangBox();
		});
	});
}

// header 반응형
function headerStyle() {

	//gnb 메뉴용
	var windowWidth = $(window).outerWidth();
	var gnbList = $('.gnb').children('li');
	var gnbSub = $('.gnb_sub');
	var btnSitemap = $('.btn_sitemap');
	var bg = $('.gnb_bg');

	if (windowWidth < 481) {
		//console.log("모바일");

		//2depth 메뉴

		gnbList.on('click',function(e){
			e.stopImmediatePropagation();

			var thisSub = $(this).find('.gnb_sub');

			// 1depth 메뉴 스타일 추가/제거
			if (thisSub.is(':visible')) {
				$('body').removeClass('on');
				bg.fadeOut('fast');
				gnbList.removeClass('on');
			} else {
				$('body').addClass('on');
				bg.fadeIn('fast');
				gnbList.removeClass('on');
				$(this).addClass('on');
			}

			// 2depth 메뉴 : 1depth 메뉴 클릭시 show/hide
			if (thisSub.is(':visible')) {
				gnbSub.stop().slideUp('fast');
				thisSub.slideUp('fast');
			} else {
				gnbSub.hide();
				thisSub.stop().slideDown('fast');
			}
		});

		// sitemap
		btnSitemap.on('click',function(e){
			e.stopImmediatePropagation();

			$('body').stop().toggleClass('on');
			$(this).stop().toggleClass('on');
			$('.sitemap').stop().slideToggle('fast');

			// gnbsub 와 중복될 경우
			if ( gnbSub.is(':visible') ) {
				gnbList.removeClass('on').find('.gnb_sub').hide();
			} else if ( btnSitemap.hasClass('on') ) {
				//console.log('gnbsub가 display:block인 상태');
				bg.show();
			} else {
				//console.log('gnbsub가 display:none인 상태');
				bg.fadeOut('fast');
			}
		});


	} else if (windowWidth < 1025) {
		// console.log("태블릿");

		// 초기화
		gnbList.off('hover mouseenter focus mouseleave blur');

		// 2depth 메뉴 : 1depth 메뉴 클릭시 show/hide
		gnbList.on('click',function(){
			gnbList.children().next().stop().slideUp('fast');
			$(this).children().next().stop().slideToggle('fast');
		});


	} else {
		// console.log("PC");

		// 2depth 메뉴 : 1depth 메뉴 호버시 show/hide
		gnbList.on({
			'mouseenter focus':function(){
				$(this).children().next().stop().slideDown('fast');
			},
			'mouseleave blur':function(){
				$(this).children().next().stop().slideUp('fast');
			}
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
	}
}

// 메인 - 언어선택 셀렉트박스
function selectLangBox(){

	var windowWidth = $(window).outerWidth();
	var select = $('.select_lang').children('p');
	var selectList = select.next().children('li');

	select.on('click',function(e){
		e.stopImmediatePropagation();
		$(this).next().stop().slideToggle('fast');
	});

	selectList.on('click',function(){
		selectList.not($(this)).removeClass('on');
		$(this).addClass('on');
		selectList.parent().slideUp(400);
	});

	if (windowWidth > 1025) {
		//console.log("pc");

		// 클릭시 변환
		$('.lang_kr').parent().on('click',function(){
			select.html('KR<span class="lang_kr"></span>');
		});
		$('.lang_us').parent().on('click',function(){
			select.html('US<span class="lang_us"></span>');
		});
		$('.lang_cn').parent().on('click',function(){
			select.html('CN<span class="lang_cn"></span>');
		});
		$('.lang_vn').parent().on('click',function(){
			select.html('VN<span class="lang_vn"></span>');
		});

		// 윈도우 resize 시 변환
		$(window).resize(function(){
			if ( $('.lang_kr').parent().hasClass('on') === true ) {
				select.html('KR<span class="lang_kr"></span>');
			} else if ( $('.lang_us').parent().hasClass('on') === true ) {
				select.html('US<span class="lang_us"></span>');
			} else if ( $('.lang_cn').parent().hasClass('on') === true ) {
				select.html('CN<span class="lang_cn"></span>');
			} else if ( $('.lang_vn').parent().hasClass('on') === true ) {
				select.html('VN<span class="lang_vn"></span>');
			}
		});

	} 
}

$(document).ready(function(){
	// include HTML
	includeHTML();
});