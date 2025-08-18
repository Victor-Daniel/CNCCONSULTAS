<?php

namespace Api\Utilities;

define('cncconfigapi',"/etc/cncconsultas-config/api-config.ini");

class RouterProcessor{
        // Inicia as configurações presentes no arquivo ini presente no container. caminho é /etc/cncconsultas-config/api-config.ini
    private function ini_file_app(){
        $config = parse_ini_file(cncconfigapi,true);
        return $config["api"];
    }

    public function Route_Processor_Register($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        return $current_uri;
    }

}
?>