//配置页面加载模块参数
require.config({
	
	
	paths: {
		"jquery": "jquery-1.11.1.min",
		"scalcHeight": "jay.plugins.scalcHeight",
		"jay": "jay",
		"cycle":"cycle/jquery.cycle2.min"
	},
	shim: {
		'cycle': {deps: ['jquery']},
		'jay'  : {deps: ['cycle']}
	}
});

//配置页面加载模块
require(
	[
		'jquery-1.11.1.min',
		'jay.plugins.scalcHeight',
		'cycle',
		'jay'
	], 
	function (jquery, scalcHeight,cycle,jay){
		$(function() {
			jayfunction();
		});
	}
);