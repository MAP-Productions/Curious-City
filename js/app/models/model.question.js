(function(Questions){

    Questions.Model = Backbone.Model.extend({

        defaults : {
            'imageurl' : 'images/default.jpg',
            'commentcount' : 1,
            'rank_string' : '1st'
        },

        url: function()
        {
            return 'php/q.php?questionid='+this.id;
        },

        initialize : function()
        {
            var r = this.get('rank');
            if( r == 2 ) this.set('rank_string', '2nd');
            else if( r == 3 ) this.set('rank_string', '3rd');
            else if( r > 3 ) this.set('rank_string', r+'th');
        }
    });
})(curiouscity.module("questions"));
