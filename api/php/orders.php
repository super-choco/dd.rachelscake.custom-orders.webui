<?php
    header('Content-Type: application/json');

    include("configuration.php");
    include("order.php");
    include("database.php");
    include("mail.php");
    include("error.php");

    $configuration = new OrdersConfiguration();

    try {
        $orderToSave = mapFormToOrder($_POST);
        $images = $_FILES['images'];

        $conn = openConnection($configuration->dbConfig);
        $orderToSave->orderId = saveOrder($conn, $orderToSave);
        closeConnection($conn);

        if($orderToSave->orderId > 0) {
            if($images['size'][0] > 0) {
                SaveImagesToServer($configuration->fileConfig, $images, $orderToSave->orderId);
            }
            SendConfirmationMail($orderToSave, $configuration->mailConfig);
            echo json_encode('ok');
        } else {
            error_log('[orders.php] saveOrder devolvió 0 o negativo');
            echo json_encode('ko');
        }
    } catch (Throwable $e) {
        error_log('[orders.php] ERROR: ' . $e->getMessage() . ' en ' . $e->getFile() . ':' . $e->getLine());
        echo json_encode(['error' => $e->getMessage()]);
    }

    function mapFormToOrder($postValues)
    {
        $order = new Order();
        
        $order->orderDate = date('Y-m-d');

        $order->clientName = $postValues['clientName'];
        $order->clientEmail = $postValues['clientEmail'];
        $order->clientPhone = $postValues['clientPhone'];
        
        if(isset($postValues['orderTypeCakeCb'])) {
            $order->cakeSelected = true;
            $order->cakeName = $postValues['cakeName'];
            $order->cakeAge = empty($postValues['cakeAge']) ? 0 : $postValues['cakeAge'];
            $order->cakeTopic = $postValues['cakeTopic'];
            $order->cakeDetails = $postValues['cakeDetails'];
            $order->cakeSize = $postValues['cakeSize'];

            $order->cakeType = $postValues['cakeType'];
            $order->floor1Cake = $postValues['floor1Cake'];
            $order->floor1Filling = $postValues['floor1Filling'];
            
            if(isset($postValues['floorNumber2Cb'])) { 
                $order->floor2Cake = $postValues['floor2Cake'];
                $order->floor2Filling = $postValues['floor2Filling'];
            
                if(isset($postValues['floorNumber3Cb'])){ 
                    $order->floor3Cake = $postValues['floor3Cake'];
                    $order->floor3Filling = $postValues['floor3Filling'];
                }                
            }
        }
        $order->doubleFilling = isset($postValues['doubleFilling']) ? 1 : 0;
        if(isset($postValues['orderTypeCupcakesCb'])) {
            $order->cupcakesSelected = true;
            $order->cupcakesNumber = empty($postValues['cupcakesNumber']) ? 0 : $postValues['cupcakesNumber'];
            $order->cupcakesDetail = $postValues['cupcakesDetail'];
        }

        if(isset($postValues['orderTypeCookiesCb'])) { 
            $order->cookiesSelected = true;
            $order->cookiesNumber = empty($postValues['cookiesNumber']) ? 0 : $postValues['cookiesNumber'];
            $order->cookiesDetail = $postValues['cookiesDetail'];
        }
        
        if(isset($postValues['orderTypeOthersCb'])) { 
            $order->othersSelected = true;
            $order->othersDetail = $postValues['othersDetail'];
        }

        $parts = [];
        if(!empty($postValues['intolerancesCheck'])) {
            $parts = $postValues['intolerancesCheck'];
        }
        if(!empty($postValues['otherIntolerances'])) {
            $parts[] = $postValues['otherIntolerances'];
        }
        $order->intolerances = implode(', ', $parts);

        $order->deliveryDate = $postValues['deliveryDate'];
      
        $order->deliveryType = $postValues['deliveryType'];
        if($order->deliveryType === 'pickUp') {
            // $order->deliveryPickUpType = $postValues['deliveryPickUpType'];
        }
        else {
            $order->deliveryHomeSchedule = $postValues['deliveryHomeSchedule'];
            $order->deliveryAddress = $postValues['deliveryAddress'];
            $order->deliveryCity = $postValues['deliveryCity'];
            $order->deliveryInformation = $postValues['deliveryInformation'];
        }

        $order->price = '';
        $order->nickName = $postValues['nickName'];
        $order->termsAccepted = isset($postValues['acceptTerms']) ? 1 : 0;
        $order->orderStatus = 0;
        $order->newsletterAccepted = isset($postValues['acceptNewsletter']) ? 1 : 0;
        $order->contactWay = $postValues['contactWay'];
        $order->orderObservations = NULL;
        
        $order->candle = empty($postValues['candle']) ? NULL : $postValues['candle'];
        
        return $order;
    }

    function SendConfirmationMail($order, $mailConfiguration) {
        $headers = createMailHeaders($mailConfiguration->fromMail);
        $clientMailContent = createMailContent($order, "confirmationMail-client.html");
        $rachelsMailContent = createMailContent($order, "confirmationMail-rachels.html");
        $subject = "Rachel's Cake: Pedido confirmado";
        $result = SendMailMessage($order->clientEmail, $subject, $clientMailContent, $headers);
        $result = SendMailMessage($mailConfiguration->rachelsToMail, $subject, $rachelsMailContent, $headers);
    }
    function SaveImagesToServer($fileConfig, $images, $orderId)
    {
        $targetPath = "../../" . $fileConfig->path . "/" . $orderId;

        if (mkdir($targetPath, 0777, true))
        {
            foreach($images['name'] as $key=>$val) {
                $imageName = $images['name'][$key];
                $tmpName   = $images['tmp_name'][$key];
                $size      = $images['size'][$key];
                $type      = $images['type'][$key];
                $error     = $images['error'][$key];

                
                $targetFilePath = $targetPath . "/" . $imageName;
                $moved = move_uploaded_file($images['tmp_name'][$key], $targetFilePath);
            }    
        }   
    }
?>