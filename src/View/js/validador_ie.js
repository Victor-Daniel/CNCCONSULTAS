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
    val_IEMT(ie){
         ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 11) {
            const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 10; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto < 2 || resto === 10) ? 0 : 11 - resto;

            if (parseInt(ie[10]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEMS(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.startsWith('28')) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IRMG(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 13) {
            const base = ie.substring(0, 11);
            const digito1 = parseInt(ie[11]);
            const digito2 = parseInt(ie[12]);

            // === Cálculo do primeiro dígito (12º dígito) ===
            let body = ie.substring(0, 3) + '0' + ie.substring(3, 11);
            let soma = 0;

            for (let i = 0; i < body.length; i++) {
            const multiplicador = (i % 2 === 0) ? 1 : 2;
            const produto = parseInt(body[i]) * multiplicador;
            soma += produto > 9 ? Math.floor(produto / 10) + (produto % 10) : produto;
            }

            const resto1 = soma % 10;
            const calculadoDigito1 = (resto1 === 0) ? 0 : 10 - resto1;

            // === Cálculo do segundo dígito (13º dígito) ===
            const pesos2 = [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;
            const novaBase = base + calculadoDigito1;

            for (let i = 0; i < 12; i++) {
            soma2 += parseInt(novaBase[i]) * pesos2[i];
            }

            const resto2 = soma2 % 11;
            const calculadoDigito2 = (resto2 < 2) ? 0 : 11 - resto2;

            if (digito1 === calculadoDigito1 && digito2 === calculadoDigito2) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEPA(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.startsWith('15')) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto <= 1) ? 0 : 11 - resto;

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEPB(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(ie[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;

            if (parseInt(ie[8]) === digito) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEPR(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 10) {
            const corpo = ie.substring(0, 8);
            const digito1 = parseInt(ie[8]);
            const digito2 = parseInt(ie[9]);

            // Cálculo do primeiro dígito
            const pesos1 = [3, 2, 7, 6, 5, 4, 3, 2];
            let soma1 = 0;

            for (let i = 0; i < 8; i++) {
            soma1 += parseInt(ie[i]) * pesos1[i];
            }

            let resto1 = soma1 % 11;
            let calcDig1 = (resto1 <= 1) ? 0 : 11 - resto1;

            // Cálculo do segundo dígito (usa o corpo + primeiro dígito)
            const pesos2 = [4, 3, 2, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;
            const corpo2 = corpo + calcDig1;

            for (let i = 0; i < 9; i++) {
            soma2 += parseInt(corpo2[i]) * pesos2[i];
            }

            let resto2 = soma2 % 11;
            let calcDig2 = (resto2 <= 1) ? 0 : 11 - resto2;

            if (digito1 === calcDig1 && digito2 === calcDig2) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEPE(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const base = ie.substring(0, 7); // primeiros 7 dígitos
            const dv1 = parseInt(ie[7]);
            const dv2 = parseInt(ie[8]);

            // Cálculo do primeiro dígito
            const pesos1 = [8, 7, 6, 5, 4, 3, 2];
            let soma1 = 0;

            for (let i = 0; i < 7; i++) {
            soma1 += parseInt(base[i]) * pesos1[i];
            }

            let resto1 = soma1 % 11;
            let calcDV1 = (resto1 <= 1) ? 0 : 11 - resto1;

            // Cálculo do segundo dígito
            const novoBase = base + calcDV1;
            const pesos2 = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;

            for (let i = 0; i < 8; i++) {
            soma2 += parseInt(novoBase[i]) * pesos2[i];
            }

            let resto2 = soma2 % 11;
            let calcDV2 = (resto2 <= 1) ? 0 : 11 - resto2;

            if (dv1 === calcDV1 && dv2 === calcDV2) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IEPI(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const base = ie.substring(0, 8); // primeiros 8 dígitos
            const digitoInformado = parseInt(ie[8]);

            const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(base[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digitoCalculado = (resto === 0 || resto === 1) ? 0 : 11 - resto;

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IERJ(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 8) {
            const base = ie.substring(0, 7); // primeiros 7 dígitos
            const digitoInformado = parseInt(ie[7]);

            const pesos = [2, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 7; i++) {
            soma += parseInt(base[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digitoCalculado = 11 - resto;

            if (digitoCalculado >= 10) {
            digitoCalculado = 0;
            }

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IERN(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 || ie.length === 10) {
            const base = ie.slice(0, ie.length - 1);
            const digitoInformado = parseInt(ie.slice(-1));

            const pesos = [];
            let pesoInicial = ie.length;
            for (let i = 0; i < base.length; i++) {
            pesos.push(pesoInicial - i);
            }

            let soma = 0;
            for (let i = 0; i < base.length; i++) {
            soma += parseInt(base[i]) * pesos[i];
            }

            let resto = (soma * 10) % 11;
            let digitoCalculado = (resto === 10) ? 0 : resto;

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IERS(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 10) {
            const base = ie.slice(0, 9); // primeiros 9 dígitos
            const digitoInformado = parseInt(ie[9]);

            const pesos = [2, 3, 4, 5, 6, 7, 8, 9];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(base[8 - i]) * pesos[i];
            }

            soma += parseInt(base[0]) * 2;

            let resto = soma % 11;
            let digitoCalculado = 11 - resto;

            if (digitoCalculado === 10 || digitoCalculado === 11) {
            digitoCalculado = 0;
            }

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IERO(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 14) {
            const base = ie.substring(0, 13);
            const digitoInformado = parseInt(ie[13]);

            const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma = 0;

            for (let i = 0; i < 13; i++) {
            soma += parseInt(base[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digitoCalculado = 11 - resto;

            if (digitoCalculado === 10 || digitoCalculado === 11) {
            digitoCalculado = 0;
            }

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IERR(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9 && ie.startsWith('24')) {
            const base = ie.slice(0, 8);
            const digitoInformado = parseInt(ie[8]);

            let soma = 0;
            for (let i = 0; i < 8; i++) {
            soma += parseInt(base[i]) * (i + 1);
            }

            let digitoCalculado = soma % 9;

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IESC(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 9) {
            const base = ie.slice(0, 8);
            const digitoInformado = parseInt(ie[8]);

            const pesos = [8, 7, 6, 5, 4, 3, 2, 1];
            let soma = 0;

            for (let i = 0; i < 8; i++) {
            soma += parseInt(base[i]) * pesos[i];
            }

            let resto = soma % 11;
            let digitoCalculado = 11 - resto;

            if (digitoCalculado === 10 || digitoCalculado === 11) {
            digitoCalculado = 0;
            }

            if (digitoInformado === digitoCalculado) {
            resultado = true;
            }
        }

        return resultado;
    }
    val_IESP(ie){
        ie = ie.replace(/\D/g, '');
        let resultado = false;

        if (ie.length === 12) {
            // Validação do primeiro dígito verificador (posição 9)
            const base1 = ie.substring(0, 8);
            const digito1 = parseInt(ie[8]);

            const pesos1 = [1, 3, 4, 5, 6, 7, 8, 10];
            let soma1 = 0;

            for (let i = 0; i < 8; i++) {
            soma1 += parseInt(base1[i]) * pesos1[i];
            }

            let resto1 = soma1 % 11;
            let calcDig1 = (resto1 === 10) ? 0 : resto1;

            // Validação do segundo dígito verificador (posição 12)
            const base2 = ie.substring(0, 11);
            const digito2 = parseInt(ie[11]);

            const pesos2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;

            for (let i = 0; i < 11; i++) {
            soma2 += parseInt(base2[i]) * pesos2[i];
            }

            let resto2 = soma2 % 11;
            let calcDig2 = (resto2 === 10) ? 0 : resto2;

            if (digito1 === calcDig1 && digito2 === calcDig2) {
            resultado = true;
            }
        }

        return resultado;
    }

}