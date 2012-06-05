<?php
	header('Content-type: application/json');
	if(isset($_GET['votingperiod'])) $votingPeriod = htmlspecialchars ($_GET['votingperiod']);
	else $votingPeriod = "current";
	

	require_once 'config.php';
	set_include_path("../gdata/library");
	
/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @subpackage Demos
 * @copyright  Copyright (c) 2005-2011 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */

/**
 * @see Zend_Loader
 */
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
				if($entry->title->text==htmlspecialchars ($_GET['period'])) $wkshtIndex=$i;
				else $i++;
			}
		}
		
		
		

		$wkshtId = explode('/', $feed->entries[$wkshtIndex]->id->text);
		$currentId= $wkshtId[8];
		$currentTitle= $feed->entries[$wkshtIndex]->title->text;
		
		
		if(isset($feed->entries[$wkshtIndex+1])){
				$wkshtId = explode('/', $feed->entries[$wkshtIndex+1]->id->text);
				$previousId=$wkshtId[8];
				$previousPeriod=$feed->entries[$wkshtIndex+1]->title->text;
		}
		else $previousPeriod=-1;
		
		if($wkshtIndex!=1&&isset($feed->entries[$wkshtIndex-1])){
				$wkshtId = explode('/', $feed->entries[$wkshtIndex-1]->id->text);
				$nextId=$wkshtId[8];
				$nextPeriod=$feed->entries[$wkshtIndex-1]->title->text;
		}
		else $nextPeriod =-1;

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
			$ids[]=$question['id'];
		}

		for($i=0;$i<sizeof($questions);$i++){
			$questions[$i]['rank']=$i+1;
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

		
		if(isset($_COOKIE['CURIOUS_CITY_VOTE']))$yourvote=$_COOKIE['CURIOUS_CITY_VOTE'];
		
		if(in_array($yourVote,$ids))
		{
			$canvote=0;
			$yourvote=$_COOKIE['CURIOUS_CITY_VOTE'];
		}
		else{
			$canvote=1;
			$yourvote=5;
		}
			
		
		echo json_encode(array("questions"=>$questions,"votingperiod"=>$currentTitle,"nextperiod"=>$nextPeriod,"previousperiod"=>$previousPeriod,"canvote"=>$canvote,"yourvote"=>$yourvote,"previousWinner"=>$previousWinner));
		
	
	?>