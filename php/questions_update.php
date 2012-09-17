
		<?php
			
			header('Content-type: application/json');
			$votingPeriod = "current";
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


				/* END PREVIOUS WINNER */
				
	
			
						
				/* GET ARCHIVE */
				
				$archiveId="od6";
				$query = new Zend_Gdata_Spreadsheets_ListQuery();
				$query->setSpreadsheetKey($spreadsheetKey);
				$query->setWorksheetId($previousId);
				//$query->setSpreadsheetQuery('approved=1');
				$listFeed = $spreadsheetService->getListFeed($query);
				
			
				$archiveQuestions=array();
				
				foreach ($listFeed->entries as $entry){
				
					$rowData = $entry->getCustom();
					$question=array();
					$ids=array();
					
					
					$publicColumns=array('id','name','question','anonymous','imageurl','imageusername','imageattribution','comments',"timelinekey", 'badge', 'investigated', 'reporter', 'updatecount', 'dateuploaded');
					
					
					foreach($rowData as $customEntry) {
					 if(in_array($customEntry->getColumnName(),$publicColumns))$question[ $customEntry->getColumnName() ]=$customEntry->getText();
					}
				
					if($question['anonymous']==1)$question['name']='Anonymous';
					if(empty($question['imageurl']))unset($question['imageurl']);
					if(empty($question['imageattribution']))unset($question['imageattribution']);
					unset($question['anonymous']);
					$archiveQuestions[]=$question;
					$ids[]=$question['id'];
				}
				
				
				
				
				
				/* END GET ARCHIVE */
				
				
				
				
				
				
				//$questionsData = 'var voteData='.json_encode( array(
				echo	json_encode( array(
								"questions"=>$questions, 
								"archive"=>$archiveQuestions,
								"current"=>array("id"=>$currentId,"title"=>$currentTitle),
								"previous"=>array("id"=>$previousId,"title"=>$previousTitle),
								"canvote"=>'',
								"yourvote"=>'',
								"previousWinner"=>$previousWinner
							)); 	

				/*
				
				$file = "../js/data/questions.js";
				$fh = fopen($file, 'w') or die("can't open file");
				fwrite($fh, $questionsData);
				fclose($fh);

				*/
				
				}catch (Zend_Gdata_App_AuthException $ae) {
				exit("Error Connecting");
			}
		?>