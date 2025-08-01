<?php

namespace App\Controller\Home;

use App\Utilities\FileChecker;
use App\Utilities\FileReader;
use App\Utilities\FileRender;

class ControllerHome{

    //Carrega o conteúdo do Home
    public function LoadHome($uri){
        
        //Verificando a Existencia do HTML

        $filecheck = new FileChecker();

        //Caso exista, faça a renderização do conteúdo

        if($filecheck->FileVerify($uri)==true){
            $reader = new FileReader();
            $content = $reader->Reader($uri);
            $render = new FileRender();
            $page = $render->Render($content,"");
            return [
                "code"=>200,
                "content"=>$page
            ];
        }
        else{
            return [
                "code"=>404,
                "content"=>"page not found"
            ];
        }
    }
}
?>