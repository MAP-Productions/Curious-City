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
    <meta property="og:title" content="Curious City"/>
    <meta property="og:type" content="movie"/>
    <meta property="og:url" content="http://curiouscity.wbez.org/"/>

    <meta property="og:image" content="http://curiouscity.wbez.org/images/about.png"/>
    <meta property="og:image" content="http://curiouscity.wbez.org/images/cc-logo-fb-2.png"/>
    <meta property="og:site_name" content="Curious City"/>
    <meta name="viewport" content="width=device-width">
    <!-- Application styles -->
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/curiouscity.css">
    <!--[if lte IE 7]><link rel="stylesheet" href="css/ie7.css"><![endif]-->
    <link rel="shortcut icon" href="images/favicon.ico">
    <script src="js/lib/modernizr-2.5.3.min.js"></script>

    <script type="text/javascript">
        
        if (!window.console) console = {log: function() {}};
        

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-369047-1']);
        _gaq.push(['_setDomainName', '.wbez.org']); 

        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
        })();
    </script>
    
    <!--
    script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
    <script type="text/javascript">stLight.options({publisher: "c09036ef-5691-4751-b69d-288d40fa03f7"}); </script>
    -->
    

    
    
</head>
<body>
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
    

    <div id="how-it-works" class="clearfix hide closed" style="display: none;">
         <div class="container">
            <div id="intro">
                <h2>Curious City is a news-gathering experiment housed at Chicago Public Media - WBEZ 91.5fm. You ask us the questions you’ve always wondered about Chicago, the region or its people, vote for your favorites and together we track down answers. It’s your Curious City.</h2>
            </div>
            <ul id="instructions">
                <li class="step-1">
                    <i class="number-1"></i>
                    Questions come from the community
                </li>
                <li class="step-2">
                    <i class="number-2"></i>
                    You vote for your favorites 
                </li>
                <li class="step-3">
                    <i class="number-3"></i>
                    WBEZ investigates, posting updates in real time 
                </li>
                <li class="step-4">
                    <i class="number-4"></i>
                    Followers help shape the investigation
                </li>
                <li class="step-5">
                    <i class="number-5"></i>
                    We discover the answers together!
                </li>
            </ul>                
            <a href="#" class="close"><img src="images/close.png" alt="close" /></a>
        </div>

    </div>
    <div id="wbez-header">
        <div class="container">
            <div class="header-logo pull-left">
                <a onClick="_gaq.push(['_trackEvent', 'CC-General', 'Click on WBEZ logo']);" href="http://wbez.org" target="blank">
                    <img src="images/wbez.png" alt="WBEZ91.5" height="20px"/>
                </a>
            </div>
            <div class="social pull-right">
                <div class="header-icon-social">
                    <a href="https://twitter.com/wbezcuriouscity" target="_blank"><img class='twitter-icon' src="images/twitter_16.png"/></a>
                    <a data-toggle="modal" href="#listen-modal" target="_blank"><img class='radio-icon' src="images/icon_radio.png"/></a>
                    <!--<a href="#" target="_blank"><img class='rss-icon' src="images/icon_rss.png"/></a>-->
                </div>
                <a href="#!/about" id='how-it-works-expander' onClick="_gaq.push(['_trackEvent', 'CC-General', 'Click on How it Works', '']);">How it Works</a> | 
                <a href="#!/about" id='nav-about'>About</a> | 
                <a href='#!/about/faq'>FAQ</a> | 
                <a href="mailto:curiouscity@wbez.org" onClick="_gaq.push(['_trackEvent', 'CC-General', 'Mail curiouscity@wbez.org']);" target="blank"><img class='email-icon' src="images/icon_email.png"/></a>
            </div>
        </div>
    </div>
    
    <div class="container main">
    
        <header>
            
            <div id="cc-nav">
                <div class="row">
                    <div class="span12">
                        <a href="#" class='cs-logo pull-left' >
                            <img src="images/cc-logo.gif" alt="curiouscity" height="75px" width="310px" />
                        </a>
                        
                        <div class="question-form">    
                            <div class="control-group">
                                <div class="submit-wrap">
                                    <div class="carrot"></div>
                                    <textarea id="submit-question-text" class="submit-question-text span8" placeholder="What do you wonder about Chicago, the region or its people that you want WBEZ to investigate?"></textarea>
                                    <div class="clear"></div>
                                    <a id="ask-submit" href="#" class="btn submit-next">Ask</a>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
                
            </div>
        
        </header>
        <div class="cc-nav-wrap">
            <ul id="cc-nav" class='cc-nav'>
                <li><a href="#!/vote/current" id='nav-vote'>Up for Voting <span></span></a></li>
                <!--li><a href="#!/ask" id='nav-ask'>ask a<br />question</a></li-->
                <li><a href="#!/answered/all" id='nav-answered'>Answered &amp; Investigating <span></span></a>
                    
                    <ul>
                        <li><a href="#!/answered/how-we-live">How We Live</a></li>
                        <li><a href="#!/answered/history">History</a></li>
                        <li><a href="#!/answered/environment">Environment</a></li>
                        <li><a href="#!/answered/economy">Economy</a></li>
                        <li><a href="#!/answered/governance">Governance</a></li>
                        <li><a href="#!/answered/urban-planning">Urban Planning</a></li>
                        <li><a href="#!/answered/whats-it-like">What's it Like to...</a></li>
                        <li class="carrot"></li>
                    </ul>
                </li>
                <li><a href="#!/archive/all" id='nav-archive'>New and Unanswered <span></span></a>
                   
                    <ul>
                        <li><a href="#!/archive/how-we-live">How We Live</a></li>
                        <li><a href="#!/archive/history">History</a></li>
                        <li><a href="#!/archive/environment">Environment</a></li>
                        <li><a href="#!/archive/economy">Economy</a></li>
                        <li><a href="#!/archive/governance">Governance</a></li>
                        <li><a href="#!/archive/urban-planning">Urban Planning</a></li>
                        <li><a href="#!/archive/whats-it-like">What's it Like to...</a></li>
                        <li class="carrot"></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div id="pages">
            
            <div id="vote-page" class="hide focus">
                <div id="flash">
                    <div class="row">
                        <div class="span4">
                            <div class="side-link">
                                <a href="#" id="previous-round"><span class="arrow left grey"></span></a>
                            </div>
                        </div>
                        <div class="span8 right-col">
                            <div class="super">
                                <h1></h1>
                            </div>
                            <div class="sub">
                                <h5></h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="questions"></div>
                <div id="questions-order" class="hide"></div>
            </div>
                
            <div id="previous-vote-page" class="hide focus">
                <div id="flash">
                    <div class="row">
                        <div class="span4">&nbsp;</div>
                        <div class="span8 right-col">
                            <div class="super">
                                <h1>Winning Question</h1>
                            </div>
                            <div class="sub">
                                <h5 id="previous-period-title"></h5>
                            </div>
                    
                            
                        </div>
                    </div>
                
                </div>
                <div class="row">
                        <div class="span4">
                            <br>
                            <div  class="clearfix">
                                <a id="voting-date-previous" href="#"><i class="arrow left"></i></a>
                            </div>
                        </div>
                        <div class="span8 right-col">
                            <br>
                            <div  class="clearfix">
                                <a id="voting-date-next" href="#"><i class="arrow right"></i> </a>
                            </div>
                        </div>
                </div>
                    <div id="previous-winner-question"></div>
                    <div id="flash" class="row">
                        <div class="span4" style="height=5px"><br></div>
                        <div class="span8 right-col">
                            <div class="super">
                                <h1></h1>
                            </div>
                            <div class="sub">
                                <h5>Runner-Ups</h5>
                            </div>
                            
                        </div>
                    </div>
                <div id="previous-questions"></div>
                <br><br>
                
            </div>
            
            <div id="ask-page" class="hide">
                <div id="ask-flash">
                    <div class="row">
                        <div class="span4 top-left-corner-info">
                            <h5>Tune in Wednesdays to <a href="http://www.wbez.org/programs/afternoon-shift-steve-edwards" target="blank">The Afternoon Shift</a> on <a href="http://www.wbez.org" target="blank">WBEZ 91.5</a><br />
                            to hear updates and find out final results.</h5>
                        </div>
                    
                    </div>
                </div>
                <div id="ask-form"></div>
            </div>
            
            <div id="answered-page" class="hide">
                <div id="archive-flash">
                    <div class="carousel-wrap">
                        <div id="main-carousel" class="carousel">
                            <a href="#" class="slide-arrow slide-left ">slide left</a>
                            <a href="#" class="slide-arrow slide-right ">slide right</a>
                            <ul class="slide-wrapper">
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span4 left-col">

                        </div>
                            
                        <div class="archive-search">
                            <ul class="unstyled horizontal left">
                                <li id="recent"><a class="sort" href="#">Recently Updated</a></li>
                                <li id="popular"><a class="sort" href="#">Most Popular</a></li>
                                <!--<li><a href="#!/vote" class="thumb-mini">Up for Voting</a></li>-->
                                <!--<li><form class="form-search"><input type="text" class="input-large search-query" placeholder="search"/></form></li>-->
                            </ul>
                            <ul class="unstyled horizontal right">
                                <li id="all"><a href="#!/answered/all">All</a></li>
                                <li id="how-we-live"><a href="#!/answered/how-we-live">How We Live</a></li>
                                <li id="history"><a href="#!/answered/history">History</a></li>
                                <li id="environment"><a href="#!/answered/environment">Environment</a></li>
                                <li id="economy"><a href="#!/answered/economy">Economy</a></li>
                                <li id="governance"><a href="#!/answered/governance">Governance</a></li>
                                <li id="urban-planning"><a href="#!/answered/urban-planning">Urban Planning</a></li>
                                <li id="whats-it-like"><a href="#!/answered/whats-it-like">What's it Like to...</a></li>
                                <!--<li><form class="form-search"><input type="text" class="input-large search-query" placeholder="search"/></form></li>-->
                            </ul>
                            <div class="clear"></div>
                        </div>
                            
                    </div>
                </div>
                <div id="archive-questions"></div>
            </div>


            <div id="archive-page" class="hide">
                <div id="archive-flash">
                    <div class="row">
                        <div class="span4 left-col">

                        </div>
                            
                        <div class="archive-search">
                            <ul class="unstyled horizontal left">
                                <li id="recent"><a class="sort" href="#">Recently Updated</a></li>
                                <li id="popular"><a class="sort" href="#">Most Popular</a></li>
                                <!--<li><a href="#!/vote" class="thumb-mini">Up for Voting</a></li>-->
                                <!--<li><form class="form-search"><input type="text" class="input-large search-query" placeholder="search"/></form></li>-->
                            </ul>
                            <ul class="unstyled horizontal right">
                                <li id="all"><a href="#!/archive/all">All</a></li>
                                <li id="how-we-live"><a href="#!/archive/how-we-live">How We Live</a></li>
                                <li id="history"><a href="#!/archive/history">History</a></li>
                                <li id="environment"><a href="#!/archive/environment">Environment</a></li>
                                <li id="economy"><a href="#!/archive/economy">Economy</a></li>
                                <li id="governance"><a href="#!/archive/governance">Governance</a></li>
                                <li id="urban-planning"><a href="#!/archive/urban-planning">Urban Planning</a></li>
                                <li id="whats-it-like"><a href="#!/archive/whats-it-like">What's it Like to...</a></li>
                                <!--<li><form class="form-search"><input type="text" class="input-large search-query" placeholder="search"/></form></li>-->
                            </ul>
                            <div class="clear"></div>
                        </div>
                            
                    </div>
                </div>
                <div id="archive-questions"></div>
            </div>
            
            <div id="question-page"></div>
            
            <div id="about-page" class="hide">
                <div class="row">
                    <div class="span4 left-col">
                        <img src="images/about.png" alt="how? why?" width="300px" height="300px" border="" align="" />
                        <div class="about-sidebar">
                            <p class="">
                                <strong>Curious City</strong> is produced by Jennifer Brandel and brought to you by WBEZ, Zeega and Localore, a national initiative produced by AIR, the Association of Independents in Radio, Incorporated, and with financial support from the Corporation for Public Broadcasting, the Wyncote Foundation, the John D. and Catherine T. MacArthur Foundation, and the National Endowment for the Arts.
                            </p>
                            <p>
                                Curious City is part of a national initiative of AIR, the Association of Independents in Radio, Inc designed to bring new journalistic and technical ingenuity to extending public media service to more Americans.  From <a href="http://planettakeout.org/" target="blank"> Chinese restaurants in Boston</a>, to shuttered factories in Dayton, to the <a href="http://blackgoldboom.com/" target="blank">oilfields of North Dakota</a>, to Bay Area startups, the ten Localore production teams are working with their public station incubators to uncover ground-up stories of America in transition. Follow their development and learn more at Localore.net.
                            </p>
                        </div>
                    </div>
                    <div class="span8 right-col">
                        
                        <div class="section-head">
                            <h3>Got a question about Chicago, the region or the people who live here? Anything you’ve always wondered about, found peculiar or downright confusing? Ask questions, vote, discover answers. It’s your Curious City. </h3>
                        </div>
                        <div class="about-description">
                            <p>Waiting for the CTA ... lost in thought while walking downtown ... sometime during lather, rinse, repeat. Those in-between moments when our brains aren’t forced into focus are ripe for pondering the whys, what-ifs and how-comes.</p>
                            <p>WBEZ’s Curious City is the place your brain can release all those fleeting questions. There are two ways your questions can turn into stories. One is through our voting process. We scour all the questions submitted for good story ideas and put the best up for public vote. The curious citizens who ask the winning question are then matched up with a WBEZ reporter to investigate! Those investigations unfold before your eyes on our timeline tool so you can see the journalistic process as it happens.</p>
                            <p>The other way questions become stories is when a reporter gets really excited about a question and decides to take it on. In these cases reporters will still reach out and involve you in the process, but your question will not get a timeline. Either way though, our Curious City assignments come entirely from the public.</p>
                            <p>You can tag along and learn in real-time how we find our answers and put our stories together. We need your comments, insights and suggestions – to get the best leads and to find the best angles! Follow us on <a href="http://www.facebook.com/curiouscityproject" target="blank">Facebook</a>, <a href="http://twitter.com/#!/WBEZCuriousCity" target="blank">Twitter</a>, and <a href="http://www.wbez.org/curiouscity" target="blank" >WBEZ’s website</a>, and listen to Curious City’s weekly Wednesday check-ins on <a href="http://www.wbez.org/programs/afternoon-shift-steve-edwards" target="blank">The Afternoon Shift</a> on WBEZ 91.5fm.</p>
                            <p>Beyond wondering about what you wonder about, Curious City is a journalistic experiment to get to the bottom of some hard questions. What happens when WBEZ invites the public to assign us stories? What could more transparency and audience involvement look like, and how are journalists and journalism changed by it? And does anyone actually care to know how the media they consume is made? In the process, we aim to track down and deliver answers to as many of your questions as we can.</p>
                        </div>
                        
                        <div class="the-team">
                            <h3>The Team</h3>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Jennifer Brandel:</span> <span class="title">Lead Producer</span>
                                </div>
                                <p>Brandel is an independent, self-taught reporter and has worked as a general assignment reporter for WBEZ’s newsdesk. She’s reported dozens of feature pieces locally for WBEZ and nationally for <i>Day to Day</i>, <i>Weekend America</i>, <i>Latino USA</i> and <i>Interfaith Voices</i>. She’s the recipient of a 2011 Illinois AP award for “Best use of Sound.” Brandel has served as an assistant producer for <i>Wait! Wait! Don’t Tell Me!</i>, a blogger for Transom.org, and the talent for pieces aired on <i>WireTap</i>, <i>Love and Radio</i>, and <i>How To Do Everything</i>. Brandel has also produced radio conferences and broadcasts for The Third Coast International Audio Festival. Her photographs have been published in The New York Times online and Vice Magazine, and she has filmed on a variety of video projects for musician Andrew Bird. Most importantly, she pitches for the WBEZ intramural softball team.                                </p>
                            </div>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Shawn Allee:</span> <span class="title">Editor</span>
                                </div>
                                <p> Shawn edits broadcast and online work produced by WBEZ's Community Bureaus, which are on Chicago"s West, North and South Sides as well as Northwest Indiana. His own radio work landed him on NPR’s <i>On The Media</i>, <i>All Things Considered</i>, <i>This American Life</i>, <i>Marketplace</i> and other public radio outlets. His investigations of nuclear power and dioxin cleanups earned him several awards, including a National Edward R. Murrow award for best audio news series. He digs taking photographs, especially of his cats and prized LEGO robots.                                 </p>
                            </div>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Logan Jaffe:</span> <span class="title">Intern</span>
                                </div>
                                <p>Logan Jaffe is a web producer and multimedia journalist from Miami, Florida. She’s worked as a web designer and workshops assistant at Smathers Libraries, a photographer for The Gainesville Sun and has completed internships with The Isthmus in Madison, Wisconsin and The Miami Herald. She is the Art and Layout editor of the soon-to-be-published book, <i>Self-Portraits of American Union Members</i>. Jaffe graduated from the University of Florida with a degree in journalism and spends her free time rock climbing, making 16mm films or chasing her cat around (sometimes simultaneously).                                </p>
                            </div>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Zeega:</span> <span class="title">Curious City Interactive Producers</span>
                                </div>
                                <p> Zeega is a non-profit inventing new forms of interactive storytelling. The Zeega team is an expanding mix of media-makers, artists and creative technologists. We create projects across multiple platforms, connect digital media to physical spaces, and develop open-source tools to enable anyone to experiment with the web as a creative medium.
                                </p>
                            </div>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Plural:</span> <span class="title">Curious City Designers</span>
                                </div>
                                <p> Plural is a Chicago-based creative studio practice founded in 2008. With a focus on pursuing meaningful projects, Plural explores new approaches within the design process, experimenting in a wide range of media including print, web, video, sound, interactive and installation.
                                </p>
                            </div>
                            
                            <div>
                                <div class="team-name">
                                    <span class="name">Special Thanks:</span>
                                </div>
                                <p> This project would not be possible without the generous, invaluable help and support of many individuals and organizations. Extra special thanks go to the following people: Torey Malatia, Daniel Ash, Sally Eisele, Matthew Green, Jane Verwys, Breeze Richardson, Vanessa Harris, Jill Shepherd, Beth Maggard, Eric Bouska, Justin Kaufmann, Steve Edwards, Thales Exoo, Adam Yoffe, Sarah Lu, Cate Cahan, Aurora Aguilar, Shannon Heffernan, Katie Mingle, Heidi Goldfein, Sue Schardt, Noland Walker, Jessica Clark, Lo Audley, Lindsey Wagner, James Burns, Kara Oehler, Jesse Shapins, Jeremiah Chiu, Renata Graw, and Aaron Wickenden.                   </p>
                            </div>
                            
                        </div>
                        
                        <div id='faq'>
                            <h3>FAQ</h3>
                            <ul class='faq-list unstyled'>
                                <li>
                                    <div class='faq-question'>How do you collect questions?</div>
                                    <p>
                                        We use several tools to collect questions. One is a web page where you can submit questions  as well as select related photos from flickr’s creative commons. We also take questions through a toll-free phone number: 1-888-789-7752. Curious City producers also visit various neighborhoods in Chicago, the suburbs and Northwest Indiana, collecting questions from everyday folks as they walk by. We announce such visits through Twitter and our Facebook page. All questions asked make it to the question archive, unless they don’t meet the website’s guidelines for decorum and fairness. If you submitted a question recently by phone or in person, it may take us a few days to post it. We appreciate your patience! We do not accept questions posed by WBEZ staff. 
                                    </p>
                                </li>
                                <li>
                                    <div class='faq-question'>How do you pick the questions for voting rounds?</div>
                                    <p>
                                        Every week or so, the Curious City staff read through recent entries in the question archive and select a few questions for a round of voting, which can last up to two weeks. We look for different qualities in questions each time. Did we just have a round of hard-hitting, investigative questions? For the next round, we may go with lighter fare or narrow selections by theme (e.g. history). Production time is another factor. Did the last questions have a broad scope and take weeks to report out? If so, we may select questions for the next round that are more specific or bite-sized. We’re especially looking for questions WBEZ hasn’t answered recently or, perhaps, ever. We like to think of question curation as something like creating a mix-tape or music playlist: We start with a rationale, but let tone enter the equation, too. 
                                    </p>
                                </li>
                                <li>
                                    <div class='faq-question'>What happens if my question is in a voting round?</div>
                                    <p>
                                        Well first off, congratulations! We typically keep votes open for anywhere from a week to two week, a range that allows us to juggle schedules for reporters, producers and show hosts. We notify question submitters about when we intend to close voting on a round of questions; usually we will do so at least one day ahead of time. So you’ll have time to ask friends, family and your social networks for their support. 
                                    </p><p>
                                        If your question does win a vote ‒ double congratulations! WBEZ will be in touch with you about next steps. You’ll may have the opportunity to tag along with us in some capacity while we find answers to your questions. Participation opportunities largely depend on your interest, your schedule and the schedule of our reporters. The public at large will also be able to keep up with the investigation as it unfolds via our Facebook page and Twitter feed, as well as website. 
                                    </p>
                                </li>
                                <li>
                                    <div class='faq-question'>What happens if my question is in a voting round and doesn’t win? Will it still get answered?</div>
                                    <p>
                                        Questions that don’t get picked for one voting round could still make into other rounds down the line. We’ll be in touch if and when that happens. But WBEZ editors keep an eye on our question archive, too, so some questions might inspire independent stories or segments on our locally-produced programs such as The Morning Shift, Worldview or The Afternoon Shift. When that happens, we’ll be in touch and post the content we create to your question’s page. Similarly, sometimes our reporters may have answered your question in WBEZ’s coverage before you even asked it! For example, Jake asked, “What happened to all of the people who lived in Cabrini Green?” and earlier in that same week, WBEZ devoted an hour of coverage to this very question. We’ll post content that relates to your question as we find it in the comments section of your question. 
                                    </p><p>
                                        And there’s another way your question may be answered ‒ by the public! Anyone is able to comment on the questions in the archive. So if you know the answer to someone else’s question, don’t be shy! Let them know the information you have, and whenever possible, cite your sources. 
                                    </p>
                                </li>
                                <li>
                                    <div class='faq-question'>Why do you change the wording of some questions when they enter a voting round?</div>
                                    <p>
                                        WBEZ reserves the right to edit questions for clarity and brevity. A person may ask a great question but it might be four sentences long when the same idea could come across in one. And sometimes a question may have information in it we can’t verify or may be incorrect. We also attempt to edit submissions to keep them within the space allotted by our website’s design, which aims to keep the look clean and uniform. We always attempt to edit questions so that the broadest audience will read them in their entirety and consider them.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        
                        
                        
                    </div>
                </div>
            </div>
            
        </div>

    
        <div id="discussion">

            <div >
                <div class="row">
                    <div class="span4" id="current-investigations-wrapper">
                        <div class="side-link">
                             <span class="current-investigations">Current Investigations</span>
                        </div>
                        <div class="carousel-wrap">
                            <div class="carousel lite">
                                <a href="#" class="slide-left ">slide left</a>
                                <a href="#" class="slide-right ">slide right</a>
                                <ul class="slide-wrapper-lite">
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div class="span8">
    
                        <h2 id="conversation-headline">What People are saying:</h2>
                        <div class='twitter-wrapper'>

                            <script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
                            <script>
                            new TWTR.Widget({
                              version: 2,
                              type: 'search',
                              search: 'WBEZCuriousCity',
                              interval: 30000,
                              title: '',
                              subject: '',
                              width: 'auto',
                              height: 300,
                              theme: {
                                shell: {
                                  background: '#ffffff',
                                  color: '#ffffff'
                                },
                                tweets: {
                                  background: '#ffffff',
                                  color: '#000000',
                                  links: '#08C;'
                                }
                              },
                              features: {
                                scrollbar: false,
                                loop: true,
                                live: true,
                                hashtags: false,
                                behavior: 'default'
                              }
                            }).render().start();
                            </script>
                        </div>
                        
                            <div id="disqus-controls" class='disqus-wrapper'>
                                <div class="disqus-sort-tab disqus-sort-selected" id="disqus-sort-popular"><a>Popular</a></div>
                                  <div class="disqus-sort-tab disqus-sort-unselected" id="disqus-sort-newest"><a >Most Recent</a></div>
                                  <div class="disqus-guidelines" id="disqus-guidelines"><a data-toggle="modal" href="#guidelines-modal" >Guidelines</a></div>
                                  <button id="disqus-add-comment" class="btn">Add a comment</button>
                              </div>
        
        

                            <div id="disqus_thread" class='disqus-wrapper'>

                                    <!-- DISQUS -->
                                <script type="text/javascript">
                                    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                                    var disqus_shortname = 'curiouscity'; // required: replace example with your forum shortname
                                    var disqus_developer = 1;
                                    /* * * DON'T EDIT BELOW THIS LINE * * */
                                    (function() {
                                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                                        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
                                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                                    })();
                                </script>
                                    <!-- END DISQUS -->

                            </div>
    


                    </div>
                </div>
                
        </div>
    
        </div>

    
        <div class="modal cc-modal timeline-modal">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3></h3>
          </div>
          <div class="modal-body">
          </div>

        </div>

        <div class="modal cc-modal" id="listen-modal">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>Listen to Curious City!</h3>
          </div>
          <div class="modal-body">
          
            <p>You can also listen in to satisfy your curiosity!</p>
            <p></p>
            <p>Tune in to Curious City segments on <a href ="http://www.wbez.org/player" target="_blank">WBEZ 91.5fm</a> each Wednesday on <a href ="http://www.wbez.org/programs/afternoon-shift" target="_blank">The Afternoon Shift</a>.</p>
            <p></p>
            <p>And <a href ="https://itunes.apple.com/us/podcast/curious-city/id568409161" target="_blank">subscribe</a> to the Curious City podcast.</p>

          </div>

        </div>

        <div class="modal cc-modal" id="guidelines-modal">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>Guidelines</h3>
          </div>
          <div class="modal-body">
          
            <p>Your questions and comments inform, enrich and drive Curious City reporting. While sparking or contributing to the meaningful discussions, please follow these guidelines:</p>
            
            <h4>DO:</h4>
            
            <ul>
                <li>Keep your comments focused on the topic at hand.</li>
                <li>Be respectful of all who post on this blog – if you disagree with someone, be polite.</li>
                <li>Acknowledge the source of any material that’s not your own.</li>
            </ul>
            <h4>DO NOT:</h4>
            <ul>
                <li>Use profanity, personal attacks or hate speech.</li>
                <li>Promote yourself, a business or try to raise money.</li>
                <li>“Feed the trolls:” don’t respond to inflammatory or obscene posts, just flag them.  </li>
            </ul>
            <p>We reserve the right to: edit questions for clarity and brevity, close a comment thread, curate comments, not publish rumors or allegations we know to be unsubstantiated or false and to remove posts and not post questions that don’t follow these guidelines.</p>
               
          </div>
          <div class="modal-footer">
            <a data-dismiss="modal" href="#" class="btn">Close</a>
          </div>
        </div>
        
        <div class="modal cc-modal" id="good-question-modal">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h3>What makes a good Curious City question?</h3>
          </div>
          <div class="modal-body">
          
            <p>To increase the chances of WBEZ picking your question for a vote, make sure it satisfies these requirements:</p>
            
            <b>Local Relevance</b>: Questions that in some way relate to Chicago and the region. This includes but is not limited to questions about places or things in the area, local phenomenon or about a person or the people who live here.  <br>
            <i>Example of an irrelevant question</i>: Why is Missoula, Montana such a popular spot for fishing?<br>
            <i>Example of a relevant question</i>: Why is Chicago’s Navy Pier such a popular spot for fishing?  <br><br>
            
            <b>Impartial</b>: True curiosity requires an open mind and impartiality. Questions that begin with a bias are more likely to result in biased answers.<br>
            <i>Example of a biased question</i>:  Why are the CTA’s bus drivers and train operators so bad at their jobs?<br>
            <i>Example of an impartial question</i>: Why do the CTA’s buses and trains sometimes arrive in clumps even though they can track each other?<br><br>
            
            <b>Clearly stated</b>: Questions with typos and grammatical errors can be hard to understand. Before you submit, take a minute to read your question aloud to hear if it makes sense. Use spell check if you’re unsure of a spelling.  <br>
            <i>Example of an unclear question</i>: Why don’t the flores in the city building dwntwn not go to other 1s?<br>
            <i>Example of a clear question</i>: Why do the same floors in Chicago’s city and county government building not connect to one another?  <br><br>

            <p>We will NOT post or consider answering any questions that:<p>
            <ul>
                <li>are libelous, use profanity, personal attacks or hate speech</li>
                <li>promote a business or person</li>
                <li>try to raise money</li>
                <li>show bias</li>
            </ul>
            
            <p>Please direct any questions about WBEZ here: <a href="http://www.wbez.org/contact" target="blank" >www.wbez.org/contact</a><p>
            
          </div>
          <div class="modal-footer">
            <a data-dismiss="modal" href="#" class="btn">Close</a>
          </div>
        </div>

        <div class="modal cc-modal" id="ask-modal"></div>
        
        
        
        <footer>
            <div id="footer-head">Partners</div>
            <div id="sponsor-branding">
                <ul class="unstyled">
        
                    <li><a target="blank" href="http://www.zeega.org/"><div class="logo logo-zeega" ></div></a></li>
                    <li><a target="blank" href="http://www.wyncotefoundation.org/"><div class="logo logo-wyncote" ></div></a></li>
                    <li><a target="blank" href="http://www.arts.gov/artworks/"><div class="logo logo-art-works" ></div></a></li>
                    <li><a target="blank" href="http://www.macfound.org/"><div class="logo logo-macarthur"></div></a></li>
                    <li><a target="blank" href="http://www.cpb.org/"><div class="logo logo-cpb" ></div></a></li>
                    <li><a target="blank" href="http://www.airmedia.org/"><div class="logo logo-air"></div></a></li>
                    <li><a target="blank" href="http://airmediaworks.org/localore"><div class="logo logo-localore"></div></a></li>

                </ul>
        
            </div>
        </footer>
    
    </div><!-- .container -->
    
    <!-- Application source DEV 
        <script src="js/data/questions-dist.js" ></script> 
        <script data-main="js/loaders/index.js" src="js/lib/require.js"></script>
    -->
    <!-- Production -->

        <script src="js/data/questions.js#<?php echo rand(0,1000000);?>" ></script> 
         <script data-main="js_min/index.js" src="js/lib/require.js"></script>  

</body>
</html>
