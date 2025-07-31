<?php
namespace App\Controller\Request;
use App\Utilities\RouterProcessor;

class RequestLogin{

    // Inicia o processador de Rota pela URI
    public static function Process_RequestLogin($uri){
        $processor_rotes = new RouterProcessor();
        $processed_route = $processor_rotes->Route_Processor_Login($uri);
        return $processed_route;
    }
}
?>