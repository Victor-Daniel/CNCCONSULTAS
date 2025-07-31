<?php

namespace App\Controller\Response;

use App\Controller\Routes\Routes;
use App\Utilities\FileChecker;
use App\Controller\RemoverNegativacao\ControllerRemoverNegativacao;

class ResponseRemoverNegativacao{
    //Responsável por começar o carregamento da página de consulta.
    public static function Process_ResponseRemoverNegativacao($uri){
        $router_check = Routes::Routes_Available_RemoverNegativacao($uri);

         //Retorna o erro 500 se não houver nenhuma rota disponível
        if($router_check==false){
            return[
                "code"=>500,
                "content"=>"Rota não existente."
            ];
        }
        //Caso a rota seja encontrada, verifica a existencia do conteudo html, se não existir ele retorna 404 com um html para pag. de erro 404
        else{
            $page = new ControllerRemoverNegativacao();
            $content = $page ->LoadRemoverNegativacao($router_check);
            return $content;
        }
    }
}
?>