$(document).ready(function () {
	
	//최종 출력 언어
	var lang;
	
	//브라우저 언어 체크
	var browserLang;
	if (navigator.language!=null) //이 값이 null이 아니면. 즉 크롬이나 파폭이면
	{
		browserLang = navigator.language;
		console.log("브라우저 언어 " + browserLang);
	} else if (navigator.userLanguage!=null) { //이 값이 null이 아니면. 즉 익스라면
		browserLang = navigator.userLanguage;
		console.log("브라우저 언어 " + browserLang);
	} else if (navigator.systemLanguage!=null) { //여기까지는 안 올거 같은데 혹시나 해서
		browserLang = navigator.systemLanguage;
		console.log("브라우저 언어 " + browserLang);
	} else { //이도저도 아니면
		browserLang = "몰라요";
		console.log("브라우저 언어 " + browserLang);
	}
	
	
	if($.cookie('language') == null || $.cookie('language') == "") {
		lang = browserLang;
		console.log("쿠키가 없을때 브라우저언엉: " + lang);
	}else{
		lang = $.cookie('language');
		console.log("쿠키 있음: " + lang);
	}
	
	
	i18next.use(i18nextXHRBackend)
		.init({
		debug: false,
		load: 'languageOnly',
		lng: lang,
		fallbackLng: { 
			'ko-KR': ['ko'],
			'vi': ['vn'],
			'vi-VN': ['vn'],
			'default': ['en']
		},
		load: 'currentOnly',
		ns: ['translation'],
		defaultNS: 'translation',
		/*resource: {
			resGetPath: "/locales/__lng__/translation.json"
		},*/
		backend: {
			/*loadPath: '/contents/temporary/locales/{{lng}}/{{ns}}.json',*/
			loadPath: '../locales/{{lng}}/{{ns}}.json',
			crossDomain: true
		}
	}, function(err, t) {
		jqueryI18next.init(i18next, $);
		$('body').localize();
		
		//쿠키설정
		var cookieLang = $.cookie('language');
		
		//언어설정
		
		//최초 언어값을 저장할 변수
		lang = i18next.language;
		if (lang === 'ko' || lang === 'ko-KR') {
			$('.lang_select').removeClass('on');
			$('.lang_ko').addClass('on');
			$('html').attr('lang', 'ko');
			$('html').addClass('style_ko');
			$.cookie('language', 'ko');
		} else if (lang === 'vn' || lang === 'vi-VN') {
			$('.lang_select').removeClass('on');
			$('.lang_vn').addClass('on');
			$('html').attr('lang', 'vi');
			$('html').addClass('style_vn');
			$.cookie('language', 'vn');
		} else {
			$('.lang_select').removeClass('on');
			$('.lang_en').addClass('on');
			$('html').attr('lang', 'en');
			$('html').addClass('style_en');
			$.cookie('language', 'en');
		}
		console.log("최초언어 : " + lang);
		console.log("최초쿠키 : " + cookieLang);
		
		//클릭시 언어변경
		$('.lang_select').click(function () {
			i18next.changeLanguage(this.innerHTML, function () {
				$('body').localize();
			});
			
			$('.lang_select').removeClass('on');
			$(this).addClass('on');
			
			var selLang = $(this).attr('data-lang');
			cookieLang = $.cookie('language', selLang);
			if (selLang == 'ko') {
				$('html').attr('lang', 'ko');
				$('html').removeClass('style_en style_vn');
				$('html').addClass('style_ko');
				lang = selLang;
			} else if (selLang == 'vn') {
				$('html').attr('lang', 'vi');
				$('html').removeClass('style_ko style_en');
				$('html').addClass('style_vn');
				lang = selLang;
			} else {
				$('html').attr('lang', 'en');
				$('html').removeClass('style_ko style_vn');
				$('html').addClass('style_en');
				lang = selLang;
			}
			console.log("클릭!선택언어 : " + lang);
			console.log("클릭!쿠키언어 : " + cookieLang);
			/*alert($.cookie('language'));*/
		});
		
	});
});