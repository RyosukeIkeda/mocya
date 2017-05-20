var SCROLL_TOP = {

	VISIBILE_POSITION : 100,
	ANIMATION_SPEDD : 200,
	SCROLL_SPEED : 1000,

	init : function(){
		this.setParameters();
		this.checkPosition();
		this.bindEvent();
	},

	setParameters : function(){
		this.contentTop = $('html').position().top;
		this.$content = $('html,body');
		this.$topBtn = $('.back-top');
		this.$window = $(window);
		this.checker = false;
	},

	checkPosition : function(){
		this.$window.on('scroll touchmove',$.proxy(this.plusClass,this));
	},

	plusClass : function(){
		var myself =this;

		if(this.$window.scrollTop()<this.VISIBILE_POSITION && this.checker == true){
			this.checker = false;

			// this.$topBtn.stop().fadeOut(this.ANIMATION_SPEDD);
			this.$topBtn.animate({'opacity':0},this.ANIMATION_SPEDD,function(){
				myself.$topBtn.addClass('page-hide');
			});

		}else if(this.$window.scrollTop()>=this.VISIBILE_POSITION && this.checker == false){
			this.checker = true;

			//this.$topBtn.stop(false,false).fadeIn(this.ANIMATION_SPEDD);
			this.$topBtn.removeClass('page-hide');
			this.$topBtn.animate({'opacity':1},this.ANIMATION_SPEDD);

		}
	},

	bindEvent : function(){
		this.$topBtn.on('click',$.proxy(this.scrollTop,this));
	},

	scrollTop : function(e){
		e.preventDefault();
		this.$content.animate({'scrollTop':this.contentTop},this.SCROLL_SPEED);
	}

}

var SP_TAB = {

	init : function(){
		this.setParameters();
		this.bindEvent();
	},

	setParameters : function(){
		this.$tabs = $('.jsc-content-tab').find('a');
		this.$content = $('.jsc-content');
	},

	bindEvent : function(){
		var myself = this;
		this.$tabs.each(function(index){
			var $tab = $(this);
			$tab.on('click',function(e){
				e.preventDefault();
				myself.$tabs.removeClass('sp-active');
				myself.$tabs.eq(index).addClass('sp-active');
				myself.$content.removeClass('sp-selected');
				myself.$content.eq(index).addClass('sp-selected');
			})
		})
	}
}

var SLIDE_MENU = {
	init : function(){
		this.setParameters();
		this.bindEvent();
	},
	setParameters : function(){
		this.$newsListWrapper = $('.jsc-news-list');
		this.$newsListTitle = this.$newsListWrapper.children('dt');
		this.$newsListItme = this.$newsListWrapper.children('dd');
		this.$instagramIcon = $('.jsc-instagram-wrapper');
	},
	bindEvent : function(){
		var myself = this;
		this.$newsListTitle.on('click',function(){
			if(myself.$newsListItme.is(':hidden')){
				myself.$newsListItme.slideDown(500);
				myself.$newsListTitle.addClass('active');
				setTimeout(function(){
					myself.$instagramIcon.css({'display':'block'});
				},300);
			}else{
				myself.$newsListItme.slideUp(500);
				myself.$newsListTitle.removeClass('active');
				myself.$instagramIcon.css({'display':'none'});
			}


		})
	}
}

$(function(){
 	$("#header-summary").load("/html/common/header.html #header-include");
});

$(window).on('load',function(){
	SCROLL_TOP.init();
	SP_TAB.init();
	SLIDE_MENU.init();
});
