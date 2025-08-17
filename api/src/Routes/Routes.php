<?php
namespace Api\Routes;

class Routes{
    public function available_routes_session($uri,$method){
        $routes=[
            "/sesion"=>"/sesion",
            "/getsession"=>"/getsession"
        ];
        return "";
    }

    public function available_routes_register($uri,$method){
        $routes=[
            "/register"=>"/User",
            "/error405"=>"/error405"
        ];

        if($method=="POST"){
            return $routes[$uri];
        }
        else{
            return $routes["/error405"];
        }
    }
}
?>