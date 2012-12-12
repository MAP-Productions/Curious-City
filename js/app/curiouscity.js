// This contains the module definition factory function, application state,
// events, and the router.
this.curiouscity = {
    
    module: function(){
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

    app: _.extend({
        
        init : function(){

            this.loadDisqus();
            this.startRouter();
            this.isLoaded = true;
            this.loadInvestigated();
        },
        
        startRouter: function(){
            var _this = this;
            var Router = Backbone.Router.extend({
                routes: {
                    ""                                              :    'loadMain',
                    '!/about/:hash'                                 :    'loadPageLocation',
                    '!/ask/:ask'                                    :    'loadAskPage',
                    '!/:page'                                       :    'loadPage',
                    '!/archive/question/:questionID'                :    'goToArchiveQuestion',
                    '!/vote/current'                                :    'goToVoting',
                    '!/previous/:id'                                :    'goToPrevious',
                    
                    '!/archive'                                     :    'goToArchive',
                    '!/answered'                                    :    'goToAnswered',

                    '!/archive/:category'                           :    'goToArchive',
                    '!/archive/:category/:sort'                     :    'goToArchive',
                    '!/answered/:category'                          :    'goToAnswered',
                    '!/answered/:category/:sort'                    :    'goToAnswered'
                },
                
                initialize: function() {
                    return this.bind('all', this._trackPageview);
                },
                _trackPageview: function() {
                    var url;
                    url = Backbone.history.getFragment();
                    return _gaq.push(['_trackPageview', "/" + url]);
                },
                
                loadMain: function()
                {
                    $('#nav-vote').addClass('nav-focus');
                    this.navigate('!/vote/current',{trigger:false});
                    this.goToVoting();
                },
                loadAskPage : function(ask){_this.loadPage('ask',ask);},
                loadPage : function(page){_this.loadPage(page);},
                loadPageLocation : function(hash)
                {
                    var r = this;
                    _this.loadPage('about');
                    window.location.hash=hash;
                    _.delay( function(){r.navigate('!/about/faq');}, 1000);
                },
                goToArchiveQuestion : function(questionID)
                {
                    _this.showDisqus();
                    $('.nav-focus').removeClass('nav-focus');
                    $('#nav-archive').addClass('nav-focus');
                    _this.loadSingleQuestion(questionID);
                    
                },
                goToArchive : function(category, sort)
                {
                    _this.hideDiscussion();
                    $('.nav-focus').removeClass('nav-focus');
                    $('#nav-archive').addClass('nav-focus');
                    _this.loadArchiveQuestions('archive',category,sort);
                },
                goToAnswered : function(category,sort)
                {
                    _this.hideDiscussion();
                    $('.nav-focus').removeClass('nav-focus');
                    $('#nav-answered').addClass('nav-focus');
                    _this.loadArchiveQuestions('answered',category,sort);
                },
                goToVoting : function()
                {
                    _this.showTwitter();
                    $('.nav-focus').removeClass('nav-focus');
                    $('#nav-vote').addClass('nav-focus');
                    _this.loadVoteQuestions();
                    
                },
                goToPrevious : function(id){ _this.loadPrevious(id); }
            
            });
    
            this.router = new Router();
            Backbone.history.start();
        },
        
        loadPage : function(page,options){
            $('.focus').hide();
            $('.focus').removeClass('focus');
            $('#'+page+'-page').addClass('focus').show();
            $('.nav-focus').removeClass('nav-focus');
            switch(page)
            {
                case 'vote':
                    $('#nav-vote').addClass('nav-focus');
                    this.showTwitter();
                    this.loadVoteQuestions();
                    break;
                case 'ask':
                    $('#nav-vote').addClass('nav-focus');
                    this.hideDiscussion();
                    this.loadVoteQuestions();
                    this.loadAsk(options);
                    break;
                case 'archive':
                    $('#nav-archive').addClass('nav-focus');
                    this.hideDiscussion();
                    this.loadArchiveQuestions('recent');
                    break;
                case 'about':
                    $('#nav-about').addClass('nav-focus');
                    this.hideDiscussion();
                    this.hideDisqus();
                    break;
                default :
            }
                    
        },
        
        hideTwitter : function()
        {
            console.log('hide twitter');
            $('.twitter-wrapper').hide();
        },
        showTwitter : function()
        {
            $('#discussion').show();
            console.log('show twitter');
            $('#conversation-headline').html('What people are saying:');
            this.hideDisqus();
            $('.twitter-wrapper').show();
        },

        hideDisqus : function()
        {
            console.log('hide disqus');
            $('.disqus-wrapper').hide();
        },
        showDisqus : function()
        {
            $('#discussion').show();
            $('#conversation-headline').html("If WBEZ investigates this question, what should we consider? What's your experience with this?");
            console.log('show disqus');
            this.hideTwitter();
            $('.disqus-wrapper').show();
        },
        hideDiscussion : function(){
            $('#discussion').hide();
        },

    
        loadInvestigated:function(){
            console.log('loading featured');
            var Questions = curiouscity.module("questions"),
                questionsCollection,
                investigatedQuestionData;

            investigatedQuestionData =_.filter(questionData.archive,function(item){
                    return (item.investigated>0);
                });

            questionsCollection = new Questions.Collection(investigatedQuestionData,{
                comparator : function(question){
                    return 100-Math.floor(Math.random()*100);
                }
            });
            

            _.each( _.toArray(questionsCollection) ,function(question){
                var investigatedView = new Questions.Views.Investigated({model:question});
                $('.slide-wrapper-lite').append(investigatedView.render().el);
            });
        },
    
        /******* VOTE PAGE **********/
        
        loadVoteQuestions : function(){
            var Questions = curiouscity.module("questions");
                
            this.router.navigate("!/vote/current");
            this.hideDisqus();
            this.questionID=-1;
            $('#discussion-headline').html("What people are saying:");
            $('.focus').hide().removeClass('focus');
            $('#vote-page').addClass('focus').show();
            $('#discussion').show();

            //only load once per visit
            if( !this.questionsCollection){
                
                this.questionsCollection = new Questions.Collection(questionData.questions,{
                    comparator : function(question){
                        return question.get('rank');
                    }
                });
                
                
                if(_.isUndefined(this.questionsCollection.get(this.vote))) this.questionsCollection.canvote=true;
                else this.questionsCollection.canvote=false;
                
                
                this.questionsCollection.current=questionData.current;
                this.questionsCollection.previous=questionData.previous;
                this.questionsCollection.yourvote=this.vote;
                this.questionsCollection.previousWinner=questionData.previousWinner;
    
                this.displayVoteQuestions();
                if(this.questionsCollection.canvote===0){
                    $('#vote-page .super h1').html("Thanks for voting! ");
                    $('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/curiouscityproject' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
                }

                else{
                        $('#vote-page .super h1').html("Which should we investigate next? ");
                        $('#vote-page .sub h5').html("Select the question you’d most like answered.");
                
                }
                $('#previous-winner').find('h2').html("LAST WEEK'S WINNER!");
                $('#previous-winner').find('h5').html('<a href ="#!/previous/'+this.questionsCollection.previous.id+'" >"'+this.questionsCollection.previousWinner.question.substr(0,100)+'..."</a>');
            }
        },
        
        displayVoteQuestions : function(){
            var _this = this,
                Questions = curiouscity.module("questions");
            if( this.questionsCollection.canvote )
            {
                console.log('--you can vote! :)');
                _.each( _.shuffle( _.toArray( this.questionsCollection ) ),function(question){
                    
                    var questionView = new Questions.Views.Vote({model:question,voted:false, attributes:{'data-id':question.id,'data-rank':question.get('rank')}});
                    $('#questions').append(questionView.render().el);
                });
            } else {
                console.log('--you cannot vote :(');
                _.each( _.toArray( this.questionsCollection ),function(question){
                    var questionView = new Questions.Views.Vote({model:question,voted:true, voted_this: _this.questionsCollection.yourvote==question.id });
                    $('#questions').append(questionView.render().el);
                    //questionView.delegateEvents();
                });
            }
        },
        
        voteOnQuestion : function(){
            
            $('#vote-page .super h1').html("Thanks for voting! ");
            $('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/http://www.facebook.com/curiouscityproject' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
            
        },
    
    
        /********** PREVIOUS VOTE PAGE ***********/
        
        loadPrevious : function(id){
            var _this=this,
                Questions = curiouscity.module("questions");

            this.router.navigate("!/previous/"+id);
            this.loadFeatured();
            this.questionID=-1;
           
            $('#previous-winner-question').empty();
            $('#previous-questions').empty();
            
            $('#discussion-headline').html("What people are saying:");
            $('.focus').hide().removeClass('focus');
            $('#previous-vote-page').addClass('focus').show();
        
            this.previousCollection = new Questions.Collection({votingperiod:id},{
                comparator : function(question){
                    return question.get('rank');
                }
            });
            
            $('#previous-vote-page').spin();
            this.previousCollection.reset();
            this.previousCollection.fetch({
                success:function(collection,response){
                
                    DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.identifier = _this.previousCollection.votingperiod;
                        }
                    });
                    
                    $('#previous-vote-page').spin(false);
                    _this.displayPreviousQuestions();
                }
            });
        },
        
        displayPreviousQuestions : function(){
            
            var _this=this,
                questionView,
                Questions = curiouscity.module( "questions" );
            
                _.each( _.toArray( this.previousCollection ),function( question ){
                    questionView = new Questions.Views.Previous({ model: question });
                    if( question.get('winner')==1) {
                        $('#previous-winner-question').append( questionView.render().el );
                    }
                    else $('#previous-questions').append( questionView.render().el );
                    
                });
                
                $('#previous-period-title').html("Week of "+this.previousCollection.current.title);
                
                $('#voting-date-next').html("Voting for "+this.previousCollection.next.title+" <i class='arrow right'></i>"  ).unbind().click(function(){
                    if(_this.previousCollection.next.id=='current') _this.loadVoteQuestions();
                    else _this.loadPrevious(_this.previousCollection.next.id);
                    return false;
                });
                
                if(this.previousCollection.previous.id != -1){
                    $('#voting-date-previous').html("<i class='arrow left'></i>  Voting for "+this.previousCollection.previous.title).attr('href','#!/previous/'+this.previousCollection.previous.id);
                }
                else $('#voting-date-previous').empty();
        },
        
        /******* ASK A QUESTION PAGE **********/
        
        loadAsk : function(options){
            var Questions = curiouscity.module("questions");

            $('.submit-question-text').attr('value',options);
            this.askView = new Questions.Views.Ask();
            
            $('#ask-modal').html(this.askView.render().el);
            $("#ask-modal").modal('show');
        },
        
        
        
        /******* QUESTION ARCHIVE PAGE **********/
        
        loadArchiveQuestions : function(page,category,sort){
            
            var Questions = curiouscity.module("questions"),
                questionsCollection,
                filteredQuestions,
                questionView,
                investigatedView;

            this.page=page;
            this.category = _.isUndefined(category) ? "all" :category;
            this.sort = _.isUndefined(sort) ? "recent" : sort;
            $('.focus').hide().removeClass('focus');
            $('#'+page+'-page').addClass('focus').show();
    


                
            if(page=='archive')    {
                filteredQuestions=_.filter(questionData.archive,function(item){
                    
                    if(category=='all') return item.badge!="answered"&&item.badge!="investigated";
                    else return item.badge!="answered"&&item.badge!="investigated"&&item.categories.indexOf(category.replace(/-/g," "))>-1;
                });
            } else {
                filteredQuestions=_.filter(questionData.archive,function(item){
                    
                    if(category=='all') return item.badge=="answered"||item.badge=="investigated";
                    else return (item.badge=="answered"||item.badge=="investigated")&&item.categories.indexOf(category.replace(/-/g," "))>-1;
                });
            }


            if(sort=='popular'){
                questionsCollection = new Questions.Collection(filteredQuestions,{
                    comparator : function(question){
                        return 100-question.get('comments');
                    }
                });
            } else {
                questionsCollection = new Questions.Collection(filteredQuestions,{
                    comparator : function(question){
                        return 100-question.get('dateuploaded');
                    }
                });
            }

            $('#'+page+'-page').find('a').removeClass('category-selected');
            $('#'+page+'-page #'+this.sort).find('a').addClass('category-selected');
            $('#'+page+'-page #'+category).find('a').addClass('category-selected');

        
            $('#'+page+'-page #archive-questions').empty();
            $('#main-carousel .slide-wrapper').empty();
            _.each( _.toArray(questionsCollection) ,function(question){
                questionView = new Questions.Views.archive({model:question});
                $('#'+page+'-page #archive-questions').append(questionView.render().el);
                if(question.get('investigated')>0){
                    investigatedView = new Questions.Views.Investigated({model:question});
                    $('.slide-wrapper').append(investigatedView.render().el);
                }
            });
        
            //this.loadCarousel();
            _.each( _.toArray(questionsCollection),function(question){
                
            });
        },

        
        
        /******* SINGLE QUESTION PAGE **********/
            
        loadSingleQuestion : function( questionID ){
        
            
            var _this = this,
                Questions = curiouscity.module("questions"),
                question = new Questions.Model({id:questionID});
            

            window.scroll(0,0);
            this.questionID=questionID;
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = "question-"+questionID;
                    this.page.url = "http://curiouscity.wbez.org/#!/archive/question/"+questionID;
                }
            });
    
            this.showDisqus();

            $('.focus').removeClass('focus').hide();
            $('#question-page').empty();
            $('#question-page').addClass('focus').show().spin();
          
            question.fetch({
                success : function(){
                    _this.displaySingleQuestion( question );
                }
            });
            return false;
        },
        
        displaySingleQuestion : function( model ){
            var Questions = curiouscity.module("questions");
            var questionView = new Questions.Views.Single({model:model});

            $('#question-page').spin(false);
            $('#question-page').html(questionView.render().el);
        },
        
        
        /****** DISQUS *********/
        loadDisqus : function(){
            $('#disqus-add-comment').click(function(){ $('#dsq-reply').fadeIn();});
            $('#disqus-sort-popular').click(function(){
                $('#disqus-sort-newest').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
                $('#disqus-sort-popular').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');
                DISQUS.dtpl.actions.fire('thread.sort', 'best');
            });
            $('#disqus-sort-newest').click(function(){
                $('#disqus-sort-popular').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
                $('#disqus-sort-newest').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');
                DISQUS.dtpl.actions.fire('thread.sort', 'newest');
            });
        },
        
        disqusCommentInserted: function(){
            if(this.questionID!=-1) $.post('php/comment.php?new=true&questionid='+this.questionID, function(data){});
        },
        
        disqusCommentDeleted: function(){
            if(this.questionID!=-1)$.post('php/vote.php?questionid='+this.questionID, function(data){});
        }
        
        }, Backbone.Events)

};
