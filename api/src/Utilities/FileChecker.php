<?php
namespace Api\Utilities;

class FileChecker{

    // VERIFICADOR DE ARQUIVOS HTML
    public function FileVerify( string $path,string $filename):bool{
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