// JavaScript Document

$(document).ready(function () {
	
	//card flip
	CSSPlugin.defaultTransformPerspective = 2000;

	//we set the backface 
	TweenMax.set($(".pp_card_back"), {rotationY:-180});

	$.each($(".pp_introcard_wrap"), function(i,element) {

		var frontCard = $(this).children(".pp_card_front"),
			backCard = $(this).children(".pp_card_back"),
			tl = new TimelineMax({paused:true});
		tl
			.to(frontCard, 1, {rotationY:180})
			.to(backCard, 1, {rotationY:0},0)
			.to(element, .5, {z:0},0)
			.to(element, .5, {z:0},0);
		element.animation = tl;
	});
	$(".pp_introcard_wrap").hover(elOver, elOut);
	function elOver() {
		this.animation.play();
	}
	function elOut() {
		this.animation.reverse();
	}
	
});

//브라우저 하위버전 접속시 알림창 닫기
$('.pp_upgradeinfo_close').on('click', function () {
	$('#pp_iever_upgradeinfo').slideUp();
});

// outline 설정 - 키보드로 접근시엔 아웃라인을 보여주고 마우스로 접근할때는 아웃라인을 없애줌
(function (d) {
	var style_element = d.createElement('STYLE'),
		dom_events = 'addEventListener' in d,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				d.addEventListener(type, callback);
			} else {
				d.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};
	d.getElementsByTagName('HEAD')[0].appendChild(style_element);
	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	/*add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});*/
	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #797979}::-moz-focus-inner{border:dotted 1px #797979;}');
	});
})(document);