<?php
require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestRemoverNegativacao;
use App\Controller\Response\ResponseRemoverNegativacao;

//Valida a Rota solicitada e Carrega o conteúdo

$processed_route = RequestRemoverNegativacao::Process_RequestRemoverNegativacao($_SERVER["REQUEST_URI"]);
$array_response_login = ResponseRemoverNegativacao::Process_ResponseRemoverNegativacao($processed_route);
http_response_code($array_response_login["code"]);
echo $array_response_login["content"];

?>