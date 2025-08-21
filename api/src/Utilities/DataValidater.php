<?php
namespace Api\Utilities;

//Classe de Validação de dados.
class DataValidater{

    public function ValidaterForm(array $data):bool{
        if(array_key_exists("cpf",$data)){
            $result_user = $this->Validate_User($data["usuario"]);
            $result_email = $this->Validate_Email($data["email"]);
            $result_contato = $this->Validate_Contato($data["contato"]);
            $result_nome = $this->Validate_Name($data["nome"]);
            $result_cpf = $this->Validate_CPF($data["cpf"]);
            $result_endereco = $this->Validate_Endereco($data["endereco"]);
            $result_numero = $this->Validate_Numero($data["numero"]);
            $result_bairro = $this->Validate_Bairro($data["bairro"]);
            $result_cep = $this->Validade_Cep($data["cep"]);
            $result_cidade = $this->Validade_Cidade($data["cidade"]);
            $result_estado = $this->Validate_Estado($data["estado"]);


        }
        else{
            $result_user = $this->Validate_User($data["usuario"]);
            $result_email = $this->Validate_Email($data["email"]);
            $result_contato = $this->Validate_Contato($data["contato"]);
            $result_nome = $this->Validate_Name($data["nome"]);
            $result_cnpj = $this->Validate_CNPJ($data["cnpj"]);
            $result_insc_est = $this->Validate_InscricaoEstadual($data["insc_estadual"]);
            $result_endereco = $this->Validate_Endereco($data["endereco"]);
            $result_numero = $this->Validate_Numero($data["numero"]);
            $result_bairro = $this->Validate_Bairro($data["bairro"]);
            $result_cep = $this->Validade_Cep($data["cep"]);
            $result_cidade = $this->Validade_Cidade($data["cidade"]);
            $result_estado = $this->Validate_Estado($data["estado"]);
        }
    }

    private function Validate_User(string $user):bool{
         return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $user);
    }
    private function Validate_Email(string $email):bool{
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    private function Validate_Contato(string $contato):bool{
        $contato = preg_replace('/\D/', '', $contato);
        return preg_match('/^(?:\d{2}[2-5]\d{7}|\d{2}9\d{8})$/', $contato);
    }
    private function Validate_Name(string $name):bool{
        return preg_match('/^[\p{L} ]{5,100}$/u', $name);
    }
    private function Validate_CPF(string $cpf): bool {
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
    private function Validate_Endereco(string $endereco): bool {
        return strlen(trim($endereco)) >= 3;
    }
    private function Validate_Numero(string $numero):bool{
        return preg_match('/^[0-9]{1,6}$/', $numero);
    }
    private function Validade_Cep(string $cep):bool{
        return preg_match('/^[0-9]{8}$/', $cep);
    }
    function Validate_Bairro(string $bairro): bool {
        return strlen(trim($bairro)) >= 2;
    }
    private function Validade_Cidade(string $cidade):bool{
        return preg_match('/^[\p{L} ]{2,100}$/u', $cidade);
    }
    private function Validate_Estado(string $estado):bool{
        return preg_match('/^[A-Z]{2}$/', strtoupper($estado));
    }
    private function Validate_CNPJ(string $cnpj): bool {
        $cnpj = preg_replace('/\D/', '', $cnpj); // remove tudo que não for número

        // CNPJ precisa ter 14 dígitos
        if (strlen($cnpj) != 14) return false;

        // Elimina sequências iguais (tipo 00000000000000)
        if (preg_match('/(\d)\1{13}/', $cnpj)) return false;

        // Cálculo dos dígitos verificadores
        $tamanho = 12;
        $multiplicadores = [5,4,3,2,9,8,7,6,5,4,3,2];

        for ($i = 0; $i < 2; $i++) {
            $soma = 0;
            for ($j = 0; $j < $tamanho; $j++) {
                $soma += intval($cnpj[$j]) * $multiplicadores[$j];
            }
            $resto = $soma % 11;
            $digito = ($resto < 2) ? 0 : 11 - $resto;

            if ($cnpj[$tamanho] != $digito) return false;

            $tamanho++;
            array_unshift($multiplicadores, 6); // adiciona o 6 para a segunda verificação
        }

        return true;
    }
    private function Validate_InscricaoEstadual(string $inc_est):bool{
        
    }

}
?>