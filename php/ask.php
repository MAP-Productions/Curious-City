<?php

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
    
    
    
    

    $worksheetId ="od6";
    $spreadsheetService = new Zend_Gdata_Spreadsheets($client);
    

    
    $query = new Zend_Gdata_Spreadsheets_DocumentQuery();
    $query->setSpreadsheetKey($spreadsheetKey);
    $feed = $spreadsheetService->getWorksheetFeed($query);
    $rowCount=0;
    foreach($feed->entries as $entry){
        $wkshtId = explode('/', $entry->id->text);
        if($wkshtId[8]==$worksheetId) $rowCount=$entry->getRowCount();
    }

    $post_data = file_get_contents("php://input");
      $post_data = json_decode($post_data,true);    
    
    $defaults=array(
                'votingperiod'=>'none',
                'dateuploaded'=>time(),
                'date'=> date('F jS, Y h:i:s A'),
                'id'=>(string)$rowCount,
                'comments'=>'0',
                'votes'=>'0',
                'approved'=>'1',
                'anonymous'=>$post_data['anonymous'],
                'orginialquestion'=>$post_data['question'],
                'categories'=>$post_data['categories']
            );    
    
    $question=array_merge($post_data,$defaults);
    $insertedListEntry = $spreadsheetService->insertRow($question, $spreadsheetKey, $worksheetId);


    echo json_encode($question);
?>