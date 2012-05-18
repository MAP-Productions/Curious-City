// This contains the module definition factory function, application state,
// events, and the router.
this.curiouscity = {
	// break up logical components of code into modules.
	module: function()
	{
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an existing module.
		return function(name) 
		{
			// If this module has already been created, return it.
			if (modules[name]) return modules[name];

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({
	
	//this function is called once all the js files are sucessfully loaded
	init : function()
	{
		this.isLoaded = true
		this.startRouter();
	},
	
	startRouter: function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			routes: {
				""							: 'loadMain',
//				"submit"					:'loadSubmit',
				':page'						:	'loadPage',
				"connection/:connectionId"	:	"goToConnection",
			},
			
			loadPage : function(page){ _this.loadPage(page) },
			goToConnection : function( connectionId ){ _this.goToConnection( connectionId ) },
			loadSubmit: function(  ){ _this.loadSubmit() },
			loadMain: function()
			{
				this.navigate('vote');
			}
		});

		this.router = new Router();
		Backbone.history.start();
	},
	

	loadPage : function(page)
	{
		var _this = this;
		//console.log('load page: '+ page)
		
		//var Pages = curiouscity.module('pages');
		//var view = new Pages.Views[page]();
		
		$('.focus').fadeOut('fast',function(){
			$(this).removeClass('focus');
			console.log('fade in: #'+page);
			$('#'+page+'-page').addClass('focus').fadeIn('fast',function(){
				console.log('fade in complete')
				
				switch(page)
				{
					case 'vote':
						_this.loadVoteQuestions();
						break;
				}
				
			});
		})
		
	},

	loadSubmit : function(  )
	{

		console.log('curious eh?: submitttt');
		
		var Questions = curiouscity.module("questions");
		
		this.submitView = new Questions.Views.Submit({ model:new Questions.Model() });
		$('#questions').html(this.submitView.render().el);
		
	},
	
	loadVoteQuestions : function()
	{
		if(!this.questionsCollection)
		{
			var Questions = curiouscity.module("questions");
		
			this.questionsCollection = new Questions.Collection({'votingperiod':'od7'});

			$('#vote-page').spin();
			this.questionsCollection.reset();
			this.questionsCollection.fetch({
			
				success:function(collection,response)
				{
					$('#vote-page').spin(false);
				
					_.each( _.shuffle( _.toArray(collection) ),function(question){
						console.log('adding view');
						var questionView = new Questions.Views.Vote({model:question});
						$('#questions').append(questionView.render().el);
					});
				
					console.log(collection)
				
					_.each( _.toArray(collection),function(question){
						console.log('adding view');
						var questionView = new Questions.Views.Vote({model:question});
						$('#questions-order').append(questionView.render().el);
					});
				
				}
			});
		}
		
	},
	
	
	
}, Backbone.Events)


};
