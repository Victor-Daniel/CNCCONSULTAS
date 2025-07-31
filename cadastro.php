<?php
require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestCadastro;
use App\Controller\Response\ResponseCadastro;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestCadastro::Process_RequestCadastro($_SERVER["REQUEST_URI"]);
$array_response_login = ResponseCadastro::Process_ResponseCadastro($processed_route);
http_response_code($array_response_login["code"]);
echo $array_response_login["content"];
?>