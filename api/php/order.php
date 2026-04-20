<?php

class Order {
    public $orderId = 0;
    public $orderDate;

    public $clientName = "";
    public $clientEmail = "";
    public $clientPhone = "";

    public $cakeSelected = false;
    public $cakeName;
    public $cakeAge = 0;
    public $cakeTopic;
    public $cakeDetails;
    public $cakeSize;
    public $cakeType;
    public $floor1Cake;
    public $floor1Filling;
    public $floor1Diameter;
    public $floor2Cake;
    public $floor2Filling;
    public $floor2Diameter;
    public $floor3Cake;
    public $floor3Filling;
    public $floor3Diameter;

    public $doubleFilling = false;

    public $cupcakesSelected = false;
    public $cupcakesNumber = 0;
    public $cupcakesDetail;

    public $cookiesSelected = false;
    public $cookiesNumber = 0;
    public $cookiesDetail;

    public $othersSelected;
    public $othersDetail;

    public $intolerances;

    public $deliveryDate;
    public $deliveryType;
    public $deliveryPickUpType;
    public $deliveryHomeSchedule;
    public $deliveryAddress;
    public $deliveryCity;
    public $deliveryInformation;

    public $price;
    public $nickName;
    public $termsAccepted = false;
    public $orderStatus = 0;
    public $newsletterAccepted;
    public $contactWay;
    public $orderObservations;
    public $paidOut = false;
    public $candle;
    public $modelado;
    public $print;
    public $topper = false;
}
?>