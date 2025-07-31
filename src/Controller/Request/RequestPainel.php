<?php
namespace App\Controller\Request;

use App\Utilities\RouterProcessor;

class RequestPainel{
    //Inicia processo de Rota da Página de Consulta

    public static function Process_RequestPainel($uri){
         $processor_rotes = new RouterProcessor();
         $processed_route = $processor_rotes->Route_Processor_Painel($uri);
         return $processed_route;
    }
}

?>