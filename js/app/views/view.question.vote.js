
(function(Questions) {


    Questions.Views.Vote = Backbone.View.extend({
            
        
        tagName : 'div',
        className: 'question',
        
//        voted : false,
//        voted_this : false,
        
        initialize : function()
        {
            curiouscity.app.questionsCollection.on('sorted', this.sorted, this);
            _.extend(this,this.options);
            
            if(this.voted) this.events={};
        },

        render : function( )
        {
            this.$el.html( _.template( this.getTemplate(), this.model.attributes ) );
            if(this.model.get('imageattribution')) $($(this.el).find('.question-image')[0]).append("<span class='image-credits' ><a target='blank' href='"+this.model.get('imageattribution')+"'>"+this.model.get('imageusername')+"</a></span>");
            
            return this;
        },
        
        sorted : function()
        {
            var _this = this;
            this.voted = true;
            $(this.el).removeClass('hover');
            $('#questions').find('[data-id='+ this.model.id +']').after(this.render().el).remove();
        },
        
        events : {
            'click .vote' : 'voteThis',
            'mouseover .vote' : 'voteOver',
            'mouseout .vote' : 'voteOut'
        },
        
        voteOver : function()
        {
            this.$el.addClass('hover');
            this.$el.find('.vote').addClass('hover');
        },
        
        voteOut : function()
        {
            this.$el.removeClass('hover');
            this.$el.find('.vote').removeClass('hover');
        },
        
        goToQuestion : function()
        {
            //console.log('go to question!!! '+ this.model.id);
            curiouscity.app.router.navigate('!/archive/question/'+this.model.id, {trigger:true});
            return false;
            
        },
        
        voteThis : function()
        {
            console.log('vote on this one:');
            
            this.voted_this = true;
            var _this = this;
            curiouscity.app.voteOnQuestion();
            $.post('php/vote.php?votingperiod='+this.model.get('wkshtId')+'&questionid='+this.model.id, function(data){}); //vote post
            
            this.voteOver = {};
            this.voteOut = {};
            
            //sort divs
            var newOrder = $('#questions>div').clone();
            newOrder = _.sortBy( newOrder, function(div){ return $(div).data('rank'); });
            //console.log(newOrder);
            
            $('#questions').quicksand( newOrder, function(){
                curiouscity.app.questionsCollection.trigger('sorted');
            });
            
            return false;
        },
    
        getTemplate : function()
        {
            var html = '';
            
            if( !this.voted )
            {
            //console.log('you have not voted template');
                html +=
                "<div class='row' data-id='"+ this.model.id +"' data-rank='<%= rank %>'>"+
                    "<div class='span4 question-image'><img src='<%= imageurl %>' alt='question image'/></div>"+
                    "<a href='#' onClick='_gaq.push([\"_trackEvent\", \"CC-Vote\", \"Vote\", \"\"]);' ><i class='vote'></i></a>"+
                    "<div class='span8 question-text'>"+
                        "<h2><%= question %></h2>"+
                        "<p class = 'author'>Asked by <%= name %></p>"+
                    "</div>"+
                "</div>";
            }
            else
            {
            //console.log('you HAVE voted template');
                html +=
                "<div class='row'>"+
                    "<div class='span4 question-image'><img src='<%= imageurl %>' alt='question image'/>"+
                        "<div class='rank-corner'></div>"+
                        "<h2 class='rank-number'><%= rank_string %></h2>"+
                    "</div>";
                if(this.voted_this) html += "<a href='#'><i class='vote hover'></i></a>";
                html += "<div class='span8 question-text'>"+
                        "<h2><a class='question-link' href='#!/archive/question/"+this.model.id+"' onClick='_gaq.push([\"_trackEvent\", \"CC-Vote\", \"Click on Question\", \"\"]);'><%= question %></a></h2>"+
                        "<p class='author'>Asked by <%= name %></p>"+
                        "<div class='comment-count'><a href='#!/archive/question/"+this.model.id+"' onClick='_gaq.push([\"_trackEvent\", \"CC-Vote\", \"Click on Discuss\", \"\"]);' class='question-link'>Discuss <i class='icon-comment'></i></a></div>"+
                    "</div>"+
                "</div>";
            }
            
            return html;
        }
        
    
    });

})(curiouscity.module("questions"));