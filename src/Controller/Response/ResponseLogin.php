<?php
namespace App\Controller\Response;

use App\Controller\Routes\Routes;
use App\Utilities\FileChecker;

class ResponseLogin{

    //Carrega o conteúdo e envia a resposta para o navegador
    public static function Process_ResponseLogin($uri){
        $router_check = Routes::Routes_Available_Login($uri);
        if($router_check==false){
            return[
                "code"=>500,
                "msg"=>"Rota não existente.",
                "route_available"=>""
            ];
        }
        else{
            return[
                "code"=>200,
                "msg"=>"",
                "route_available"=>$router_check
            ];
        }
    }
}
?>