<?php

function openConnection($dbConfig)
{
    $conn = mysqli_connect($dbConfig->host, $dbConfig->user, $dbConfig->password, $dbConfig->dbname);
    $conn->set_charset("utf8");
    if($conn->connect_error){
        die("ERROR: Could not connect. " .  $conn->connect_error);
    }
    return $conn;
}

function closeConnection($conn){
    mysqli_close($conn);
}

function saveOrder($conn, $order){

    $query = "INSERT INTO orders
    VALUES(NULL, '$order->orderDate',
    '$order->clientName','$order->clientEmail',
    '$order->clientPhone', '$order->cakeName',
    '$order->cakeAge', '$order->cakeTopic',
    '$order->cakeDetails', '$order->cakeSize',
    '$order->cakeType',
    '$order->floor1Cake', '$order->floor1Filling',
    '$order->floor1Diameter', '$order->floor2Cake', 
    '$order->floor2Filling','$order->floor2Diameter',
    '$order->floor3Cake', '$order->floor3Filling',
    '$order->floor3Diameter', '$order->doubleFilling', 
    '$order->cupcakesNumber', '$order->cupcakesDetail', 
    '$order->cookiesNumber', '$order->cookiesDetail', 
    '$order->othersDetail', '$order->intolerances', 
    '$order->deliveryDate', '$order->deliveryType', 
    '$order->deliveryPickUpType', '$order->deliveryHomeSchedule', 
    '$order->deliveryAddress', '$order->deliveryCity', 
    '$order->deliveryInformation', '$order->nickName', 
    '$order->price', '$order->termsAccepted', 
    '$order->orderStatus', '$order->newsletterAccepted',
    '$order->contactWay', '$order->orderObservations',
    '$order->paidOut', ".(!$order->candle ? 'NULL' : (int)$order->candle) . ",
    '$order->modelado','$order->print','$order->topper'
    )";

    mysqli_query($conn, $query);
    
    return mysqli_insert_id($conn);
}
?>
