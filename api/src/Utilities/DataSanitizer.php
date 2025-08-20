<?php
namespace Api\Utilities;

class DataSanitizer{

    public function Data_Register_Sanitizer(array $data):array{
        if (array_key_exists("cpf",$data)){
            $dados = array(
                "usuario"=> htmlspecialchars($data["usuario"]),
                "passwd"=> password_hash($data["passwd"],PASSWORD_ARGON2ID),
                "email"=> filter_var($data["email"],FILTER_SANITIZE_EMAIL),
                "contato"=> filter_var($data["contato"],FILTER_SANITIZE_NUMBER_INT),
                "nome"=> htmlspecialchars($data["nome"]),
                "cpf"=>filter_var($data["cpf"],FILTER_SANITIZE_NUMBER_INT),
                "endereco"=>htmlspecialchars($data["endereco"]),
                "numero"=>filter_var($data["numero"],FILTER_SANITIZE_NUMBER_INT),
                "bairro"=>htmlspecialchars($data["bairro"]),
                "cep"=>filter_var($data["cep"],FILTER_SANITIZE_NUMBER_INT),
                "cidade"=>htmlspecialchars($data["cidade"]),
                "estado"=>htmlspecialchars($data["estado"])
            );
            return $dados;
        }
        else{
            $dados = array(
                "usuario"=> htmlspecialchars($data["usuario"]),
                "passwd"=> password_hash($data["passwd"],PASSWORD_ARGON2ID),
                "email"=> filter_var($data["email"],FILTER_SANITIZE_EMAIL),
                "contato"=> filter_var($data["contato"],FILTER_SANITIZE_NUMBER_INT),
                "nome"=> htmlspecialchars($data["nome"]),
                "cnpj"=>filter_var($data["cnpj"],FILTER_SANITIZE_NUMBER_INT),
                "insc_estadual"=>filter_var($data["insc_estadual"],FILTER_SANITIZE_NUMBER_INT),
                "endereco"=>htmlspecialchars($data["endereco"]),
                "numero"=>filter_var($data["numero"],FILTER_SANITIZE_NUMBER_INT),
                "bairro"=>htmlspecialchars($data["bairro"]),
                "cep"=>filter_var($data["cep"],FILTER_SANITIZE_NUMBER_INT),
                "cidade"=>htmlspecialchars($data["cidade"]),
                "estado"=>htmlspecialchars($data["estado"])
            );
            return $dados;
        }

    }

}
?>