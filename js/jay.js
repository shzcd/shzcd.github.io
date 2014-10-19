//缓存变量
var $win;
var $doc;
var $html;
var $body;
//配置自定义CSS高度的参数
var scalcNum;
//定义一个缓解resize事件优化参数
var resetJaycss = null;



//构造自定义高度CSS方法 TO:CUSTOM_CSS
function winCssHeight() {
	//配置自定义CSS高度的参数
	scalcNum = [
		["winheight",0],
		["contentheight1",(function() {
			return parseInt(
					$("#app_footer").outerHeight() +
					$(".app_head").outerHeight()
				);
			})()
		],
		["contentheight", (function() {
			return parseInt(
					$("#app_clt").outerHeight() + 
					$("#app_footer").outerHeight() + 
					$(".app_head").outerHeight()
				);
			})()
		]
	];
	
	$.fn.winCssHeight($win,scalcNum,'');
	$win.resize(function() {
		resetJaycss?clearTimeout(resetJaycss):'';
		resetJaycss = setTimeout(function() {
			$.fn.winCssHeight($win,scalcNum,'');
		},200);
	});
}



//构造首页Sideshow, TO: SIDESHOW_INDEX
function sideshow(obj) {
	var objElement = obj || $(".app-slideshow");
	function initSideShow() {
		objElement.cycle({
			fx:"scrollHorz",
			slides:"> a.slideshow-items",
			log:false,
			speed: 250,
			manualSpeed: 100,
			pauseOnHover:true,
			pager:".app-slideshow-paper",
			pagerTemplate:"<span></span>"
		});
	}
	objElement.length?initSideShow():'';
}

function scrollTop(obj){
	var objectElement=obj || $("#backtop");
	function initScrollTop(){
		objectElement.click(function(){
			var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');// 这行是 Opera 的补丁, 少了它 Opera 是直接用跳的而且画面闪烁 by willin
			$body.animate({scrollTop: 0},500);
		})
	}
	objectElement.length ? initScrollTop() : '';	
}

function opendialog(obj){
	var objectElement=obj || '';
	function initOpendialog(){
		objectElement.click(function(){
			$('.app_dialog_wrap').show();
		})
	}
	objectElement.length ? initOpendialog() : '';	
}

function floathovereffect(){
	$('.app_site_btn').each(function(){
		var $this=$(this),
			timeId=null,
			i=$this.index()+1;
		$this.mouseover(function(){			
				timeId=setTimeout(function(){
					$this.empty()
						.css({background:'#ea3956 url(images/app-sidebar-hovico0'+i+'.png) no-repeat center center'})
				   		.animate({width:62,height:56},200);
				},300);	
		}).mouseout(function(){
				clearTimeout(timeId);
				$(this).css({background:'#1D71B9'}).animate({width:42,height:42},200);
				switch(i)
				{
					case 1: 
						$this.text('点餐'); 
						break;
					case 2: 
						$this.text('订餐'); 
						break;
					case 3: 
						$this.empty().append('<span class="img-qrcode"></span>'); 
						break;
					case 4: 
						$this.empty().append('<span class="img-serico"></span>'); 
						break;			
				}
		});
	})

}

function fadeInhoveffect(select, target){
	var timeid=null;
	select.mouseenter(function(){
		var $this=$(this);
			timeid=setTimeout(function(){
				$this.find(target).fadeIn(200);
			},100);		
	}).mouseleave(function(){		
		clearTimeout(timeid);
		$(this).find(target).fadeOut(100);	
	})
}



