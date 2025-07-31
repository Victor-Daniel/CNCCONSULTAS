<?php
namespace App\Controller\Request;

use App\Utilities\RouterProcessor;

class RequestCadastro{
    //Inicia processo de Rota da Página de Consulta

    public static function Process_RequestCadastro($uri){
         $processor_rotes = new RouterProcessor();
         $processed_route = $processor_rotes->Route_Processor_Cadastro($uri);
         return $processed_route;
    }
}

?>