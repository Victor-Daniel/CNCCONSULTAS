<?php

namespace App\Controller\Login;
use App\Utilities\FileChecker;
use App\Utilities\FileReader;
use App\Utilities\FileRender;

//define('cncconfig',"/etc/cncconsultas-config/cncconsultas-config.ini");

class ControllerLogin{

    //Carrega o conteúdo do Login
    public function LoadLogin($uri){
        
        //Verificando a Existencia do HTML

        $filecheck = new FileChecker();

        //Caso exista, faça a renderização do conteúdo

        if($filecheck->FileVerify($uri)==true){
            $reader = new FileReader();
            $content = $reader->Reader($uri);
            $render = new FileRender();
            $config = self::ini_file_app();
            $page = $render->Render($content,array(
                "CSSDESKTOP"=>$config["CONEXAOLINK"].$config["CSS_LOGIN_DESKTOP"],
                "CSSMOBILE"=>$config["CONEXAOLINK"].$config["CSS_LOGIN_MOBILE"],
                "LINKJS"=>$config["CONEXAOLINK"].$config["JSLOGIN"]
            ));
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
    //Inicia as configurações presentes no arquivo ini presente no container. caminho é /etc/cncconsultas-config/cncconsultas-config.ini
    private static function ini_file_app(){
        $config = parse_ini_file("/etc/cncconsultas-config/cncconsultas-config.ini",true);
        return $config["app"];
    }
}

?>