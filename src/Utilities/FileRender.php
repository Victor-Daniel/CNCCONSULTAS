<?php
namespace app\Utilities;

// Responsável por fazer as renderizações e Substituições do conteúdo do HTML.
class FileRender{

    public function Render($Content,$Var){
        $ContentHTML = "";
        foreach($Var as $key=>$Value){
            $ContentHTML = str_replace("{{".$key."}}",$Value,$Content);
        }
        return $ContentHTML;
    }
}

?>