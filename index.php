<?php

require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestHome;
use App\Controller\Response\ResponseHome;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestHome::Process_RequestHome($_SERVER["REQUEST_URI"]);
$array_response_login = ResponseHome::Process_ResponseHome($processed_route);
http_response_code($array_response_login["code"]);
echo $array_response_login["content"];




?>