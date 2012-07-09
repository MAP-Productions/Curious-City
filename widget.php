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
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-369047-1']);
			_gaq.push(['_trackPageview']);
			(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
			})();
</script>
	<script type="text/javascript">
		<?php
			require_once 'php/config.php';
			$votingPeriod = "current";
			set_include_path("gdata/library");

			require_once 'Zend/Loader.php';
			Zend_Loader::loadClass('Zend_Gdata');
			Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
			Zend_Loader::loadClass('Zend_Gdata_Spreadsheets');
			Zend_Loader::loadClass('Zend_Gdata_App_AuthException');
			Zend_Loader::loadClass('Zend_Http_Client');

		
			try{
				$client = Zend_Gdata_ClientLogin::getHttpClient($email, $password, Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME);
			}catch (Zend_Gdata_App_AuthException $ae) {
				exit("Error Connecting");
			}

			$spreadsheetService = new Zend_Gdata_Spreadsheets($client);
	
			/* GET WORKSHEET INFO */
			
			$query = new Zend_Gdata_Spreadsheets_DocumentQuery();
			$query->setSpreadsheetKey($spreadsheetKey);
			$feed = $spreadsheetService->getWorksheetFeed($query);
			
			$wkshtIndex=1;
			$wkshtId = explode('/', $feed->entries[$wkshtIndex]->id->text);
			$currentId= $wkshtId[8];
			$currentTitle= $feed->entries[$wkshtIndex]->title->text;
		
			if(isset($feed->entries[$wkshtIndex+1])){
				$wkshtId = explode('/', $feed->entries[$wkshtIndex+1]->id->text);
				$previousId=$wkshtId[8];
				$previousTitle=$feed->entries[$wkshtIndex+1]->title->text;
			}
			else $previousPeriod=-1;
		
			$nextPeriod =-1;

			/* END GET WORKSHEET INFO */


			/* GET CURRENT QUESTIONS */
			$query = new Zend_Gdata_Spreadsheets_ListQuery();
			$query->setSpreadsheetKey($spreadsheetKey);
			$query->setWorksheetId($currentId);
			$query->setOrderBy('column:votes');
			$query->setReverse('true');
			$listFeed = $spreadsheetService->getListFeed($query);
		
			$questions=array();
		
			foreach ($listFeed->entries as $entry){
		
			$rowData = $entry->getCustom();
			$question =array();
			$ids=array();
			
			$publicColumns=array('id','name','question','anonymous','imageurl','imageusername','imageattribution','votes','winner');
			
			
			foreach($rowData as $customEntry) {
			 if(in_array($customEntry->getColumnName(),$publicColumns))$question[ $customEntry->getColumnName() ]=$customEntry->getText();
			}
			
				if($question['anonymous']==1)$question['name']='Anonymous';
				if(empty($question['imageurl']))unset($question['imageurl']);
				if(empty($question['imageattribution']))unset($question['imageattribution']);
				unset($question['anonymous']);
				$questions[]=$question;
			}
	
			for($i=0;$i<sizeof($questions);$i++){
				array_push($ids,$questions[$i]['id']);
				$questions[$i]['rank']=$i+1;
				$questions[$i]['wkshtId']=$currentId;
			}
		
			/* END GET CURRENT QUESTIONS */
		
		
			 /* GET PREVIOUS WINNER */
			 
			$query = new Zend_Gdata_Spreadsheets_ListQuery();
			$query->setSpreadsheetKey($spreadsheetKey);
			$query->setWorksheetId($previousId);
			$query->setSpreadsheetQuery('winner=1');
			$listFeed = $spreadsheetService->getListFeed($query);
			
			$previousWinner=array();
			foreach ($listFeed->entries as $entry){
			
				$rowData = $entry->getCustom();
				$publicColumns=array('question','id');
				
				foreach($rowData as $customEntry) {
					 if(in_array($customEntry->getColumnName(),$publicColumns))$previousWinner[ $customEntry->getColumnName() ]=$customEntry->getText();
				}
			}
	
			
		if(isset($_COOKIE['CURIOUS_CITY_VOTE'])&&in_array($_COOKIE['CURIOUS_CITY_VOTE'],$ids)){
			$canvote=0;
			$yourvote=$_COOKIE['CURIOUS_CITY_VOTE'];
		}
		else{
			$canvote=1;
			$yourvote=-1;
		}
			
		?>

		
		var voteData =<?php	echo json_encode( array("questions"=>$questions, 
								"current"=>array("id"=>$currentId,"title"=>$currentTitle),
								"previous"=>array("id"=>$previousId,"title"=>$previousTitle),
								"canvote"=>$canvote,
								"yourvote"=>$yourvote,
								"previousWinner"=>$previousWinner
							)); ?>
	
	var vote = -1;
	
	</script>



</head>
<body>
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
	
	<div class="wrapper">
		<header>
			<a href="http://curiouscity.wbez.org" target='blank'><img src="images/cc-logo.png"/></a>
		</header>
	
		<div class="main">
			<div id="tagline" style="opacity:0">
				<span id="questions-count">10</span> questions, 1 will remain
			</div>
			<div id="headline" class="">
					<h3><?php	if(isset($_COOKIE['CURIOUS_CITY_VOTE'])) echo "Thanks for Voting!!"; else echo "Which would you rather know?"; ?></h3>
			</div>
			
			
			
			
			<div id="ballot">
				<div id="left-ballot"></div>
				<div id="right-ballot"></div>
				<div id="follow-up"><div class="link link-1" >Check out <a href="http://curiouscity.wbez.org/#!/investigations" target='blank'>earlier investigations</a></div><div class="link link-2" >Shape stories as they unfold <span class="link-icons"><a class="link-icon" target="blank" href="http://www.facebook.com/curiouscityproject"><img src="images/facebook_sm.png"/></a><a class="link-icon" target="blank" href="http://twitter.com/#!/WBEZCuriousCity"><img src="images/twitter_sm.png"/></a></span></div><div class="link link-3" >Tune in Wednesdays to <a href="http://www.wbez.org/programs/afternoon-shift-steve-edwards" target='blank'>The Afternoon Shift</a> on WBEZ for winners + updates.</div>
				</div>
			</div>
			
			
			
			<footer>
				<div id="submit-question">
					<a href="http://curiouscity.wbez.org/#!/ask" target="blank">Submit a Question</a> | <a href="http://curiouscity.wbez.org/#!/archive" target="blank">Browse Questions</a>
				</div>
	
				
			</footer>
			
		</div>
	
	
	</div><!-- .wrapper -->

	<!-- Application source -->
	
		<!-- <script data-main="js/loaders/widget.js" src="js/lib/require.js"></script> -->
	
	<!-- Production -->
<script data-main="js_min/widget.js" src="js/lib/require.js"></script>
	
</body>
</html>