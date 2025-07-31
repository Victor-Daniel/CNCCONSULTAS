<?php
require __DIR__."/vendor/autoload.php";

use App\Controller\Request\RequestConsulta;
use App\Controller\Response\ResponseConsulta;

$processed_route = RequestConsulta::Process_RequestConsult($_SERVER["REQUEST_URI"]);
$array_response_Consulta = ResponseConsulta::Process_ResponseConsult($processed_route);
http_response_code($array_response_Consulta["code"]);
echo $array_response_Consulta["content"];

?>