function rosefunction() {	
	
	scrollTop($('#backtop'));
	opendialog($('#app-order'));
	$('.app_restaurant_order').click(function(){
		$(this).addClass('hide').next('.app_restaurant_order_service').removeClass('hide');
	});
	$('.app_home_order').click(function(){
		$(this).addClass('hide').next('.app_home_order_service').removeClass('hide');
	});
	floathovereffect();	

	$('.appLocactionSwitch').click(function(e){
		e.stopPropagation();
		$('.app_swith_local_content').fadeIn(100);
	});
	$(document).click(function(){		
		$('.app_swith_local_content').fadeOut(50);
	});

	
	fadeInhoveffect($('.app_submain_list_content .app_submain_list_menuname') , '.app_submain_hotalimg');

	$('.avatar').click(function(){
		$(this).next('input[type="file"]').trigger('click');
	});

	fadeInhoveffect($('#topbar-user'), '.topbar-user-dropdown');
	
};
//links 链接跳转在这里执行
function links() {
	$(".app_head_logo").on("click", function() {
		window.location.href = "index.html"
	});
	
	$(".app-login-formbg").eq(0).on("click", function() {
		window.location.href = "login.html"
	});
	$(".app-login-formbg").eq(1).on("click", function() {
		window.location.href = "register.html"
	});
	$(".app_head_right").on("click", ".app_signin", function() {
		window.location.href = "register.html"
	}).on("click", ".app_login", function() {
		window.location.href = "login.html"
	});
	
	
	$(".app_bookcheck").on("click", function() {
		window.location.href = "personalcenter-order.html"
	});
	
	
	$(".con_tool_bar_localChange").on("click", function() {
		window.location.href = "default.html"
	});
	
}
//orders 订餐页面js  这里我假设我读取了一个jsonp，后面请自己定义jsonp这里只是参考
function orders() {
	if ( $(".ordering").length < 1 ) {
		return ;
	}
	var $temp = 
			'<div class="app_submain_list_content clearfix">'+
			'	<div class="app_submain_list_menuname"><font>名字</font> <span class="app_submain_hotalimg"><img src="images/app_subhotal_img.png" alt=""></span> </div>'+
			'	<div class="app_submain_list_salenum">月售 N 份</div>'+
			'	<div class="app_submain_list_grade">0</div>'+
			'	<div class="app_submain_list_price"><span class="addnums"></span><font>￥32元</font></div>'+
			'</div>';
	var $tempwrap = $("<div>");
	var $addtotar = $(".app_submain_myorder_content>ul");
	$.ajax({
		type : "get",
		url:"js/demoCallback/demojsonp_1.js",
		dataType : "jsonp",
		jsonpCallback: "dinerlist"
	}).done(function(d) {
		$.each(d,function(i,data) {
			var $cache = $($temp);
			$cache.find(".app_submain_list_menuname > font").html(data["name"]);
			$cache.find(".app_submain_hotalimg > img ").attr("src", data["img"]);
			$cache.find(".app_submain_list_salenum").html("月售 "+ data["seles"] +" 份");
			$cache.find(".app_submain_list_grade").html(data["gjobs"]);
			$cache.find(".app_submain_list_price font").html("￥"+ data["price"] +"元");
			$cache.data({
				"name":data["name"],
				"price": data["price"],
				"count":i
			});
			$tempwrap.append($cache);
		});
		var innerhtml = $tempwrap.children().unwrap();
		innerhtml.each(function(i,el) {
			$(el).attr("count","count_"+i);
		});
		$(".app_submain_list_head").nextAll().remove().end().after(innerhtml);
		fadeInhoveffect($('.app_submain_list_content .app_submain_list_menuname') , '.app_submain_hotalimg');
		$(".app_submain_content").on("click", ".app_submain_list_grade", function() {
			var _this = $(this);
			_this.toggleClass("gjob");
			if ( _this.hasClass("gjob") ) {
				_this.html( Number(_this.html())+1 );
			} else {
				_this.html( Number(_this.html())-1 );
			}
			
		}).on("click", ".addnums", function(e) {
			var _this  = $(this);
			var _parent = _this.closest(".app_submain_list_content");
			var $targetEl = $addtotar.find("#count_"+ _parent.data("count"));
			if ($targetEl.length) {
				var inputs = $targetEl.find(".myordernums");
				inputs.val(parseInt(inputs.val())+1);
				$addtotar.trigger("valuechange");
			} else {
				var temps = $('<li><span class="myorderminus"></span><span class="myordername">佛跳墙(位</span><input type="text" class="myordernums" value="1" /><span class="myorderunitprice">￥108.00</span><span class="myorderplus"></span></li>');
				temps.attr("id","count_"+_parent.data("count"));
				temps.data("price",_parent.data("price"));
				temps.find(".myordername").html( _parent.data("name"))
				temps.find(".myorderunitprice").html("￥"+ _parent.data("price") +"");
				$addtotar.append(temps);
				$addtotar.trigger("valuechange");
			}
			
		});
		
		$addtotar.on("valuechange", function() {
			var _this = $(this);
			var eachVal = _this.find("input.myordernums");
			var vals = 0;
			eachVal.each(function(i,e) {
				vals = parseInt(vals) + parseInt($(e).val())*$(e).closest("li").data("price") ;
			});
			//console.log(vals)
			$addtotar.next(".myorderinall").html("总价￥"+ vals)
		}).on("click", ".myorderplus", function() {
			var nums = $(this).closest("li").find(".myordernums")
			nums.val( parseInt(nums.val()) + 1 )
			$addtotar.trigger("valuechange");
		}).on("click", ".myorderminus", function() {
			var nums = $(this).closest("li").find(".myordernums")
			nums.val( parseInt(nums.val()) - 1 );
			if ( parseInt(nums.val()) < 0 ) {
				$(this).closest("li").remove();
			}
			$addtotar.trigger("valuechange");
		});
		
		$(".empty", ".app_submain_myorder").on("click", function(e) {
			$addtotar.find("li").remove();
			$addtotar.trigger("valuechange");
		});
	}).error(function(s) {
		//console.log(s)
	})
}

var jayfunction = function() {
	//定义变量
	$win = $(window);
	$doc = $(document);
	$html = $("html");
	$body = $("body");
	//CUSTOM_CSS
	winCssHeight();
	//SIDESHOW_INDEX
	sideshow($(".app-slideshow"));
	rosefunction();
	//links
	//links();
	//订餐页面js
	orders();
};


