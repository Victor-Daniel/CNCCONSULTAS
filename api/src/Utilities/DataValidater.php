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
            $result_insc_est = $this->Validate_InscricaoEstadual($data["insc_estadual"],$data["estado"]);
            $result_endereco = $this->Validate_Endereco($data["endereco"]);
            $result_numero = $this->Validate_Numero($data["numero"]);
            $result_bairro = $this->Validate_Bairro($data["bairro"]);
            $result_cep = $this->Validade_Cep($data["cep"]);
            $result_cidade = $this->Validade_Cidade($data["cidade"]);
            $result_estado = $this->Validate_Estado($data["estado"]);
            return $result_insc_est;
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
    private function Validate_InscricaoEstadual(string $insc_est,string $estado):bool{
         $estado = strtoupper($estado);

         $mapeamento = [
            "AC" => "val_IEAC",
            "AL" => "val_IEAL",
            "AM" => "val_IEAM",
            "AP" => "val_IEAP",
            "BA" => "val_IEBA",
            "CE" => "val_IECE",
            "DF" => "val_IEDF",
            "ES" => "val_IEES",
            "GO" => "val_IEGO",
            "MA" => "val_IEMA",
            "MT" => "val_IEMT",
            "MS" => "val_IEMS",
            "MG" => "val_IEMG",
            "PA" => "val_IEPA",
            "PB" => "val_IEPB",
            "PR" => "val_IEPR",
            "PE" => "val_IEPE",
            "PI" => "val_IEPI",
            "RJ" => "val_IERJ",
            "RN" => "val_IERN",
            "RS" => "val_IERS",
            "RO" => "val_IERO",
            "RR" => "val_IERR",
            "SC" => "val_IESC",
            "SP" => "val_IESP",
            "SE" => "val_IESE",
            "TO" => "val_IETO"
        ];

         if (array_key_exists($estado, $mapeamento)) {
            $Funcao = $mapeamento[$estado];
            return $this->$Funcao($insc_est);

        }


    }


    // Validadores de Inscrição Estadual

    private function val_IEAC($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 13 && substr($ie, 0, 2) === '01') {
            $pesos1 = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            $soma1 = 0;

            for ($i = 0; $i < 11; $i++) {
                $soma1 += intval($ie[$i]) * $pesos1[$i];
            }

            $digito1 = 11 - ($soma1 % 11);
            if ($digito1 >= 10) {
                $digito1 = 0;
            }

            if (intval($ie[11]) === $digito1) {
                $pesos2 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                $soma2 = 0;

                for ($i = 0; $i < 12; $i++) {
                    $soma2 += intval($ie[$i]) * $pesos2[$i];
                }

                $digito2 = 11 - ($soma2 % 11);
                if ($digito2 >= 10) {
                    $digito2 = 0;
                }

                if (intval($ie[12]) === $digito2) {
                    $resultado = true;
                }
            }
        }

        return $resultado;
    }

    private function val_IEAL($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 && substr($ie, 0, 2) === '24') {
            $terceiroDigito = intval($ie[2]);
            if ($terceiroDigito >= 0 && $terceiroDigito <= 5) {
                $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
                $soma = 0;

                for ($i = 0; $i < 8; $i++) {
                    $soma += intval($ie[$i]) * $pesos[$i];
                }

                $digito = (11 - ($soma % 11));
                if ($digito >= 10) {
                    $digito = 0;
                }

                if (intval($ie[8]) === $digito) {
                    $resultado = true;
                }
            }
        }

        return $resultado;
    }

    private function val_IEAM($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $primeiroDigito = intval($ie[0]);
            if ($primeiroDigito === 1 || $primeiroDigito === 2 || $primeiroDigito === 3) {
                $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
                $soma = 0;

                for ($i = 0; $i < 8; $i++) {
                    $soma += intval($ie[$i]) * $pesos[$i];
                }

                $resto = $soma % 11;
                $digito;

                if ($resto === 0) {
                    $digito = 0;
                } else if ($resto === 1) {
                    $segundoDigito = intval($ie[1]);
                    if ($segundoDigito === 0 || $segundoDigito === 1) {
                        $digito = 1;
                    } else {
                        return false;
                    }
                } else {
                    $digito = 11 - $resto;
                }

                if (intval($ie[8]) === $digito) {
                    $resultado = true;
                }
            }
        }

        return $resultado;
    }

    private function val_IEAP($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 && substr($ie, 0, 2) === '03') {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito;

            if ($resto === 0 || $resto === 1) {
                $digito = 0;
            } else {
                $digito = 11 - $resto;
            }

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }

   private function val_IEBA($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) !== 8 && strlen($ie) !== 9) {
            return false;
        }

        $segundoDigito = intval($ie[1]);
        $modulo = 0;

        if (in_array($segundoDigito, [0, 1, 2, 3, 4, 5, 8])) {
            $modulo = 10;
        } elseif (in_array($segundoDigito, [6, 7, 9])) {
            $modulo = 11;
        } else {
            return false;
        }

        $calcularDigito = function($posicoes, $pesos, $mod) {
            $soma = 0;
            for ($i = 0; $i < count($pesos); $i++) {
                $soma += intval($posicoes[$i]) * $pesos[$i];
            }
            $resto = $soma % $mod;
            if ($mod === 10) {
                return $resto === 0 ? 0 : $mod - $resto;
            } else {
                if ($resto === 0 || $resto === 1) return 0;
                return $mod - $resto;
            }
        };

        if (strlen($ie) === 8) {
            $d8 = $calcularDigito(substr($ie, 0, 7), [7, 6, 5, 4, 3, 2, 1], $modulo);
            if (intval($ie[7]) === $d8) {
                $resultado = true;
            }
        } else {
            $d8 = $calcularDigito(substr($ie, 0, 7), [8, 7, 6, 5, 4, 3, 2], $modulo);
            $parcial = substr($ie, 0, 7) . strval($d8);
            $d9 = $calcularDigito(substr($parcial, 0, 8), [9, 8, 7, 6, 5, 4, 3, 2], $modulo);

            if (intval($ie[7]) === $d8 && intval($ie[8]) === $d9) {
                $resultado = true;
            }
        }

        return $resultado;

}


    private function val_IECE($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito;

            if ($resto === 0 || $resto === 1) {
                $digito = 0;
            } else {
                $digito = 11 - $resto;
            }

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;

    }


    private function val_IEDF($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 13 && substr($ie, 0, 2) === '07') {
            $soma1 = 0;
            $pesos1 = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for ($i = 0; $i < 11; $i++) {
                $soma1 += intval($ie[$i]) * $pesos1[$i];
            }
            $resto1 = $soma1 % 11;
            $digito1 = ($resto1 < 2) ? 0 : 11 - $resto1;

            $soma2 = 0;
            $pesos2 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            $parte12 = substr($ie, 0, 11) . strval($digito1);
            for ($i = 0; $i < 12; $i++) {
                $soma2 += intval($parte12[$i]) * $pesos2[$i];
            }
            $resto2 = $soma2 % 11;
            $digito2 = ($resto2 < 2) ? 0 : 11 - $resto2;

            if (intval($ie[11]) === $digito1 && intval($ie[12]) === $digito2) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IEES($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito = ($resto < 2) ? 0 : 11 - $resto;

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }


    private function val_IEGO($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $prefixo = substr($ie, 0, 2);
            if ($prefixo === '10' || $prefixo === '11' || $prefixo === '15') {
                $numero = intval($ie);

                $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
                $soma = 0;

                for ($i = 0; $i < 8; $i++) {
                    $soma += intval($ie[$i]) * $pesos[$i];
                }

                $resto = $soma % 11;
                $digito = 11 - $resto;

                if ($resto === 0) {
                    $digito = 0;
                } elseif ($resto === 1) {
                    if ($numero >= 101031050 && $numero <= 101199979) {
                        $digito = 1;
                    } else {
                        $digito = 0;
                    }
                }

                if (intval($ie[8]) === $digito) {
                    $resultado = true;
                }
            }
        }

        return $resultado;
    }


    private function val_IEMA($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 && substr($ie, 0, 2) === '12') {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito = ($resto < 2) ? 0 : 11 - $resto;

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }

  
    private function val_IEMT($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 11) {
            $pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 10; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito = ($resto < 2 || $resto === 10) ? 0 : 11 - $resto;

            if (intval($ie[10]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }


    private function val_IEMS($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 && substr($ie, 0, 2) === '28') {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito = ($resto === 0 || $resto === 1) ? 0 : 11 - $resto;

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IEMG($ie) {
    $ie = preg_replace('/[^0-9]/', '', $ie);
    $resultado = false;

    if (strlen($ie) === 13) {
        $base = substr($ie, 0, 11);
        $digito1 = intval($ie[11]);
        $digito2 = intval($ie[12]);

        $body = substr($ie, 0, 3) . '0' . substr($ie, 3, 8);
        $soma = 0;

        for ($i = 0; $i < strlen($body); $i++) {
            $multiplicador = ($i % 2 === 0) ? 1 : 2;
            $produto = intval($body[$i]) * $multiplicador;
            $soma += ($produto > 9) ? floor($produto / 10) + ($produto % 10) : $produto;
        }

        $resto1 = $soma % 10;
        $calculadoDigito1 = ($resto1 === 0) ? 0 : 10 - $resto1;

        $pesos2 = [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        $soma2 = 0;
        $novaBase = $base . strval($calculadoDigito1);

        for ($i = 0; $i < 12; $i++) {
            $soma2 += intval($novaBase[$i]) * $pesos2[$i];
        }

        $resto2 = $soma2 % 11;
        $calculadoDigito2 = ($resto2 < 2) ? 0 : 11 - $resto2;

        if ($digito1 === $calculadoDigito1 && $digito2 === $calculadoDigito2) {
            $resultado = true;
        }
    }

    return $resultado;
    }

    private function val_IEPA($ie) {
    $ie = preg_replace('/[^0-9]/', '', $ie);
    $resultado = false;

    if (strlen($ie) === 9 && substr($ie, 0, 2) === '15') {
        $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
        $soma = 0;

        for ($i = 0; $i < 8; $i++) {
            $soma += intval($ie[$i]) * $pesos[$i];
        }

        $resto = $soma % 11;
        $digito = ($resto <= 1) ? 0 : 11 - $resto;

        if (intval($ie[8]) === $digito) {
            $resultado = true;
        }
    }

    return $resultado;
}

    private function val_IEPB($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($ie[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digito = ($resto === 0 || $resto === 1) ? 0 : 11 - $resto;

            if (intval($ie[8]) === $digito) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IEPR($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 10) {
            $corpo = substr($ie, 0, 8);
            $digito1 = intval($ie[8]);
            $digito2 = intval($ie[9]);

            $pesos1 = [3, 2, 7, 6, 5, 4, 3, 2];
            $soma1 = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma1 += intval($ie[$i]) * $pesos1[$i];
            }

            $resto1 = $soma1 % 11;
            $calcDig1 = ($resto1 <= 1) ? 0 : 11 - $resto1;

            $pesos2 = [4, 3, 2, 7, 6, 5, 4, 3, 2];
            $soma2 = 0;
            $corpo2 = $corpo . $calcDig1;

            for ($i = 0; $i < 9; $i++) {
                $soma2 += intval($corpo2[$i]) * $pesos2[$i];
            }

            $resto2 = $soma2 % 11;
            $calcDig2 = ($resto2 <= 1) ? 0 : 11 - $resto2;

            if ($digito1 === $calcDig1 && $digito2 === $calcDig2) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IEPE($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $base = substr($ie, 0, 7);
            $dv1 = intval($ie[7]);
            $dv2 = intval($ie[8]);

            $pesos1 = [8, 7, 6, 5, 4, 3, 2];
            $soma1 = 0;

            for ($i = 0; $i < 7; $i++) {
                $soma1 += intval($base[$i]) * $pesos1[$i];
            }

            $resto1 = $soma1 % 11;
            $calcDV1 = ($resto1 <= 1) ? 0 : 11 - $resto1;

            $novoBase = $base . $calcDV1;
            $pesos2 = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma2 = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma2 += intval($novoBase[$i]) * $pesos2[$i];
            }

            $resto2 = $soma2 % 11;
            $calcDV2 = ($resto2 <= 1) ? 0 : 11 - $resto2;

            if ($dv1 === $calcDV1 && $dv2 === $calcDV2) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IEPI($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $base = substr($ie, 0, 8);
            $digitoInformado = intval($ie[8]);

            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = ($resto === 0 || $resto === 1) ? 0 : 11 - $resto;

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IERJ($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 8) {
            $base = substr($ie, 0, 7);
            $digitoInformado = intval($ie[7]);

            $pesos = [2, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 7; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = 11 - $resto;

            if ($digitoCalculado >= 10) {
                $digitoCalculado = 0;
            }

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IERN($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 || strlen($ie) === 10) {
            $base = substr($ie, 0, -1);
            $digitoInformado = intval(substr($ie, -1));

            $pesos = [];
            $pesoInicial = strlen($ie);
            for ($i = 0; $i < strlen($base); $i++) {
                $pesos[] = $pesoInicial - $i;
            }

            $soma = 0;
            for ($i = 0; $i < strlen($base); $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = ($soma * 10) % 11;
            $digitoCalculado = ($resto === 10) ? 0 : $resto;

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IERS($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 10) {
            $base = substr($ie, 0, 9);
            $digitoInformado = intval($ie[9]);

            $pesos = [2, 3, 4, 5, 6, 7, 8, 9];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[8 - $i]) * $pesos[$i];
            }

            $soma += intval($base[0]) * 2;

            $resto = $soma % 11;
            $digitoCalculado = 11 - $resto;

            if ($digitoCalculado === 10 || $digitoCalculado === 11) {
                $digitoCalculado = 0;
            }

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IERO($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 14) {
            $base = substr($ie, 0, 13);
            $digitoInformado = intval($ie[13]);

            $pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 13; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = 11 - $resto;

            if ($digitoCalculado === 10 || $digitoCalculado === 11) {
                $digitoCalculado = 0;
            }

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IERR($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 && substr($ie, 0, 2) === '24') {
            $base = substr($ie, 0, 8);
            $digitoInformado = intval($ie[8]);

            $soma = 0;
            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[$i]) * ($i + 1);
            }

            $digitoCalculado = $soma % 9;

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IESC($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $base = substr($ie, 0, 8);
            $digitoInformado = intval($ie[8]);

            $pesos = [8, 7, 6, 5, 4, 3, 2, 1];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = 11 - $resto;

            if ($digitoCalculado === 10 || $digitoCalculado === 11) {
                $digitoCalculado = 0;
            }

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IESP($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 12) {
            $base1 = substr($ie, 0, 8);
            $digito1 = intval($ie[8]);

            $pesos1 = [1, 3, 4, 5, 6, 7, 8, 10];
            $soma1 = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma1 += intval($base1[$i]) * $pesos1[$i];
            }

            $resto1 = $soma1 % 11;
            $calcDig1 = ($resto1 === 10) ? 0 : $resto1;

            $base2 = substr($ie, 0, 11);
            $digito2 = intval($ie[11]);

            $pesos2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            $soma2 = 0;

            for ($i = 0; $i < 11; $i++) {
                $soma2 += intval($base2[$i]) * $pesos2[$i];
            }

            $resto2 = $soma2 % 11;
            $calcDig2 = ($resto2 === 10) ? 0 : $resto2;

            if ($digito1 === $calcDig1 && $digito2 === $calcDig2) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IESE($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9) {
            $base = substr($ie, 0, 8);
            $digitoInformado = intval($ie[8]);

            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = ($resto < 2) ? 0 : 11 - $resto;

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

    private function val_IETO($ie) {
        $ie = preg_replace('/[^0-9]/', '', $ie);
        $resultado = false;

        if (strlen($ie) === 9 || strlen($ie) === 11) {
            $base;
            if (strlen($ie) === 11) {
                $base = substr($ie, 0, 2) . substr($ie, 4, 6);
            } else {
                $base = substr($ie, 0, 8);
            }

            $digitoInformado = intval(substr($ie, -1));

            $pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            $soma = 0;

            for ($i = 0; $i < 8; $i++) {
                $soma += intval($base[$i]) * $pesos[$i];
            }

            $resto = $soma % 11;
            $digitoCalculado = ($resto < 2) ? 0 : 11 - $resto;

            if ($digitoInformado === $digitoCalculado) {
                $resultado = true;
            }
        }

        return $resultado;
    }

}
?>