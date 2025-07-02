<?php
require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestNegativar;
use App\Controller\Response\ResponseNegativar;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestNegativar::Process_RequestNegativar($_SERVER["REQUEST_URI"]);
$array_response_login = ResponseNegativar::Process_ResponseNegativar($processed_route);
http_response_code($array_response_login["code"]);
echo $array_response_login["content"];

?>