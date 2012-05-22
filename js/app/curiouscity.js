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
				"!/connection/:connectionId"		:	"goToConnection",
				'!/archive/question/:questionID'	:	'goToArchiveQuestion'
			},
			
			loadMain: function(){ this.navigate('!/vote',{trigger:true}) },
			loadPage : function(page){ _this.loadPage(page) },
			
			goToConnection : function( connectionId ){ _this.goToConnection( connectionId ) },
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
						_this.loadArchive();
						break;
					case 'about':
						break;
					default :
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
	
	goToArchiveQuestion : function( questionID )
	{
		var _this = this;
		$('.focus').removeClass('focus').fadeOut('fast', function(){
			$('#question-page').empty();
			$('#question-page').spin().addClass('focus').fadeIn('fast',function(){
				console.log('go to question '+questionID)
				console.log(_this)
				if(_this.archive)
				{
					console.log('draw the question view')
					_this.renderQuestion(_this.archive.get(questionID));
				}
				else
				{
					console.log('need to load the archive!')
					_this.loadArchiveCollection();
					_this.archive.on('reset', function(){ _this.renderQuestion( _this.archive.get(questionID) ) }, _this)
				}
			})
		});
		return false;
	},
	
	renderQuestion : function( model )
	{
		$('#question-page').spin(false);
		var Questions = curiouscity.module("questions");
		var questionView = new Questions.Views.Single({model:model})
		
		$('#question-page').html(questionView.render().el)
	},
	
	loadArchiveCollection : function()
	{
		
		if(!this.archive)
		{
			var Questions = curiouscity.module("questions");
			this.archive = new Questions.Collection({'votingperiod':false});
		}
		this.archive.fetch({
		
			success:function(collection,response)
			{
				console.log(collection)
			}
		});
	},
	
	loadCurrentQuestionCollection : function()
	{
		
		if(!this.questionsCollection)
		{
			var Questions = curiouscity.module("questions");
		
			this.questionsCollection = new Questions.Collection({'votingperiod':'od7'});
			this.questionsCollection.fetch({
			
				success:function(collection,response){}
			});
		}
	},
	
	loadArchive : function()
	{

			console.log('load archive')
		var Questions = curiouscity.module("questions");
		var Pages = curiouscity.module('pages');
		if(!this.archive) this.archive = new Questions.Collection({'votingperiod':false});
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
							var questionView = new Questions.Views.Vote({model:question,vote:true, linked:false});
							$('#questions').append(questionView.render().el);
							questionView.delegateEvents();
						});
						_.each( _.toArray(collection),function(question){
							var questionView = new Questions.Views.Vote({model:question,vote:true, linked:true});
							$('#questions-order').append(questionView.render().el);
						});
					}
					else
					{
						console.log('cannot vote')
						_.each( _.toArray(collection),function(question){
							var questionView = new Questions.Views.Vote({model:question,vote:false});
							$('#questions').append(questionView.render().el);
							questionView.delegateEvents();
						});
					}
					
				
				}
			});
		}
		
	},
	
	
	
}, Backbone.Events)


};
