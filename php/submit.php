<?php

	require_once 'config.php';
	set_include_path("../gdata/library");
	
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

	$post_data = file_get_contents("php://input");
  	$post_data = json_decode($post_data,true);	
		
	$post_data['votingperiod']='none';
	$post_data['id']=time().rand(100);

	$insertedListEntry = $spreadsheetService->insertRow($post_data, $spreadsheetKey, $worksheetId);
														
    


?>