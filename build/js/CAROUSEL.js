var CAROUSEL = {

	MARGIN_RIGHT : 10,//画像と画像の隙間分
	ANIMATION_SPEED : 700, //速さ制御
	MOVE_TIME : 0.7, //スワイプ移動速さ
	THRESHOLD : 75,

	init : function(){
		this.checkDevice();
		this.jugementResize();
		this.createImage(); //無限カルーセルじゃない場合不要
		this.setParameters();
		this.bindEvent();
	},

	createImage : function(){
		if(this.device == "sp"){
		 	this.VISIBLE_NUMBER = 1; //sp時表示枚数
		}else{
		 	this.VISIBLE_NUMBER = 2; //pc時表示枚数
		}

		this.$carouselImgBox = $('.jsc_carousel_img_box');

		for(var i = 0 ; i<= this.VISIBLE_NUMBER-1 ; i++){
			var attrLink = this.$carouselImgBox.find('a').eq(i).attr('href'); //linkの中身
			var attrImg = this.$carouselImgBox.find('img').eq(i).attr('src'); //画像のパス
			this.$carouselImgBox.append('<a href ='+attrLink+' class="carousel_list"><img src='+attrImg+' alt=""></a>'); //画像入ってるコードによる
		}
		this.$carouselImg = this.$carouselImgBox.find('img');
	},

	setParameters : function(){
		// this.$carouselImgBox = $('.jsc_carousel_img_box'); 無限カルーセルじゃない場合必要
		// this.$carouselImg = this.$carouselImgBox.find('img'); 無限カルーセルじゃない場合必要
		this.$carouselContent = $('.jsc_carousel_content');
		this.$carouselImgVisible = $('.jsc_carousel_img_visible');
		this.carouselImgCount = this.$carouselImg.size(); //画像枚数
		this.carouselImgWidth = this.$carouselImg.width()+this.MARGIN_RIGHT; //画像幅に設定隙間=動く幅
		this.carouselLimitImgWidth = this.carouselImgWidth*(this.carouselImgCount-this.VISIBLE_NUMBER); //画像の右*(枚数-見える数)=最大動けるleftの位置
		this.carouselVisibleWidth = this.carouselImgWidth*this.VISIBLE_NUMBER; //見える領域設定用
		this.carouselVisibleHeight = this.$carouselImg.height(); //見える領域設定用
		//this.carouselImgMoveWidth = this.carouselImgWidth*this.VISIBLE_NUMBER //動く幅　画像枚数だったら使う
		this.$preButton = $('.jsc_carousel_pre');
		this.$nextButton = $('.jsc_carousel_next');
		this.preDevice = this.device; //前回の画面状態

		this.swipeOptions = { //タッチスワイプ部分
			triggerOnTouchEnd : true,
			swipeStatus : $.proxy(this.swipeStatus, this),
			allowPageScroll : 'vertical',
			threshold : this.THRESHOLD
		};
	},

	bindEvent : function(){
		var myself = this;
		this.$carouselContent.css({'width': this.carouselVisibleWidth , 'height': this.carouselVisibleHeight}); //全体の位置CSS変更
		this.$carouselImgVisible.css({'width': this.carouselVisibleWidth , 'height':this.carouselVisibleHeight}); //見える領域CSS変更
		this.$carouselImgBox.css({'left' : 0 });　//初期の画像位置設定

		this.$preButton.on('click',$.proxy(this.setPre,this));
		this.$nextButton.on('click',$.proxy(this.setNext,this));

		this.$carouselImgBox.swipe(this.swipeOptions);

	},
	
	setPre : function(){
		if(this.$carouselImgBox.is(':animated')){
			return;
		}

		var myself = this;
		var carouselImgBoxPosition = this.$carouselImgBox.position().left; //現在の画像箱位置

		if(carouselImgBoxPosition+this.carouselImgWidth >= 0){
			if(carouselImgBoxPosition == 0){ //押した瞬間が0だったら、left 最大に
				this.$carouselImgBox.css({'left' :  -this.carouselLimitImgWidth });
				this.$carouselImgBox.animate({'left' : -this.carouselLimitImgWidth+this.carouselImgWidth},this.ANIMATION_SPEED); //一枚分移動
				//this.$carouselImgBox.animate({'left' : -this.carouselLimitImgWidth+this.carouselImgMoveWidth},this.ANIMATION_SPEED); //動く幅表示分
			}else{
				this.$carouselImgBox.animate({'left' : 0 },this.ANIMATION_SPEED,function(){
					myself.$carouselImgBox.css({'left' : -myself.carouselLimitImgWidth});
				});	
			}
		}else{
			this.$carouselImgBox.animate({'left' : carouselImgBoxPosition+this.carouselImgWidth},this.ANIMATION_SPEED); //一枚分移動
			//this.$carouselImgBox.animate({'left' : carouselImgBoxPosition+this.carouselImgMoveWidth},this.ANIMATION_SPEED); //動く幅表示分
		}
	},

	setNext : function(){
		if(this.$carouselImgBox.is(':animated')){
			return;
		}

		var myself = this;
		var carouselImgBoxPosition = this.$carouselImgBox.position().left; //現在の画像箱位置
			
		if(carouselImgBoxPosition-this.carouselImgWidth <= -this.carouselLimitImgWidth){
			if(carouselImgBoxPosition == -this.carouselLimitImgWidth){ //押した瞬間が最大だったら、left 0に
				this.$carouselImgBox.css({'left' :  0 });
				this.$carouselImgBox.animate({'left' : -this.carouselImgWidth},this.ANIMATION_SPEED); //一枚分移動
				//this.$carouselImgBox.animate({'left' : -this.carouselImgMoveWidth},this.ANIMATION_SPEED); //動く幅表示分
			}else{ 
				this.$carouselImgBox.animate({'left' : -this.carouselLimitImgWidth},this.ANIMATION_SPEED,function(){
					myself.$carouselImgBox.css({'left' : 0});
				});
			}
		}else{
			this.$carouselImgBox.animate({'left' : carouselImgBoxPosition-this.carouselImgWidth},this.ANIMATION_SPEED); //一枚分移動
			//this.$carouselImgBox.animate({'left' : carouselImgBoxPosition-this.carouselImgMoveWidth},this.ANIMATION_SPEED); //動く幅表示分
		}
	},

	swipeStatus : function(event, phase, direction, distance){

		if(phase == 'move'){
		
		}else if(phase == 'cancel'){
			
		}else if(phase == 'end'){
			if(direction == 'right'){
				this.setPre();	
			}else if(direction == 'left'){
				this.setNext();
			}
		}
	},

	changecarouselImg : function(){ //追加した画像をとりはずす処理
		this.$carouselImgBox = $('.jsc_carousel_img_box');
		this.$carouselImgBoxWrapper = this.$carouselImgBox.find('a');
		this.$carouselImgBoxWrapperSize = this.$carouselImgBoxWrapper.size();
		if(this.preDevice == "sp"){
			this.$carouselImgBoxWrapper.eq(this.$carouselImgBoxWrapperSize-1).remove();	
		}else{
			this.$carouselImgBoxWrapper.eq(this.$carouselImgBoxWrapperSize-1).remove();
			this.$carouselImgBoxWrapper.eq(this.$carouselImgBoxWrapperSize-2).remove();
		}
	},

	checkDevice : function(){
		this.device = 0;
		this.$window = $(window);
		if($(window).outerWidth() <= 980){ //調整したいウインド幅
		 	this.device = "sp";
		}else{
			this.device = "pc";
		}
	},

	jugementResize : function(){
		var myself = this;
		this.$window.on('load resize',function(){
			myself.checkDevice();
			myself.changecarouselImg();
			myself.createImage(); //無限カルーセルじゃない場合不要
			myself.setParameters();
			myself.bindEvent();
		})
	}
}

// 実行

$(window).on('load',function(){
	CAROUSEL.init();
});