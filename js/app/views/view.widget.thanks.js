
(function(Questions) {


    Questions.Views.WidgetThanks = Backbone.View.extend({
            
        
        tagName : 'div',
        className: 'question-thanks',
        vote : true,
        
        initialize : function(){},
        
        render : function( )
        {

            //copy the cloned item into the el
            $(this.el).html( _.template( this.getTemplate(), this.model.attributes ) );
            
            return this;
        },
        
        events : {},
    
        getTemplate : function()
        {
            var html =
            
                "<div class='ballot-image'></div>"+
                "<div class='thanks-text'>"+
                    "<h3>Thanks!<br /><%= percent %>% Agree</h3>"+
                /*
                "<div class='social'><i class='social-facebook'></i><i class='social-twitter'></i><i class='social-googleplus'></i></div>"+
                    "<p>share your vote</p>"+
                */
            "</div>";
            
            return html;
        }
        
    
    });

})(curiouscity.module("questions"));