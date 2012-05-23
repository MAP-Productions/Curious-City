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
		this.loadDisqus();
		this.startRouter();
		
		this.isLoaded = true
	},
	
	loadDisqus : function()
	{
		$('#disqus-add-comment').click(function(){ $('#dsq-reply').fadeIn();});
		$('#disqus-sort-popular').click(function(){ 
			$('#disqus-sort-newest').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
			$('#disqus-sort-popular').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');;
			DISQUS.dtpl.actions.fire('thread.sort', 'best');
		});
		$('#disqus-sort-newest').click(function(){ 
			$('#disqus-sort-popular').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
			$('#disqus-sort-newest').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');
			DISQUS.dtpl.actions.fire('thread.sort', 'newest');
		});
	},
	
	startRouter: function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			routes: {
				""								:	'loadMain',
				'!/:page'							:	'loadPage',
				//"!/connection/:connectionId"		:	"goToConnection",
				'!/archive/question/:questionID'	:	'goToArchiveQuestion'
			},
			
			loadMain: function(){ this.navigate('!/vote',{trigger:true}) },
			loadPage : function(page){ _this.loadPage(page) },
			
			//goToConnection : function( connectionId ){ _this.goToConnection( connectionId ) },
			goToArchiveQuestion : function(questionID){ _this.goToArchiveQuestion(questionID) }
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
			
			//if(page == 'archive') $('#archive-page').empty();
			
			$('#'+page+'-page').addClass('focus').fadeIn('fast',function(){
				// calls made once the page div is visible and ready to display whatever
				switch(page)
				{
					case 'vote':
						$('#discussion').fadeIn();
						_this.loadVoteQuestions();
						break;
					case 'stories':
					
						break;
					case 'ask':
						_this.loadAsk();
						break;
					case 'archive':
						_this.loadArchiveQuestions();
						break;
					case 'about':
						break;
					default :
				}
				
			});
		})
		
	},

	loadVoteQuestions : function()
	{
		//only load once per visit
		if( !this.questionsCollection )
		{
			var _this = this;
			var Questions = curiouscity.module("questions");
		
			this.questionsCollection = new Questions.Collection({'votingperiod':'od7'});
			$('#vote-page').spin();
			this.questionsCollection.reset();
			this.questionsCollection.fetch({
				success:function(collection,response)
				{
					$('#vote-page').spin(false);
					_this.displayVoteQuestions();
					console.log(collection)
				}
			});
		}
		
	},
	
	displayVoteQuestions : function()
	{
		var Questions = curiouscity.module("questions");
		if( this.questionsCollection.canvote )
		{
			console.log('--you can vote! :)')
			_.each( _.shuffle( _.toArray( this.questionsCollection ) ),function(question){
				var questionView = new Questions.Views.Vote({model:question,vote:true, linked:false});
				$('#questions').append(questionView.render().el);
			});
			_.each( _.toArray( this.questionsCollection ),function(question){
				var questionView = new Questions.Views.Vote({model:question,vote:true, linked:true});
				$('#questions-order').append(questionView.render().el);
			});
		}
		else
		{
			console.log('--you cannot vote :(')
			_.each( _.toArray( this.questionsCollection ),function(question){
				var questionView = new Questions.Views.Vote({model:question,vote:false});
				$('#questions').append(questionView.render().el);
			});
		}
	},

	loadAsk : function(  )
	{
		console.log('curious eh?: submitttt');
		$('#discussion').fadeOut();
		var Questions = curiouscity.module("questions");
		
		this.askView = new Questions.Views.Ask();
		$('#ask-form').html(this.askView.render().el);
	},
	
	loadArchiveQuestions : function()
	{
		// reload archive each time the page is loaded
		console.log('load archive')
		var _this = this;
		if(!this.archive)
		{
			var Questions = curiouscity.module("questions");
			this.archive = new Questions.Collection({'votingperiod':false});
		}
		$('#archive-page #archive-questions').empty();
		$('#archive-page #archive-questions').spin();
		this.archive.fetch({
			success:function(collection,response)
			{
				$('#archive-page #archive-questions').spin(false);
				console.log(collection)
				_this.displayArchiveQuestions();
			}
		});
	},
	
	displayArchiveQuestions : function()
	{
		console.log('display vote questions')
		var Pages = curiouscity.module('pages');
		_.each( _.shuffle( _.toArray(this.archive) ),function(question){
			var questionView = new Pages.Views.archive({model:question});
			$('#archive-page #archive-questions').append(questionView.render().el);
		});
		DISQUS.reset({
			reload: true,
			config: function () {  
			console.log('resetting');
			this.page.identifier = "archive";  
			this.page.url = "http://example.com/#!/archive";
			}
		});
	},
	
	goToArchiveQuestion : function( questionID )
	{
		var _this = this;
		
		DISQUS.reset({
			reload: true,
			config: function () {  
			this.page.identifier = "question-"+questionID;  
			this.page.url = "http://example.com/#!/question/"+questionID;
			}
		});
		$('#discussion').fadeIn();

		$('.focus').removeClass('focus').fadeOut('fast', function(){
			$('#question-page').empty();
			$('#question-page').spin().addClass('focus').fadeIn('fast',function(){
				console.log('go to question '+questionID)
				_this.renderQuestion(_this.archive.get(questionID));
				
			})
		});
		return false;
	},
	
	renderQuestion : function( model )
	{
	
				DISQUS.reset({
		reload: true,
		config: function () {  
		this.page.identifier = "vote";  
		this.page.url = "http://curiouscity.wbez.org/#!/vote";
		}
		});
	
		$('#question-page').spin(false);
		var Questions = curiouscity.module("questions");
		var questionView = new Questions.Views.Single({model:model})

		
		$('#question-page').html(questionView.render().el)
	},
	
	voteOnQuestion : function()
	{
		console.log('voted!!!!!')
		$('#vote-page .super h1').html('Find out final results Wednesday on The Afternoon Shift on WBEZ 91.5');
		$('#vote-page .sub h5').html('Thanks for Voting! Here’s how the votes are stacking up so far.');
		
	}

	
}, Backbone.Events)


};
