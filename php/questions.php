<?php
	header('Content-type: application/json');
	if(isset($_GET['votingperiod'])) $worksheetId = htmlspecialchars ($_GET['votingperiod']);
	else $worksheetId ="od6";
	

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

    	$query = new Zend_Gdata_Spreadsheets_ListQuery();
		$query->setSpreadsheetKey($spreadsheetKey);
		$query->setWorksheetId($worksheetId);
		
		if(isset($_GET['order'])&&htmlspecialchars ($_GET['order'])=='popular') $query->setOrderBy('column:comments');
		if(isset($_GET['votingperiod'])) $query->setOrderBy('column:votes');
		else $query->setSpreadsheetQuery('approved=1');
	//	if(isset($_GET['searchquery'])) $query->setSpreadsheetQuery('question contains '.htmlspecialchars ($_GET['searchquery']));
		$query->setReverse(true);
		$query->setReverse('true');
		$listFeed = $spreadsheetService->getListFeed($query);
		
		$questions=array();
		
		foreach ($listFeed->entries as $entry){
		
		$rowData = $entry->getCustom();
		$question =array();
		
		if(isset($_GET['votingperiod'])) $publicColumns=array('id','name','question','anonymous','imageurl','imageusername','imageattribution','votes','winner');
		else  $publicColumns=array('id','name','question','anonymous','imageurl','imageusername','imageattribution','comments');
		
		
		foreach($rowData as $customEntry) {
		 if(in_array($customEntry->getColumnName(),$publicColumns))$question[ $customEntry->getColumnName() ]=$customEntry->getText();
		}
		
			if($question['anonymous']==1)$question['name']='Anonymous';
			if(empty($question['imageurl']))unset($question['imageurl']);
			if(empty($question['imageattribution']))unset($question['imageattribution']);
			unset($question['anonymous']);
			$questions[]=$question;
		}
		
		if(isset($_GET['votingperiod'])){
			for($i=0;$i<sizeof($questions);$i++){
				$questions[$i]['rank']=$i+1;
			}
		}
		
			if(isset($_COOKIE['CURIOUS_CITY_VOTE'])){
				$canvote=0;
				$yourvote=$_COOKIE['CURIOUS_CITY_VOTE'];
			}
			else{
				$canvote=0;
				$yourvote=0;
			}
			
		
		echo json_encode(array("questions"=>$questions,"votingperiod"=>"current","canvote"=>$canvote,"yourvote"=>$yourvote));
		
	
	?>