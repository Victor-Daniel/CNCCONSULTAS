<?php
namespace App\Controller\Response;

use App\Controller\Routes\Routes;
use App\Utilities\FileChecker;
use App\Controller\Consulta\ControllerConsulta;

class ResponseConsulta{
    //Responsável por começar o carregamento da página de consulta.
    public static function Process_ResponseConsult($uri){
        return "ok";
    }
}
?>