<?php

class OrdersConfiguration {

    function __construct() {
        date_default_timezone_set("Europe/Madrid");
        $environment = file_get_contents("../env");
        $globalConfig = json_decode(file_get_contents("../config/".$environment."-config.json"));
        $this->dbConfig = $globalConfig->database;
        $this->mailConfig = $globalConfig->mail;
        $this->fileConfig = $globalConfig->file;
        
    }

    public $dbConfig;
    public $mailConfig;
    public $fileConfig;
}

?>