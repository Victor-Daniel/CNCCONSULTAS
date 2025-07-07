<?php
namespace App\Controller\Consulta;

use App\Utilities\FileChecker;
use App\Utilities\FileReader;
use App\Utilities\FileRender;

class ControllerConsulta{
    public function LoadConsulta($uri){
         
        //Verificando a Existencia do HTML

        $filecheck = new FileChecker();

        //Caso exista, faça a renderização do conteúdo

        if($filecheck->FileVerify($uri)==true){
            $reader = new FileReader();
            $content = $reader->Reader($uri);
            $render = new FileRender();
            $config = self::ini_file_app();
            $page = $render->Render($content,array(
                "CSSDESKTOP"=>$config["CONEXAOLINK"].$config["CSS_CONSULTA_DESKTOP"],
                "CSSMOBILE"=>$config["CONEXAOLINK"].$config["CSS_CONSULTA_MOBILE"],
                "LINKJS"=>$config["CONEXAOLINK"].$config["JSCONSULTA"]
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