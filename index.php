<?php

require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestLogin;
use App\Controller\Response\ResponseLogin;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestLogin::Process_RequestLogin($_SERVER["REQUEST_URI"]);
$array_response_login = ResponseLogin::Process_ResponseLogin($processed_route);

var_dump($array_response_login);


?>