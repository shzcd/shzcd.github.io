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
	select.mouseover(function(){
		var $this=$(this);
			timeid=setTimeout(function(){
				$this.find(target).fadeIn(200);
			},100);		
	}).mouseout(function(){		
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


};



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
};


