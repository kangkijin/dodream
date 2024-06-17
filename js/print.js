$(document).ready(function(){

	$(".print_page").filter(function(){
	var last_ch = $('.print_page:last')
		$(last_ch).css('page-break-after','auto');
	});
	
	$(".print_page .table_form").find("table tr > td > .div").filter(function(){
		var max_w = $(this).parent().width();
		var div_size = $(this).parent().find(".div").size();
		var div_w = max_w / div_size;
		$(this).width(div_w);
	});

	$(".align").find(".div").filter(function(){
		var max_w = $(this).parent().width();
		var div_size = $(this).parent().find(".div").size();
		var div_w = max_w / div_size;
		$(this).width(div_w);
	});

	$(".page_05").filter(function(){
		var table = $(".page_05").find(".table_form");
		if (table.size() > 4){
			$(this).find(".table_form:eq(4)").css({"page-break-after" : "always"});
		}
	});

	$(".page_19").filter(function(){
		var p = $(".page_19 .pic").find("p");
		if (p.size() > 2){
			$(this).find(".pic p:eq(1)").css({"page-break-after" : "always"});
		}
	});




	$(".page_21 .result_list .list").filter(function(){
		$(".page_21 .result_list .list > li").find(".visit_box:last").css({"border-bottom" : "0"});		
	});

	$(".page_21 .result_list .list").find(".visit_count").filter(function(){
		var count = $(this).parent().find(".visit_box").size();
		$(this).find("dl > dd > span").text("");
		$(this).find("dl > dd > span").text(count);
	});
	$(".page_21 .result_list").find(".visit_count_02").filter(function(){
		var count = $(this).prev().find(".visit_box").size();
		$(this).find("dl > dd > span").text("");
		$(this).find("dl > dd > span").text(count);
	});

});