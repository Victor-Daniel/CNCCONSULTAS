<?php
namespace Api\Utilities;

class FileChecker{

    // VERIFICADOR DE ARQUIVOS HTML
    public function FileVerify( $path, $filename){
        $default_path = "src/Controllers".$path.$filename.".php";
        if(file_exists($default_path)){
            return true;
        }
        else{
            return false;
        }
    }
}

?>