<?php
namespace App\Controller\Routes;

class Routes{

    //Define e compara as Rotas antes de retornar
    public static function Routes_Available_Login($uri){
        $routes=[
            "/login"=>"/login"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }
        
    }

    public static function Routes_Available_Consulta($uri){
        $routes=[
            "/consulta"=>"/consulta"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }
    }

     public static function Routes_Available_Home($uri){
        $routes=[
            "/"=>"/home"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }
        
    }

    public static function Routes_Available_Painel($uri){
        $routes=[
            "/painel"=>"/painel"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }
    }

    public static function Routes_Available_Negativar($uri){
        $routes=[
            "/negativar"=>"/negativar"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }

    }

    public static function Routes_Available_Cadastro($uri){
        $routes=[
            "/cadastro"=>"/cadastro"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }

    }

    public static function Routes_Available_RemoverNegativacao($uri){
        $routes=[
            "/rm_negativacao"=>"/remover-negativacao"
        ];
        if(array_key_exists($uri,$routes)){
            return $routes[$uri];
        }
        else{
            return false;
        }

    }

}
?>