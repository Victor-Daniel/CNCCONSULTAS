export class Validador_IE{
    val_IEAC(ie){
        ie = ie.replace(/\D/g, '');

        let resultado = false;

        if (/^(01)\d{11}$/.test(ie)) {
            // Primeiro dígito
            const pesos1 = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma1 = 0;

            for (let i = 0; i < 11; i++) {
            soma1 += parseInt(ie[i]) * pesos1[i];
            }

            let digito1 = 11 - (soma1 % 11);
            if (digito1 >= 10) {
            digito1 = 0;
            }

            if (parseInt(ie[11]) === digito1) {
            // Segundo dígito
            const pesos2 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;

            for (let i = 0; i < 12; i++) {
                soma2 += parseInt(ie[i]) * pesos2[i];
            }

            let digito2 = 11 - (soma2 % 11);
            if (digito2 >= 10) {
                digito2 = 0;
            }

            if (parseInt(ie[12]) === digito2) {
                resultado = true;
            } else {
                resultado = false;
            }
            } else {
            resultado = false;
            }
        } else {
            resultado = false;
        }

        return resultado;

    }
    val_IEAL(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.substring(0, 2) === '24') {
            const terceiroDigito = parseInt(ie[2]);
            if (terceiroDigito >= 0 && terceiroDigito <= 5) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
                soma += parseInt(ie[i]) * pesos[i];
            }

            let digito = (11 - (soma % 11));
            if (digito >= 10) {
                digito = 0;
            }

            if (parseInt(ie[8]) === digito) {
                resultado = true;
            } else {
                resultado = false;
            }
            } else {
            resultado = false;
            }
        } else {
            resultado = false;
        }

        return resultado;
    }
    val_IEAM(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const primeiroDigito = parseInt(ie[0]);
            if (primeiroDigito === 1 || primeiroDigito === 2 || primeiroDigito === 3) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
                soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito;

            if (resto === 0) {
                digito = 0;
            } else if (resto === 1) {
                // Segundo dígito do IE tem que ser 0 ou 1 quando resto é 1
                const segundoDigito = parseInt(ie[1]);
                if (segundoDigito === 0 || segundoDigito === 1) {
                digito = 1;
                } else {
                resultado = false;
                return resultado;
                }
            } else {
                digito = 11 - resto;
            }

            if (parseInt(ie[8]) === digito) {
                resultado = true;
            } else {
                resultado = false;
            }
            } else {
            resultado = false;
            }
        } else {
            resultado = false;
        }

        return resultado;
    }
    val_IEAP(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.startsWith('03')) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito;

            if (resto === 0 || resto === 1) {
            digito = 0;
            } else {
            digito = 11 - resto;
            }

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            } else {
            resultado = false;
            }
        } else {
            resultado = false;
        }

        return resultado;  
    }
    val_IEBA(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length !== 8 && ie.length !== 9) {
            return false;
        }

        const base = ie.length === 8 ? ie.substring(0, 6) : ie.substring(0, 7);
        const segundoDigito = parseInt(ie[1]);
        let modulo = 0;

        if ([0, 1, 2, 3, 4, 5, 8].includes(segundoDigito)) {
            modulo = 10;
        } else if ([6, 7, 9].includes(segundoDigito)) {
            modulo = 11;
        } else {
            return false;
        }

        function calcularDigito(posicoes, pesos, mod) {
            let soma = 0;
            for (let i = 0; i < pesos.length; i++) {
            soma += parseInt(posicoes[i]) * pesos[i];
            }
            let resto = soma % mod;
            if (mod === 10) {
            return resto === 0 ? 0 : mod - resto;
            } else {
            if (resto === 0 || resto === 1) return 0;
            return mod - resto;
            }
        }

        let d7 = 0, d8 = 0;
        if (ie.length === 8) {
            d8 = calcularDigito(ie.substring(0, 7), [7, 6, 5, 4, 3, 2, 1], modulo);
            if (parseInt(ie[7]) === d8) {
            resultado = true;
            }
        } else {
            // Primeiro dígito verificador (posição 8)
            d8 = calcularDigito(ie.substring(0, 7), [8, 7, 6, 5, 4, 3, 2], modulo);
            // Segundo dígito verificador (posição 9)
            const parcial = ie.substring(0, 7) + d8.toString();
            d9 = calcularDigito(parcial.substring(0, 8), [9, 8, 7, 6, 5, 4, 3, 2], modulo);

            if (parseInt(ie[7]) === d8 && parseInt(ie[8]) === d9) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IECE(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito;

            if (resto === 0 || resto === 1) {
            digito = 0;
            } else {
            digito = 11 - resto;
            }

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            } else {
            resultado = false;
            }
        } else {
            resultado = false;
        }

        return resultado;
    }
    val_IEDF(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 13 && ie.startsWith('07')) {
            // Primeiro dígito verificador (posição 11)
            let soma1 = 0;
            const pesos1 = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 11; i++) {
            soma1 += parseInt(ie[i]) * pesos1[i];
            }
            let resto1 = soma1 % 11;
            let digito1 = (resto1 < 2) ? 0 : 11 - resto1;

            // Segundo dígito verificador (posição 12)
            let soma2 = 0;
            const pesos2 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            const parte12 = ie.substring(0, 11) + digito1.toString();
            for (let i = 0; i < 12; i++) {
            soma2 += parseInt(parte12[i]) * pesos2[i];
            }
            let resto2 = soma2 % 11;
            let digito2 = (resto2 < 2) ? 0 : 11 - resto2;

            if (parseInt(ie[11]) === digito1 && parseInt(ie[12]) === digito2) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEES(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto < 2) ? 0 : 11 - resto;

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEGO(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const prefixo = ie.substring(0, 2);
            if (prefixo === '10' || prefixo === '11' || prefixo === '15') {
            const corpo = ie.substring(0, 8);
            const numero = parseInt(ie);

            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
                soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = 11 - resto;

            if (resto === 0) {
                digito = 0;
            } else if (resto === 1) {
                if (numero >= 101031050 && numero <= 101199979) {
                digito = 1;
                } else {
                digito = 0;
                }
            }

            if (parseInt(ie[8]) === digito) {
                resultado = true;
            }
            }
        }

        return resultado;
    }
    val_IEMA(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.startsWith('12')) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto < 2) ? 0 : 11 - resto;

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }

}