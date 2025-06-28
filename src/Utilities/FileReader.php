<?php
namespace App\Utilities;

//Classe responsável pela Leitura dos arquivos HTML
class FileReader{

    public function Reader($filename){
        $default_path = "src/Controllers/View".$filename.".html";
        return file_get_contents($default_path);
    }

}

?>