<?php

		$questionid = htmlspecialchars ($_GET['questionid']);
		$worksheetId ="od7";
	


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
		$query->setSpreadsheetQuery('id = '.$questionid);
		
		
		$listFeed = $spreadsheetService->getListFeed($query);


		$entry=$listFeed->entries[0];
		$rowData = $entry->getCustom();
		$question =array();
		
		foreach($rowData as $customEntry) {
		 	$question[ $customEntry->getColumnName() ]=$customEntry->getText();
		}
		
		$question['votes']=$question['votes']+1;
		
		$updatedListEntry = $spreadsheetService->updateRow($entry,$question);
		setcookie(CURIOUS_CITY, $questionid, time()+60*60*24*14,'/','.wbez.org'); 
		//setcookie(CURIOUS_CITY_VOTE, $questionid, time()+60,'/','.wbez.org'); 
		
		echo 'ok';
		
		
?>