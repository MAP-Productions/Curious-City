<?php

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



		
		
	

		try {
				  $client = Zend_Gdata_ClientLogin::getHttpClient($email, $password,
							Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME);
		} catch (Zend_Gdata_App_AuthException $ae) {
				  exit("Error: ". $ae->getMessage() ."\nCredentials provided were email: [$email] and password [$password].\n");
		}


		$spreadsheetService = new Zend_Gdata_Spreadsheets($client);
        $query = new Zend_Gdata_Spreadsheets_DocumentQuery();
		$query->setSpreadsheetKey($spreadsheetKey);
		$feed = $spreadsheetService->getWorksheetFeed($query);
		
		foreach($feed->entries as $entry){
			$wkshtId = explode('/', $entry->id->text);
			echo $wkshtId[8]."<br>";
			echo $entry->title->text."<br>";
		}
	

		
		
?>