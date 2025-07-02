<?php
require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestPainel;
use App\Controller\Response\ResponsePainel;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestPainel::Process_RequestPainel($_SERVER["REQUEST_URI"]);
$array_response_login = ResponsePainel::Process_ResponsePainel($processed_route);
http_response_code($array_response_login["code"]);
echo $array_response_login["content"];
?>