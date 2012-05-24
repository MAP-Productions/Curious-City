(function(Questions){

	Questions.Model.Ask = Backbone.Model.extend({

		defaults : {
			'imageurl' : 'images/default.jpg',
			'comments' : 0
		},

		url: function()
		{
			return 'php/ask.php';
		},

		initialize : function()
		{
		},
		/*
		validate : function(attrs)
		{
			var errors = '';
			var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;

			if(attrs.question=='') errors += '.question-text,';
			if(attrs.name =='') errors+= '.name-text,';
			if(attrs.email_confirm != attrs.email || attrs.email == '' || !email_check.test(attrs.email) )
				errors+= '.email-confirm,.email-main';
			
			return errors;
		}

	*/
	});
	
	

})(curiouscity.module("questions"));
