
(function(Questions) {


    Questions.Views.Single = Backbone.View.extend({
            
        
        tagName : 'div',
        className: 'question-single',
        
        initialize : function()
        {
            console.log('question',this.model);
        },
        
        render : function( )
        {
            if(this.model.get('timelinekey') !== '' && this.model.get('answered')!=1 ) $(this.el).html( _.template(this.getTimelineTemplate(),this.model.attributes));
            else $(this.el).html( _.template(this.getTemplate(),this.model.attributes));

            if(this.model.get('previous')==-1)$(this.el).find('.previous').hide();
            if(this.model.get('next')==-1)$(this.el).find('.next').hide();

            return this;
        },
        
        events : {
            "click .notebook": "showTimeline"
        },
        
        showTimeline: function(){
            var timeline ="<iframe src='http://embed.verite.co/timeline/?source="+this.model.get('timelinekey')+"&font=Bevan-PotanoSans&maptype=toner&lang=en&width=940&height=650' width='940' height='650' frameborder='0'></iframe>";
            $(".timeline-modal .modal-body").html(timeline);
            $(".timeline-modal").modal('show');
            return false;
        },

        goToPrev : function()
        {

            curiouscity.app.goToPrevInArchive();
            return false;
        },
        
        goToNext : function()
        {
            curiouscity.app.goToNextInArchive();
            return false;
        },
    
        getTimelineTemplate : function()
        {
            var html =
            
            "<ul  class='pager'>"+
                "<li class='previous'><a href='#!/archive/question/<%= previous %>'  onClick='_gaq.push([\"_trackEvent\", \"CC-Question\", \"Click Previous\", \"\"]);'  ><i class='arrow left'></i> Previous Question</a></li>"+
                "<li class='next'><a href='#!/archive/question/<%= next %>'  onClick='_gaq.push([\"_trackEvent\", \"CC-Question\", \"Click Next\", \"\"]);' >Next Question <i class='arrow right'></i></a>"+
            "</ul>"+
            "<iframe src='http://embed.verite.co/timeline/?source=<%= timelinekey %>&font=Bevan-PotanoSans&maptype=toner&lang=en&width=940&height=650' width='940' height='650' frameborder='0'></iframe>";
            
            return html;
        },
    
        getTemplate : function()
        {
            var html =
        
            "<ul  class='pager'>"+
                "<li class='previous'><a href='#!/archive/question/<%= previous %>'  onClick='_gaq.push([\"_trackEvent\", \"CC-Question\", \"Click Previous\", \"\"]);'  ><i class='arrow left'></i> Previous Question</a></li>"+
                "<li class='next'><a href='#!/archive/question/<%= next %>'  onClick='_gaq.push([\"_trackEvent\", \"CC-Question\", \"Click Next\", \"\"]);' >Next Question <i class='arrow right'></i></a>"+
            "</ul>"+
            "<div class='row'>"+

                "<div class='span4'>"+
                    "<div class='question-image' style='background-image:url(<%= imageurl %>)'>"+
                        "<span class='image-credits' ><a target='blank' href='<%= imageattribution %>'><%= imageusername %></a></span>"+
                    "</div>";
             if(this.model.get('timelinekey') !== ""&&this.model.get('answered')==1 ){
                html +="<div class='reporters-notebook'><h2>Reporter's Notebook</h2><p>See how the investigation unfolded!</p><a href='#' class='notebook'> <img src = 'images/reporter_notebook.png'/></a></div>";
             }


            html+=    "</div>"+

                "<div class='span8 single-question-content'>"+
                    "<h1><%= question %></h1>"+
                    "<p>posted by <%= name %></p>"+
                    "<div class='soundcloud'><%= soundcloud %></div>";
                    
            if( this.model.get('responseembed') !== '' || this.model.get('responselinkurl') !== '' )
            {
                html +=    "<div><h3>The Answer:</h3></div>"+
                    "<div class='response-embed'><%= responseembed %></div>"+
                    "<div class='response-link'><h3><a href='<%= responselinkurl %>' target='blank'><%= responselinktext %></a></h3></div>";
            }
            html +=
                    "<div class='question-discussion'></div>"+
                "</div>"+
            
            "</div>";
            
            return html;
        }
        
    
    });

})(curiouscity.module("questions"));