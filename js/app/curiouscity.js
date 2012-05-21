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
		$('.focus').fadeOut('fast',function(){
			$(this).removeClass('focus');
			console.log('fade in: #'+page);
			$('#'+page+'-page').addClass('focus').fadeIn('fast',function(){
				console.log('fade in complete')
				
				switch(page)
				{
					case 'vote':
						$('#discussion').fadeIn();
						_this.loadVoteQuestions();
						break;
					case 'ask':
						_this.loadAsk();
						break;
					case 'archive':
						$('#discussion').fadeIn();
						_this.loadArchive();
						break;
					default :
						$('#discussion').fadeIn();
						
				}
				
			});
		})
		
	},

	loadAsk : function(  )
	{
		console.log('curious eh?: submitttt');
		$('#discussion').fadeOut();
		var Questions = curiouscity.module("questions");
		
		this.askView = new Questions.Views.Ask();
		$('#ask-form').html(this.askView.render().el);
		
	},
	
	loadArchive : function()
	{
		console.log('load archive')
		var Questions = curiouscity.module("questions");
		var Pages = curiouscity.module('pages');
		this.archive = new Questions.Collection({'votingperiod':false});
		$('#archive-page #archive-questions').empty();
		$('#archive-page #archive-questions').spin();
		this.archive.reset();
		this.archive.fetch({
		
			success:function(collection,response)
			{
				$('#archive-page #archive-questions').spin(false);
				console.log(collection)

				_.each( _.shuffle( _.toArray(collection) ),function(question){
					var questionView = new Pages.Views.archive({model:question});
					$('#archive-page #archive-questions').append(questionView.render().el);
				});
					
				
			
			}
		});
		
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
					console.log(collection)
					if(collection.canvote)
					{
						console.log('can vote!')
						_.each( _.shuffle( _.toArray(collection) ),function(question){
							var questionView = new Questions.Views.Vote({model:question,vote:true});
							$('#questions').append(questionView.render().el);
						});
						_.each( _.toArray(collection),function(question){
							var questionView = new Questions.Views.Vote({model:question,vote:true});
							$('#questions-order').append(questionView.render().el);
						});
					}
					else
					{
						console.log('cannot vote')
						_.each( _.toArray(collection),function(question){
							var questionView = new Questions.Views.Vote({model:question,vote:false});
							$('#questions').append(questionView.render().el);
						});
					}
					
				
				}
			});
		}
		
	},
	
	
	
}, Backbone.Events)


};
