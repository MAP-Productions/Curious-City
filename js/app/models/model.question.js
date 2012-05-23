(function(Questions){

	Questions.Model = Backbone.Model.extend({

		defaults : {
			'imageurl' : 'images/default.jpg',
			'commentcount' : 1
		},

		url: function()
		{
			return 'php/q.php?questionid='+this.id;
		},

		initialize : function()
		{
		},


	});
	
	

})(curiouscity.module("questions"));
