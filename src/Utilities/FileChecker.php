<?php
namespace App\Utilities;

class FileChecker{

    // VERIFICADOR DE ARQUIVOS HTML
    public function FileVerify($filename){
        $default_path = "src/Controllers/View".$filename.".html";
        if(file_exists($default_path)){
            return true;
        }
        else{
            return false;
        }
    }
}

?>