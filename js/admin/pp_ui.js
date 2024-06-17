// JavaScript Document

// top 버튼
function moveTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function () {
		$('#back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$('#back-to-top').tooltip('show');
}

//Date picker
function dataPicker() {
	$('.btDtpicker').datepicker({
		changeMonth: true,
		changeYear: true,
		autoclose: true,
		format: "yyyy-mm-dd",
		language: 'kr'

	});
}

function selectboxChange() {
	$("#getCode").each(function(){
		var str = "";
		$(this).children( "option:selected" ).each(function() {
			str += $( this ).text() + " ";
		});
		$(this).siblings('span').children('strong').text( str );
	});
}

function popupModal() {
	/*var url = $(this).attr('data-url');*/
	$('.btn_modal').on('click', function(e){
		$('.modal').modal({
			remote : url
		});
	});
}

// select2
function selectSearch() {
	$('select').select2('destroy');
	$('.select_search').select2();
}

// toggle button
function toggleButton(){
	$('.toggle_button').not('.disabled').each(function(){
		$(this).on('click',function(){
			$(this).toggleClass('on');
		});
	});
}

// swiper - 입력항목 - 대분류
function slideSwiper() {
	var swiper1 = new Swiper('.first_slide', {
		slidesPerView: 4,
		loop: false,
		autoplay:false,
        width:840,
		navigation: {
				nextEl: $('.first_next'),
				prevEl: $('.first_prev')
			},
        breakpoints: {
				1279: {
					slidesPerView: 3,
                    width:660
                }
			}
	});
}

// swiper - 입력항목 - 중분류
function slideSwiper2() {
	var swiper2 = new Swiper('.second_slide', {
		slidesPerView: 4,
		loop: false,
		autoplay:false,
        width:840,
		navigation: {
				nextEl: $('.second_next'),
				prevEl: $('.second_prev')
			},
        breakpoints: {
				1279: {
					slidesPerView: 3,
                    width:660
                }
			}
	});
}

// swiper - 서류평가항목 - 대분류
function slideSwiper3() {
	var swiper3 = new Swiper('.third_slide', {
		slidesPerView: 4,
		loop: false,
		autoplay:false,
        width:840,
		navigation: {
				nextEl: $('.third_next'),
				prevEl: $('.third_prev')
			},
        breakpoints: {
				1279: {
					slidesPerView: 3,
                    width:660
                }
			}
	});
}

// swiper - 서류평가항목 - 중분류
function slideSwiper4() {
	var swiper4 = new Swiper('.fourth_slide', {
		slidesPerView: 4,
		loop: false,
		autoplay:false,
        width:840,
		navigation: {
				nextEl: $('.fourth_next'),
				prevEl: $('.fourth_prev')
			},
        breakpoints: {
				1279: {
					slidesPerView: 3,
                    width:660
                }
			}
	});
}
$(document).ready(function () {

	// top 버튼
	moveTop();

	//Date picker
	dataPicker();

	// select2
	selectSearch();

	// toggle button
	toggleButton();

    // swiper - 학사 석사 박사
    slideSwiper();
    slideSwiper2();

    // swiper - 서류평가항목
    slideSwiper3();
    slideSwiper4();
})

$(window).on('load', function () {

	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".tbl_scroll, .tbl_scroll_sm, .tbl_scroll_md, .tbl_scroll_lg").off(mCustomScrollbar);
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".tbl_scroll_lg").mCustomScrollbar({
				axis: "x",
				theme: "dark-thin",
				advanced: {
					autoExpandHorizontalScroll: true
				}
			});
			$(".tbl_scroll, .tbl_scroll_sm, .tbl_scroll_md").mCustomScrollbar({
				axis: "x",
				theme: "dark-thin",
				advanced: {
					autoExpandHorizontalScroll: false
				}
			});
		}
	}

})