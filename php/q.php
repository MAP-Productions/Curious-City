<?php
	header('Content-type: application/json');
	$questionid = htmlspecialchars ($_GET['questionid']);
	$worksheetId ="od6";
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
 *
 * @see Zend_Loader
 *
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


		$query = new Zend_Gdata_Spreadsheets_DocumentQuery();
		$query->setSpreadsheetKey($spreadsheetKey);
		$feed = $spreadsheetService->getWorksheetFeed($query);
		$rowCount=0;
		foreach($feed->entries as $entry){
			$wkshtId = explode('/', $entry->id->text);
			if($wkshtId[8]==$worksheetId) $rowCount=$entry->getRowCount()->getText();
		}



    	$query = new Zend_Gdata_Spreadsheets_ListQuery();
		$query->setSpreadsheetKey($spreadsheetKey);
		$query->setWorksheetId($worksheetId);
		$query->setSpreadsheetQuery('id='.$questionid);
		
		$listFeed = $spreadsheetService->getListFeed($query);
		
		foreach ($listFeed->entries as $entry){
			$rowData = $entry->getCustom();
			$publicColumns=array('index','id','name','question','anonymous','imageurl','imageattribution','imageusername','soundcloud','timelinekey', 'responseembed', 'responselinkurl', 'responselinktext');
			foreach($rowData as $customEntry) {
				 if(in_array($customEntry->getColumnName(),$publicColumns))$question[ $customEntry->getColumnName() ]=$customEntry->getText();
			}
		}
		
		$question['next']=-1;
		if($question['id']>1) {
			//$question['next']=$question['id']-1;
			$tempId=$question['id'];
			while(	$question['next']==-1&& $tempId>1){
				$tempId--;
				$query = new Zend_Gdata_Spreadsheets_ListQuery();
				$query->setSpreadsheetKey($spreadsheetKey);
				$query->setWorksheetId($worksheetId);$query->setSpreadsheetQuery('approved=1&id='.$tempId);
				$listFeed = $spreadsheetService->getListFeed($query);
			
				if(sizeof($listFeed->entries)>0) $question['next']=$tempId;
			}
			
		}
		
		
		
		$question['previous']=-1;
		if($question['id']<$rowCount) {
			//$question['next']=$question['id']-1;
			$tempId=$question['id'];
			while(	$question['previous']==-1&& $tempId<$rowCount){
				$tempId++;
				$query = new Zend_Gdata_Spreadsheets_ListQuery();
				$query->setSpreadsheetKey($spreadsheetKey);
				$query->setWorksheetId($worksheetId);$query->setSpreadsheetQuery('approved=1&id='.$tempId);
				$listFeed = $spreadsheetService->getListFeed($query);
			
				if(sizeof($listFeed->entries)>0) $question['previous']=$tempId;
			}
			
		}
		
		
		
		
		echo json_encode($question);
		
	
	?>