<?php
namespace  App\Utilities;

define('cncconfig',"/etc/cncconsultas-config/cncconsultas-config.ini");

class RouterProcessor{

    ////Processamento da rota da página Home.
     public function Route_Processor_Home($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

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


    // Trata a URI de Login
    public function Route_Processor_Login($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/login"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }

    // Inicia as configurações presentes no arquivo ini presente no container. caminho é /etc/cncconsultas-config/cncconsultas-config.ini
    private function ini_file_app(){
        $config = parse_ini_file(cncconfig,true);
        return $config["app"];
    }

    //Processamento da rota da página de consulta.
    public function Route_Processor_Consulta($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/consulta"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }

    public function Route_Processor_Painel($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/painel"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }

    public function Route_Processor_Negativar($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/negativar"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }

    public function Route_Processor_Cadastro($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/cadastro"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }

    public function Route_Processor_RemoverNegativacao($uri){
        $config = $this->ini_file_app();
        $current_uri = str_replace($config['Default_Prefix'],"",$uri);
        $current_uri = str_replace($config["Default_Sufix"],"",$current_uri);
        $uri_exploded = explode($config['Default_Prefix'],$current_uri);

        foreach($uri_exploded as $key=>$value){
            if($value=="/remover-negativacao"){
                $uri_exploded = $value;
            }
            else{
                $uri_exploded = "";
            }
        }
        return $uri_exploded;
    }
}
?>