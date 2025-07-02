<?php

namespace App\Controller\Request;

use App\Utilities\RouterProcessor;

class RequestNegativar{

    // Inicia o processador de Rota pela URI
    public static function Process_RequestNegativar($uri){
        $processor_rotes = new RouterProcessor();
        $processed_route = $processor_rotes->Route_Processor_Negativar($uri);
        return $processed_route;
    }
}
?>