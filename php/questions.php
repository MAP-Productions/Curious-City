<?php

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

/**
 * @see Zend_Gdata
 */
Zend_Loader::loadClass('Zend_Gdata');

/**
 * @see Zend_Gdata_ClientLogin
 */
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');

/**
 * @see Zend_Gdata_Spreadsheets
 */
Zend_Loader::loadClass('Zend_Gdata_Spreadsheets');

/**
 * @see Zend_Gdata_App_AuthException
 */
Zend_Loader::loadClass('Zend_Gdata_App_AuthException');

/**
 * @see Zend_Http_Client
 */
Zend_Loader::loadClass('Zend_Http_Client');


/**
 * SimpleCRUD
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @subpackage Demos
 * @copyright  Copyright (c) 2005-2011 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */


$votingperiod = htmlspecialchars ($_GET['votingperiod']);
$email = 'curiouscityquestions@gmail.com';
$password = 'curiouscitywbez';

try {
          $client = Zend_Gdata_ClientLogin::getHttpClient($email, $password,
                    Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME);
} catch (Zend_Gdata_App_AuthException $ae) {
          exit("Error: ". $ae->getMessage() ."\nCredentials provided were email: [$email] and password [$password].\n");
}


$spreadsheetService = new Zend_Gdata_Spreadsheets($client);


	
		/*
		$feed = $spreadsheetService->getSpreadsheetFeed();
        
        $currKey = explode('/', $feed->entries[0]->id->text);
        $spreadsheetKey = $currKey[5];
         */
         
         
         
       	$spreadsheetKey="t2ouvEBOfK4OUtCRmGAA31w";
        $worksheetId ="od6";
        
        
    	$query = new Zend_Gdata_Spreadsheets_ListQuery();
		$query->setSpreadsheetKey($spreadsheetKey);
		$query->setWorksheetId($worksheetId);
		$query->setSpreadsheetQuery('votingperiod = '.$votingperiod);
		$listFeed = $spreadsheetService->getListFeed($query);
		
		$questions=array();
		
		foreach ($listFeed->entries as $entry){
		
		$rowData = $entry->getCustom();
		$question =array();
		
		$publicColumns=array('id','name','question','anonymous','percentage','imageurl');
		
		foreach($rowData as $customEntry) {
		 if(in_array($customEntry->getColumnName(),$publicColumns))$question[ $customEntry->getColumnName() ]=$customEntry->getText();
 		 
 		
 		// echo $customEntry->getColumnName() . " = " . $customEntry->getText()."<br>";
		
		
		}
		
		if($question['anonymous']==1)$question['name']='Anonymous';
		
		$questions[]=$question;
		
		
		}
		
		echo json_encode(array("questions"=>$questions));
		/*
		  foreach($feed->entries as $entry) {
            if ($entry instanceof Zend_Gdata_Spreadsheets_CellEntry) {
                print $entry->title->text .' '. $entry->content->text . "<br>";
            } else if ($entry instanceof Zend_Gdata_Spreadsheets_ListEntry) {
                print $i .' '. $entry->title->text .' | '. $entry->content->text . "<br>";
            } else {
                print $i .' '. $entry->title->text . "<br>";
            }
            $i++;
        }
        
        */