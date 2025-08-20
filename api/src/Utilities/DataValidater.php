<?php
namespace Api\Utilities;

//Classe de Validação de dados.
class DataValidater{
    public function Validate_User(string $user):bool{
         return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $user);
    }
    public function Validate_Email(string $email):bool{
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    public function Validate_Contato(string $contato):bool{
        $contato = preg_replace('/\D/', '', $contato);
        return preg_match('/^(?:\d{2}[2-5]\d{7}|\d{2}9\d{8})$/', $contato);
    }
    public function Validate_Name(string $name):bool{
        return preg_match('/^[\p{L} ]{5,100}$/u', $nome);
    }
    function ValidateCPF(string $cpf): bool {
        $cpf = preg_replace('/\D/', '', $cpf);
        if (strlen($cpf) != 11 || preg_match('/(\d)\1{10}/', $cpf)) return false;

        for ($t = 9; $t < 11; $t++) {
            $d = 0;
            for ($c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) return false;
        }
        return true;
    }
    function Validate_Endereco(string $endereco): bool {
    return strlen(trim($endereco)) >= 3;
}

}
?>