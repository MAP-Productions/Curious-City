(function(Questions) {

    Questions.Collection.Flickr = Backbone.Collection.extend({
        


        initialize : function(options)
        {
            _.extend(this,options);
        },
        
        url: function()
        {
            return 'php/flickr.php?query='+this.query;
        },
        
        parse: function(data)
        {
            return data.photo;
        },
        
        comparator : function(question)
        {
            return question.get('rank');
        }
    });

})(curiouscity.module("questions"));
