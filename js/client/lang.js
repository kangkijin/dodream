
//다국어 설정-loadPath 경로 설정 주의!
function multiLang() {

/*	console.log($(location).attr('host'));
	console.log($(location).attr('hostname'));
	console.log($(location).attr('pathname'));
	console.log($(location).attr('href'));
	console.log($(location).attr('port'));
	console.log($(location).attr('protocol'));
	console.log($(location).attr('pathname'));*/

	//메뉴맵핑
	var menuType = "";
	if($(location).attr('pathname').indexOf('aboardInfo') != -1){			menuType = 'aboardInfo';
	}else if($(location).attr('pathname').indexOf('aboardMatching') != -1){	menuType = 'aboardMatching';
	}else if($(location).attr('pathname').indexOf('abroadService') != -1){	menuType = 'abroadService';
	}else if($(location).attr('pathname').indexOf('whatIsTopik') != -1){	menuType = 'whatIsTopik';
	}else if($(location).attr('pathname').indexOf('typeQus') != -1){		menuType = 'typeQus';
	}else if($(location).attr('pathname').indexOf('mockTest') != -1){		menuType = 'mockTest';
	}else if($(location).attr('pathname').indexOf('community') != -1){		menuType = 'community';
	}else if($(location).attr('pathname').indexOf('askMe') != -1){			menuType = 'askMe';
	}else if($(location).attr('pathname').indexOf('kStory') != -1){			menuType = 'kStory';
	}else if($(location).attr('pathname').indexOf('magazine') != -1){		menuType = 'magazine';
	}else if($(location).attr('pathname').indexOf('notice') != -1){			menuType = 'notice';
	}else if($(location).attr('pathname').indexOf('event') != -1){			menuType = 'event';
	}else if($(location).attr('pathname').indexOf('myPage') != -1){			menuType = 'myPage';
	}else if($(location).attr('pathname').indexOf('signUpMng') != -1){		menuType = 'signUpMng';
	}else if($(location).attr('pathname').indexOf('passFind') != -1){		menuType = 'passFind';
	}else if($(location).attr('pathname').indexOf('findId') != -1){			menuType = 'passFind';
	}else if($(location).attr('pathname').indexOf('infoYard') != -1){		menuType = 'community';
	}else if($(location).attr('pathname').indexOf('Payment') != -1){		menuType = 'payment';
	}else{menuType='default';}
	//최종 출력 언어
	var lang;
	//브라우저 언어 체크
	var browserLang;
	if (navigator.language != null) {
		// 크롬이나 파폭이면
		browserLang = navigator.language;
	} else if (navigator.userLanguage != null) {
		//익스라면
		browserLang = navigator.userLanguage;
	} else if (navigator.systemLanguage != null) {
		//여기까지는 안 올거 같은데 혹시나 해서
		browserLang = navigator.systemLanguage;
	} else {
		//이도저도 아니면
		browserLang = "kr";
	}

	//쿠키언어 설정
	if ($.cookie('language') == null || $.cookie('language') == "") {
		lang = browserLang;
	} else {
		lang = $.cookie('language');
	}
	console.log('확인 : '+lang);
	if(lang == 'ko'){
		lang = 'kr';
	}else if(lang == 'en'){
		lang = 'us';
	}
	console.log('result 확인 : '+lang);

	i18next.use(i18nextXHRBackend).init({
		debug: true,
		load: 'languageOnly',
		lng: lang,
		fallbackLng: {
			/*'kr': ['kr'],
			'vn': ['vn'],
			'us': ['us'],
			'cn': ['cn'],
			'default': ['kr']*/
			'ko': ['kr'],
			'ko-KR': ['kr'],
			'vi': ['vn'],
			'vi-VN': ['vn'],
			'en': ['us'],
			'us': ['us'],
			'zh': ['cn'],
			'zh-CN': ['cn'],
			'zh-Hans': ['cn'],
			'cn': ['cn'],
			'default': ['us']
		},
		load: 'currentOnly',
		ns: ['translation'],
		defaultNS: 'translation',
		backend: {
			loadPath: '../../../../contents/html/client/locales/{{lng}}/'+menuType+'/{{ns}}.json',
			crossDomain: true
		}
	}, function (err, t) {
		jqueryI18next.init(i18next, $);
		$('body').localize();

		//쿠키설정
		var cookieLang = $.cookie('language');

		//언어설정
		//최초 언어값을 저장할 변수
		lang = i18next.language;
		if (lang === 'vn' || lang === 'vi' || lang === 'vi-VN') {
			$('.lang_select').removeClass('on');
			$('.lang_vn').addClass('on');
			$('html').attr('lang', 'vi');
			$('html').addClass('style_vn');
			$.cookie('language', 'vn', {path: '/'});
		} else if(lang === 'us'){
			$('.lang_select').removeClass('on');
			$('.lang_en').addClass('on');
			$('html').attr('lang', 'en');
			$('html').addClass('style_us');
			$.cookie('language', 'en', {path: '/'});
		} else if(lang === 'cn' || lang === 'zh' || lang === 'zh-CN' || lang === 'zh-Hans'){
			$('.lang_select').removeClass('on');
			$('.lang_cn').addClass('on');
			$('html').attr('lang', 'zh');
			$('html').addClass('style_cn');
			$.cookie('language', 'cn', {path: '/'});
		}else {
			$('.lang_select').removeClass('on');
			$('.lang_ko').addClass('on');
			$('html').attr('lang', 'ko');
			$('html').addClass('style_ko');
			$.cookie('language', 'ko', {path: '/'});
		}

		//클릭시 언어변경
		$('.lang_select').click(function () {
			var clickLang = $(this).attr('data-lang');
			i18next.changeLanguage(clickLang, function () {
				$('body').localize();
			});

			$('.lang_select').removeClass('on');
			$(this).addClass('on');

			var selLang = $(this).attr('data-lang');
			cookieLang = $.cookie('language', selLang, {path: '/'});
			if (selLang == 'vn') {
				$('html').attr('lang', 'vi');
				$('html').removeClass('style_ko');
				$('html').removeClass('style_en');
				$('html').removeClass('style_cn');
				$('html').addClass('style_vn');
				lang = selLang;
			} else if (selLang == 'us'){
				$('html').attr('lang', 'en');
				$('html').removeClass('style_ko');
				$('html').removeClass('style_vn');
				$('html').removeClass('style_cn');
				$('html').addClass('style_en');
				lang = selLang;
			} else if (selLang == 'cn'){
				$('html').attr('lang', 'zh');
				$('html').removeClass('style_ko');
				$('html').removeClass('style_vn');
				$('html').removeClass('style_en');
				$('html').addClass('style_cn');
				lang = selLang;
			}  else {
				$('html').attr('lang', 'ko');
				$('html').removeClass('style_vn');
				$('html').removeClass('style_en');
				$('html').removeClass('style_cn');
				$('html').addClass('style_ko');
				lang = selLang;
			}
			if(selLang=="us"){
				sessionStorage.setItem("langValue", "U");
			}else if(selLang=="vn"){
				sessionStorage.setItem("langValue", "V");
			}else if(selLang=="cn"){
				sessionStorage.setItem("langValue", "C");
			}else{
				sessionStorage.setItem("langValue", "K");
			}
			var basePath = sessionStorage.getItem("contextRootPath");
			$.ajax({
				url : basePath+"/cmm/fms/selectLang.do"
				, type : "post"
				, async : false
				, data : {
					langValue : sessionStorage.getItem("langValue")
				}
				, success : function( res ){
					location.reload();
				}
			});
		});
	});
}
$(document).ready(function () {
	//다국어 설정-loadPath 경로 설정 주의!
	multiLang();
});