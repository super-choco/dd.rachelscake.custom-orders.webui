<?php

function createMailHeaders($fromMail) {

    $headers = "From: ".$fromMail."\r\n";
    $headers .= "Reply-To: ".$fromMail."\r\n";
    $headers .= "Return-Path: ".$fromMail."\r\n";
    $headers .= "Content-Type: text/html; charset=iso-8859-1\r\n";

    return $headers;
}

function createMailContent($order, $contentTemplate) {
    
    $content = file_get_contents('../'.$contentTemplate);
    $content = str_replace('@clientName', $order->clientName, $content);
    $content = str_replace('@clientMail', $order->clientEmail, $content);
    $content = str_replace('@clientPhone', $order->clientPhone, $content);

    $content = str_replace('@orderId', $order->orderId, $content);
    $content = str_replace('@orderDate', $order->orderDate, $content);

    if($order->cakeSelected) {  
        $content = str_replace('@cakeTitle', '<br/> Pastel', $content);
    }
    else {
        $content = str_replace('@cakeTitle', '', $content);
    }

    if(isset($order->cakeName) && $order->cakeName != "") {
        $content = str_replace('@cakeNameTitle', '<br/> Texto en el pastel: ', $content);
        $content = str_replace('@cakeName', $order->cakeName, $content);
    }
    else {
        $content = str_replace('@cakeNameTitle', '', $content);
        $content = str_replace('@cakeName', '', $content);
    }

    if($order->cakeAge > 0) {
        $content = str_replace('@cakeAgeTitle', '<br/> Edad a indicar: ', $content);
        $content = str_replace('@cakeAge', $order->cakeAge, $content);
    }
    else {
        $content = str_replace('@cakeAgeTitle', '', $content);
        $content = str_replace('@cakeAge', '', $content);
    }

    if(isset($order->cakeTopic) && $order->cakeTopic != "") {
        $content = str_replace('@cakeTopicTitle', '<br/> Temática: ', $content);
        $content = str_replace('@cakeTopic', $order->cakeTopic, $content);
    }
    else {
        $content = str_replace('@cakeTopicTitle', '', $content);
        $content = str_replace('@cakeTopic', '', $content);
    }

    if(isset($order->cakeDetails) && $order->cakeDetails!= "") {
        $content = str_replace('@cakeDetailsTitle', '<br/> Detalles: ', $content);
        $content = str_replace('@cakeDetails', $order->cakeDetails, $content);
    }
    else {
        $content = str_replace('@cakeDetailsTitle', '', $content);
        $content = str_replace('@cakeDetails', '', $content);
    }

    if(isset($order->cakeSize) && $order->cakeSize!= "") {
        $content = str_replace('@cakeSizeTitle', '<br/> Tamaño: ', $content);
        $content = str_replace('@cakeSize', $order->cakeSize, $content);
    }
    else {
        $content = str_replace('@cakeSizeTitle', '', $content);
        $content = str_replace('@cakeSize', '', $content);
    }

    if($order->cakeSelected) {
        $content = str_replace('@cakeTypeTitle', '<br/> Tipo de pastel: ', $content);
        if($order->cakeType == 'fondant') { 
            $content = str_replace('@cakeType', 'Fondant', $content);
        }
        else {
            $content = str_replace('@cakeType', 'Buttercream', $content);
        }
    }
    else {
        $content = str_replace('@cakeTypeTitle', '', $content);
        $content = str_replace('@cakeType', '', $content);
    }

    if(isset($order->floor1Cake)) {
        $content = str_replace('@floor1CakeTitle', '<br/> Sabor bizcocho 1r piso: ', $content);
        $content = str_replace('@floor1Cake', $order->floor1Cake, $content);
        $content = str_replace('@floor1FillingTitle', '<br/> Sabor relleno 1r piso: ', $content);
        $content = str_replace('@floor1Filling', $order->floor1Filling, $content);
    }
    else {
        $content = str_replace('@floor1CakeTitle', '', $content);
        $content = str_replace('@floor1Cake', '', $content);
        $content = str_replace('@floor1FillingTitle','', $content);
        $content = str_replace('@floor1Filling', '', $content);
    }
   
    if(isset($order->floor2Cake)) {
        $content = str_replace('@floor2CakeTitle', '<br/> Sabores bizcocho 2o piso: ', $content);
        $content = str_replace('@floor2Cake', $order->floor2Cake, $content);
        $content = str_replace('@floor2FillingTitle', '<br/> Sabores relleno 2o piso: ', $content);
        $content = str_replace('@floor2Filling', $order->floor2Filling, $content);
    }
    else {
        $content = str_replace('@floor2CakeTitle', '', $content);
        $content = str_replace('@floor2Cake', '', $content);
        $content = str_replace('@floor2FillingTitle','', $content);
        $content = str_replace('@floor2Filling', '', $content);
    }

    if(isset($order->floor3Cake)) {
        $content = str_replace('@floor3CakeTitle', '<br/> Sabor bizcocho 3r piso: ', $content);
        $content = str_replace('@floor3Cake', $order->floor3Cake, $content);
        $content = str_replace('@floor3FillingTitle', '<br/> Sabor relleno 3r piso: ', $content);
        $content = str_replace('@floor3Filling', $order->floor3Filling, $content);
    }
    else {
        $content = str_replace('@floor3CakeTitle', '', $content);
        $content = str_replace('@floor3Cake', '', $content);
        $content = str_replace('@floor3FillingTitle','', $content);
        $content = str_replace('@floor3Filling', '', $content);
    }

    if($order->doubleFilling == true) {
        $content = str_replace('@doubleFillingTitle', '<br/> ¿Doble relleno seleccionado? ', $content);
        $content = str_replace('@doubleFilling', 'Sí', $content);
    }
    else {
        $content = str_replace('@doubleFillingTitle', '', $content);
        $content = str_replace('@doubleFilling', '', $content);
    }

    if($order->cupcakesSelected) {  
        $content = str_replace('@cupcakesTitle', '<br/><br/> Cupcakes', $content);
    }
    else {
        $content = str_replace('@cupcakesTitle', '', $content);
    }

    if($order->cupcakesNumber > 0) {
        $content = str_replace('@cupcakesAmountTitle', '<br/> Cantidad: ', $content);
        $content = str_replace('@cupcakesAmount', $order->cupcakesNumber, $content);
    }
    else {
        $content = str_replace('@cupcakesAmountTitle', '', $content);
        $content = str_replace('@cupcakesAmount', '', $content);
    }

    if(isset($order->cupcakesDetail) && $order->cupcakesDetail!= "") {
        $content = str_replace('@cupcakesDetailTitle', '<br/> Detalles: ', $content);
        $content = str_replace('@cupcakesDetail', $order->cupcakesDetail, $content);
    }
    else {
        $content = str_replace('@cupcakesDetailTitle', '', $content);
        $content = str_replace('@cupcakesDetail', '', $content);
    }

    if($order->cookiesSelected) {  
        $content = str_replace('@cookiesTitle', '<br/><br/> Galletas', $content);
    }
    else {
        $content = str_replace('@cookiesTitle', '', $content);
    }

    if($order->cookiesNumber > 0) {
        $content = str_replace('@cookiesAmountTitle', '<br/> Cantidad: ', $content);
        $content = str_replace('@cookiesAmount', $order->cookiesNumber, $content);
    }
    else {
        $content = str_replace('@cookiesAmountTitle', '', $content);
        $content = str_replace('@cookiesAmount', '', $content);
    }

    if(isset($order->cookiesDetail) && $order->cookiesDetail!= "") {
        $content = str_replace('@cookiesDetailTitle', '<br/> Detalles: ', $content);
        $content = str_replace('@cookiesDetail', $order->cookiesDetail, $content);
    }
    else {
        $content = str_replace('@cookiesDetailTitle', '', $content);
        $content = str_replace('@cookiesDetail', '', $content);
    }

    if($order->othersSelected) {  
        $content = str_replace('@othersTitle', '<br/><br/> Otros', $content);
    }
    else {
        $content = str_replace('@othersTitle', '', $content);
    }
 
    if(isset($order->othersDetail) && $order->othersDetail != "") {
        $content = str_replace('@othersDetailTitle', '<br/> Detalles: ', $content);
        $content = str_replace('@othersDetail', $order->othersDetail, $content);
    }
    else {
        $content = str_replace('@othersDetailTitle', '', $content);
        $content = str_replace('@othersDetail', '', $content);
    }

    if(isset($order->candle) && $order->candle != "") {
        $content = str_replace('@candleTitle', '<br/><br/> Vela: ', $content);
        $content = str_replace('@candleNumber', $order->candle, $content);
    }
    else {
        $content = str_replace('@candleTitle', '', $content);
        $content = str_replace('@candleNumber', '', $content);
    }

    if(isset($order->intolerances) && $order->intolerances != "") {
        $content = str_replace('@intolerancesDetailTitle', '<br/><br/> Alergias e intolerancias: ', $content);
        $content = str_replace('@intolerancesDetail', $order->intolerances, $content);
    }
    else {
        $content = str_replace('@intolerancesDetailTitle', '', $content);
        $content = str_replace('@intolerancesDetail', '', $content);
    }

    $content = str_replace('@deliveryDateTitle', 'Entrega: ', $content);
    $content = str_replace('@deliveryDate', $order->deliveryDate, $content);

    if($order->deliveryType == 'pickUp') {
        $content = str_replace('@deliveryType', 'recoger en tienda', $content);
        // if($order->deliveryPickUpType == 'montmelo'){ 
        //     $content = str_replace('@deliveryPickUpType','Montmeló', $content);
        // }
        // else {
        //     $content = str_replace('@deliveryPickUpType','Vilanova i la Geltrú', $content);
        // }
        $content = str_replace('@deliveryPickUpType','Montmeló', $content);
        
        $content = str_replace('@deliveryAddressTitle', '', $content);
        $content = str_replace('@deliveryAddress', '', $content);
        $content = str_replace('@deliveryCity', '', $content);
        $content = str_replace('@deliveryHomeInformationTitle', '', $content);
        $content = str_replace('@deliveryHomeInformation', '', $content);
    }
    else {
        $content = str_replace('@deliveryType', 'domicilio', $content);
        $content = str_replace('@deliveryPickUpType', $order->deliveryHomeSchedule, $content);
        $content = str_replace('@deliveryAddressTitle', '<br/>Dirección: ', $content);
        $content = str_replace('@deliveryAddress', $order->deliveryAddress, $content);
        $content = str_replace('@deliveryCity', $order->deliveryCity, $content);
        $content = str_replace('@deliveryHomeInformationTitle', '<br/>Información para la entrega: ', $content);
        $content = str_replace('@deliveryHomeInformation', $order->deliveryInformation, $content);
    }

    if(isset($order->nickName) && $order->nickName != "") {
        $content = str_replace('@nickNameTitle', '<br/><br/> Nick en redes: ', $content);
        $content = str_replace('@nickName', $order->nickName, $content);
    }
    else {
        $content = str_replace('@nickNameTitle', '', $content);
        $content = str_replace('@nickName', '', $content);
    }
    
    return utf8_decode($content);
}

function SendMailMessage($email_to, $subject, $content, $headers) {
    return @mail($email_to, $subject, $content, $headers );
}

?>