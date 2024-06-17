//다국어 설정-loadPath 경로 설정 주의!
function multiLang() {
	//최종 출력 언어
	var lang;
	//브라우저 언어 체크
	var browserLang;
	if (navigator.language != null) {
		// 크롬이나 파폭이면
		browserLang = navigator.language;
		//console.log("브라우저 언어 " + browserLang);
	} else if (navigator.userLanguage != null) {
		//익스라면
		browserLang = navigator.userLanguage;
		//console.log("브라우저 언어 " + browserLang);
	} else if (navigator.systemLanguage != null) {
		//여기까지는 안 올거 같은데 혹시나 해서
		browserLang = navigator.systemLanguage;
		//console.log("브라우저 언어 " + browserLang);
	} else {
		//이도저도 아니면
		browserLang = "ko-KR";
		//console.log("브라우저 언어 " + browserLang);
	}

	//쿠키언어 설정
	if ($.cookie('language') == null || $.cookie('language') == "") {
		lang = browserLang;
		//console.log("쿠키가 없을때 브라우저언엉: " + lang);
	} else {
		lang = $.cookie('language');
		//console.log("쿠키 있음: " + lang);
	}

	i18next.use(i18nextXHRBackend).init({
		debug: false,
		load: ['ko','vn'],
		lng: lang,
		fallbackLng: {
			'ko-KR': ['ko'],
			'vi': ['vn'],
			'vi-VN': ['vn'],
			'default': ['ko']
		},
		ns: ['translation'],
		defaultNS: 'translation',
		backend: {
			loadPath: '../../../../contents/html/client/locales/{{lng}}/{{ns}}.json'
		}
	}, function (err, t) {
		jqueryI18next.init(i18next, $);
		$('body').localize();

		//쿠키설정
		var cookieLang = $.cookie('language');

		//언어설정
		//최초 언어값을 저장할 변수
		lang = i18next.language;
		if (lang === 'vn' || lang === 'vi-VN') {
			$('.lang_select').removeClass('on');
			$('.lang_vn').addClass('on');
			$('html').attr('lang', 'vi');
			$('html').addClass('style_vn');
			$.cookie('language', 'vn', {path: '/'});
		} else {
			$('.lang_select').removeClass('on');
			$('.lang_ko').addClass('on');
			$('html').attr('lang', 'ko');
			$('html').addClass('style_ko');
			$.cookie('language', 'ko', {path: '/'});
		}
		//console.log("최초언어 : " + lang);
		//console.log("최초쿠키 : " + cookieLang);

		//클릭시 언어변경
		$('.lang_select').click(function () {
			var clickLang = $(this).attr('data-lang');
			i18next.changeLanguage(clickLang, function () {
				$('body').localize();
			});

			$('.lang_select').removeClass('on');
			$(this).addClass('on');

			var selLang = $(this).attr('data-lang');
			cookieLang = $.cookie('language', selLang);
			if (selLang == 'vn') {
				$('html').attr('lang', 'vi');
				$('html').removeClass('style_ko');
				$('html').addClass('style_vn');
				lang = selLang;
			} else {
				$('html').attr('lang', 'ko');
				$('html').removeClass('style_vn');
				$('html').addClass('style_ko');
				lang = selLang;
			}
			//console.log("클릭!선택언어 : " + lang);
			//console.log("클릭!쿠키언어 : " + cookieLang);
		});
	});
}
$(document).ready(function () {
	//다국어 설정-loadPath 경로 설정 주의!
	multiLang();
});