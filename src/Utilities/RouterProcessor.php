<?php
namespace  App\Utilities;

define('cncconfig',"/etc/cncconsultas-config/cncconsultas-config.ini");

class RouterProcessor{

    // Trata a URI de Login
    public function Route_Processor_Login($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Prefix_Home'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Prefix_Home'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }


    private function ini_file_app(){
        $config = parse_ini_file(cncconfig,true);
        return $config["app"];
    }
}
?>