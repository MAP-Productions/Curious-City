<?php
		header('Content-type: application/json');
		
		if(isset($_GET['votingperiod'])) $votingPeriod = htmlspecialchars ($_GET['votingperiod']);
		
		else $votingPeriod = "current";
	

		require_once 'config.php';
		set_include_path("../gdata/library");
		
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
			
			
		if($votingPeriod=='current'){
			$wkshtIndex=1;
		}
		else{
			$i=0;
			foreach($feed->entries as $entry){
				$temp=explode('/', $entry->id->text);
				if($temp[8]==$votingPeriod){
					$wkshtIndex=$i;
					break;
				}
				else $i++;
			}
		}
		

		

		$wkshtId = explode('/', $feed->entries[$wkshtIndex]->id->text);
		$currentId= $wkshtId[8];
		$currentTitle= $feed->entries[$wkshtIndex]->title->text;
		

		
		if(isset($feed->entries[$wkshtIndex+1])){
				$wkshtId = explode('/', $feed->entries[$wkshtIndex+1]->id->text);
				$previousId=$wkshtId[8];
				$previousTitle=$feed->entries[$wkshtIndex+1]->title->text;
		}
		else $previousId=-1;
		
		
	
		if($wkshtIndex!=1&&isset($feed->entries[$wkshtIndex-1])){
				$wkshtId = explode('/', $feed->entries[$wkshtIndex-1]->id->text);
				if($wkshtIndex==2) $nextId='current';
				else $nextId=$wkshtId[8];
				$nextTitle=$feed->entries[$wkshtIndex-1]->title->text;
		}
		else $nextId =-1;

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
		
		$totalVotes=0;
		for($i=0;$i<sizeof($questions);$i++){
			$totalVotes+=$questions[$i]['votes'];
		}


		for($i=0;$i<sizeof($questions);$i++){
			array_push($ids,$questions[$i]['id']);
			$questions[$i]['percent']=round($questions[$i]['votes']*100/$totalVotes)."%";
			$questions[$i]['rank']=$i+1;
			$questions[$i]['wkshtId']=$currentId;
		}
	

			
		
		echo json_encode(array("questions"=>$questions, 
								"current"=>array("id"=>$currentId,"title"=>$currentTitle),
								"next"=>array("id"=>$nextId,"title"=>$nextTitle),
								"previous"=>array("id"=>$previousId,"title"=>$previousTitle),
							)
						);
		
	
	?>