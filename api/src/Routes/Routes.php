<?php
namespace Api\Routes;

class Routes{
    public function available_routes_session(string $uri,string $method):string{
        $routes=[
            "/sesion"=>"/sesion",
            "/getsession"=>"/getsession"
        ];
        return "";
    }

    public function available_routes_register(string $uri, string $method):string{
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