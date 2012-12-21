<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Curious City</title>
    <meta name="description" content="">
    
    <meta name="viewport" content="width=device-width">
    <!-- Application styles -->
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/curiouscity-widget.css">
    <link rel="shortcut icon" href="images/favicon.ico">
    <script src="js/lib/modernizr-2.5.3.min.js"></script>

<script type="text/javascript">
            if (!window.console) console = {log: function() {}};


            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-369047-1']);
            //_gaq.push(['_trackPageview']);
            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
            })();
</script>
    <script type="text/javascript">
        
         <?php
            $handle = @fopen("js/data/questions.js", "r");
            if ($handle) {
                while (($buffer = fgets($handle, 4096)) !== false) {
                    echo $buffer;
                }
                fclose($handle);
            }
        ?>
    </script>





</head>
<body>
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
    
    <div class="wrapper">
        <div class="border">
            <header>
                <a href="http://curiouscity.wbez.org" target='blank'><img src="images/cc-logo.png"/></a>
            </header>
        
            <div class="main">
                <div id="tagline" style="opacity:0">
                    <span id="questions-count">10</span> questions, 1 will remain
                </div>
                <div id="headline" class="">
                        <h3><?php    if(isset($_COOKIE['CURIOUS_CITY_VOTE'])) echo "Thanks for voting! Ask your question below."; else echo "Which would you rather know?"; ?></h3>
                </div>
                
                
                
                
                <div id="ballot">
                    <div id="left-ballot"></div>
                    <div id="right-ballot"></div>
                    <div id="follow-up">
                        <div class="question-form">
                            <div class="submit-wrap">
                                <div class="carrot"></div>
                                <textarea class="submit-question-text span8" placeholder="What do you wonder about Chicago, the region, or the people who live here?"></textarea>
                                <div class="clear"></div>
                                <a id="submit-question" href="#" class="btn submit-next">Submit</a>
                            </div>
                            <h3>Tune in Wednesdays to <a href="http://www.wbez.org/programs/afternoon-shift-steve-edwards" target='blank'>The Afternoon Shift</a> on WBEZ for winners + updates.</h3>
                        </div>
                    </div>
                </div>
                
                
                
                <footer>
                    <div id="submit-question">
                        <a href="http://curiouscity.wbez.org/#!/archive" target="blank">Browse Questions</a> | <a href="http://curiouscity.wbez.org/#!/answered/all" target="blank">Browse Answers</a>
                    </div>
                    <ul class="unstyled">
                        <li><a target="blank" href="http://www.zeega.org/"><img src="images/logos/zeega_bw.png" /></a></li>
                        <li><a target="blank" href="http://www.wyncotefoundation.org/"><img src="images/logos/wyncote_bw.png" /></a></li>
                        <li><a target="blank" href="http://www.arts.gov/artworks/"><img src="images/logos/art-works_bw.png" /></a></li>
                        <li><a target="blank" href="http://www.macfound.org/"><img src="images/logos/macarthur_bw.gif" /></a></li>
                        <li><a target="blank" href="http://www.cpb.org/"><img src="images/logos/cpb_bw.png" /></a></li>
                        <li><a target="blank" href="http://www.airmedia.org/"><img src="images/logos/air_bw.png" /></a></li>
                        <li><a target="blank" href="http://airmediaworks.org/localore"><img src="images/logos/localore_bw.png" /></a></li>
                    </ul>
        
                    
                </footer>
                
            </div>
        </div>
    
    </div><!-- .wrapper -->

    <!-- Application source
        <script src="js/data/questions-dist.js" ></script> 
        <script data-main="js/loaders/widget.js" src="js/lib/require.js"></script> -->
    
    <!-- Production -->
      <script src="js/data/questions.js#<?php echo rand(0,1000000);?>" ></script> 
    <script data-main="js_min/widget.js" src="js/lib/require.js"></script> 
    
</body>
</html>