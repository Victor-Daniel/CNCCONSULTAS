<?php
namespace App\Controller\Request;

use App\Utilities\RouterProcessor;

class RequestHome{

    // Inicia o processador de Rota pela URI
    public static function Process_RequestHome($uri){
        $processor_rotes = new RouterProcessor();
        $processed_route = $processor_rotes->Route_Processor_Home($uri);
        return $processed_route;
    }
}
?>