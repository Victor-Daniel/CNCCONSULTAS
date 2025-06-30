<?php
namespace App\Controller\Request;

use App\Utilities\RouterProcessor;

class RequestConsulta{
    //Inicia processo de Rota da Página de Consulta

    public static function Process_RequestConsult($uri){
         $processor_rotes = new RouterProcessor();
         $processed_route = $processor_rotes->Route_Processor_Consulta($uri);
         return $processed_route;
    }
}

?>