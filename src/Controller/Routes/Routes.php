<?php
namespace App\Controller\Routes;

class Routes{

    //Define e compara as Rotas para Login
    public static function Routes_Available_Login($uri){
        $routes=[
            "/"=>"/login",
            "/login"=>"/login"
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