jQuery(function($)
{
	
	// Shorthand the application namespace
	var Curiouscity = curiouscity.app;
	
	$('#ask-submit').click(function(){
		Curiouscity.loadAsk();
		return false;
	});

	$('input, textarea').placeholder();

	$('.sort').click(function(){
		var sort = $(this).parent().attr('id');
		Curiouscity.router.navigate('!/'+Curiouscity.page+'/'+Curiouscity.category+'/'+sort,{'trigger':true});
		return false;
	});
	
	$('#how-it-works-expander').click(function(){
		$('#how-it-works-expander i').toggleClass('down');
		$('#how-it-works').toggleClass('open');
		
		$('#instructions').show(); $('#intro').hide();
		if( $('#how-it-works').hasClass('open') ) $('#how-it-works').show('blind',{direction:'vertical'},500);
		else $('#how-it-works').hide('blind',{direction:'vertical'},500);
		return false;
	});
	
	$('#how-it-works .close').click(function(e){
		e.preventDefault();
		$('#how-it-works').removeClass('open').hide('blind',{direction:'vertical'},500,function(){
			$('#instructions').show(); $('#intro').hide();
		});
		return false;
	});
	
	
	$('.archive-key a').click(function(){
		var filter = $(this).data('filter');
		
		$('#archive-questions').find('.question:not(.question-status-'+filter+')').hide();
		$('#archive-questions .question-status-'+filter).show();
		
		
		return false;
	});


	//Main Slider

	var sliderReady=true;

	$('.slide-right').click(function(){
		if(sliderReady){
			sliderReady=false;
			$('.slide-wrapper ').animate({'left':'-=940'},1000,function(){
				var last = $('.slide-wrapper li:nth-child(1)').appendTo($('.slide-wrapper '));
				$('.slide-wrapper ').css({'left':'+=940'});
				sliderReady=true;
			});
		}
		return false;
	});

	$('.slide-left').click(function(){
		if(sliderReady){
			$('.slide-wrapper ').animate({'left':'+=940'},1000,function(){
				var last = $('.slide-wrapper li:nth-child('+$(".slide-wrapper  li").length+')').prependTo($('.slide-wrapper '));
				$('.slide-wrapper ').css({'left':'-=940'});
				sliderReady=true;
			});
		}
		return false;
	});

	//Lite Slider

	var liteSliderReady=true;

	$('.carousel.lite .slide-right').click(function(){
		if(liteSliderReady){
			liteSliderReady=false;
			$('.slide-wrapper-lite').animate({'left':'-=300'},500,function(){
				var last = $('.slide-wrapper-lite li:nth-child(1)').appendTo($('.slide-wrapper-lite'));
				$('.slide-wrapper-lite').css({'left':'+=300'});
				liteSliderReady=true;
			});
		}
		return false;
	});

	$('.carousel.lite .slide-left').click(function(){
		if(liteSliderReady){
			$('.slide-wrapper-lite').animate({'left':'+=300'},500,function(){
				var last = $('.slide-wrapper-lite li:nth-child('+$(".slide-wrapper-lite  li").length+')').prependTo($('.slide-wrapper-lite'));
				$('.slide-wrapper-lite').css({'left':'-=300'});
				liteSliderReady=true;
			});
		}
		return false;
	});

	
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	function getCookie(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name){
				return unescape(y);
			}
		}
	}
	
	if(!_.isUndefined(getCookie('CURIOUS_CITY_VOTE'))){
		Curiouscity.vote=getCookie('CURIOUS_CITY_VOTE');
	}
	else{
		
		Curiouscity.vote=-1;
	}
	if(_.isUndefined(getCookie('CURIOUS_CITY'))){
		
		

		_.delay(function(){
			$('#intro').show();
			$('#instructions').hide();
			$('#how-it-works-expander i').toggleClass('down');
			$('#how-it-works').toggleClass('open');
			$('#how-it-works').show('blind',{direction:'vertical'},500);
			
		},1000);
		setCookie('CURIOUS_CITY',1,365);
	}


	Curiouscity.init();
	
});
