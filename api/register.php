<?php
require __DIR__."/vendor/autoload.php";

use Api\Routes\Routes;
use Api\Utilities\RouterProcessor;
use Api\Utilities\FileChecker;
use Api\Utilities\DataSanitizer;
use Api\Utilities\DataValidater;

header('Content-Type: application/json');
header("Allow: POST");


try{
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

   $Routes = new Routes();
    $processor = new RouterProcessor();

    $route = $Routes -> available_routes_register($processor->Route_Processor_Register($_SERVER['REQUEST_URI']),$_SERVER['REQUEST_METHOD']);
    $file = new FileChecker();

    // Verificando a existência da rota /User
   if($route=="/User"){
        //Verficando se existe um controlador
        $path = $route;
        if($file->FileVerify($path,$route)==true){

            $sanitizer = new DataSanitizer();
            $validate = new DataValidater();

            $datas_sanitized = $sanitizer->Data_Register_Sanitizer($data);
            echo json_encode(["Code"=>00,"msg"=>""
            ]);
        }
        else{
            http_response_code(404);
            echo json_encode(["erro"=>"/404","msg"=>"Controller not found"]);
        }
    }
    else{
        http_response_code(405);
        echo json_encode(["erro"=>$route,"msg"=>"Method not accepted"]);
    } 


}
catch(\Throwable $e){
    echo json_encode(["Erro"=>$e->getMessage()]);
}

?>