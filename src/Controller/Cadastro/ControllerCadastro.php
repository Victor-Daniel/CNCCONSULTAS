<?php

namespace App\Controller\Cadastro;

use App\Utilities\FileChecker;
use App\Utilities\FileReader;
use App\Utilities\FileRender;

class ControllerCadastro{
    public function LoadCadastro($uri){
         
        //Verificando a Existencia do HTML

        $filecheck = new FileChecker();

        //Caso exista, faça a renderização do conteúdo

        if($filecheck->FileVerify($uri)==true){
            $reader = new FileReader();
            $content = $reader->Reader($uri);
            $config = self::ini_file_app();
            $render = new FileRender();
            $page = $render->Render($content,array(
                "CSSDEKTOP"=>$config["CONEXAOLINK"].$config["CSS_CADASTRO_DESKTOP"],
                "CSSMOBILE"=>$config["CONEXAOLINK"].$config["CSS_CADASTRO_MOBILE"],
                "LINKJS"=>$config["CONEXAOLINK"].$config["JSCADASTRO"],
                "LINKFNCADASTROJS"=>$config["CONEXAOLINK"].$config["JSFNCADASTRO"]
            ));
            return [
                "code"=>200,
                "content"=>$page
            ];
        }
        else{
            return [
                "code"=>404,
                "content"=>"Page not found"
            ];
        }
    }
        //Inicia as configurações presentes no arquivo ini presente no container. caminho é /etc/cncconsultas-config/cncconsultas-config.ini
    private static function ini_file_app(){
        $config = parse_ini_file("/etc/cncconsultas-config/cncconsultas-config.ini",true);
        return $config["app"];
    }
}
?>