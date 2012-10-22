jQuery(function($)
{
	
	// Shorthand the application namespace
	var Curiouscity	 = curiouscity.app;
	
	
	
	$('#how-it-works-expander').click(function(){
		$('#how-it-works-expander i').toggleClass('down');
		$('#how-it-works').toggleClass('open');
		
		if( $('#how-it-works').hasClass('open') ) $('#how-it-works').show('blind',{direction:'vertical'},500);
		else $('#how-it-works').hide('blind',{direction:'vertical'},500);
		return false;
	})
	
	
	$('.archive-key a').click(function(){
		console.log( $(this).data('filter') )
		var filter = $(this).data('filter');
		
		$('#archive-questions').find('.question:not(.question-status-'+filter+')').hide();
		$('#archive-questions .question-status-'+filter).show();
		
		
		return false;
	})
	
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
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
	
	if(_.isNumber(getCookie('CURIOUS_CITY_VOTE'))){
		Curiouscity.vote=getCookie('CURIOUS_CITY_VOTE');

	}
	else{
		Curiouscity.vote=-1;
	}
	if(_.isUndefined(getCookie('CURIOUS_CITY'))){
		_.delay(function(){ $('#how-it-works-expander').trigger('click');},1000);
		setCookie('CURIOUS_CITY',1,365);
	}else{
		console.log ("MAlready Visited",getCookie('CURIOUS_CITY'));
	} 

	console.log ("Most recent vote:",Curiouscity.vote);

	Curiouscity.init();
	
});
