<?php
namespace App\Controller\Request;
use App\Utilities\RouterProcessor;

class RequestRemoverNegativacao{

    // Inicia o processador de Rota pela URI
    public static function Process_RequestRemoverNegativacao($uri){
        $processor_rotes = new RouterProcessor();
        $processed_route = $processor_rotes->Route_Processor_RemoverNegativacao($uri);
        return $processed_route;
    }
}
?>