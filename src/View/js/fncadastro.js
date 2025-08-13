
// Selecionando os Radio Buttons
const rd_cpf = document.getElementById("rd_cpf");
const rd_cnpj = document.getElementById("rd_cnpj");
const nome = document.getElementById("nome");
const cpfCnpjInp = document.getElementById("cpfCnpj");
const insc_est = document.getElementById("inscricaoEstadual");
const endereco = document.getElementById("endereco");
const numero = document.getElementById("numero");
const bairro = document.getElementById("bairro");
const cep = document.getElementById("cep");
const cidade  = document.getElementById("cidade");
const uf = document.getElementById("uf");
const contato = document.getElementById("contato");
const user = document.getElementById("usuario");
const passwd = document.getElementById("senha");
const conf_pass = document.getElementById("confirmarSenha");
const email = document.getElementById("email");
const btn_cadastro = document.getElementById("btnCadastro");
let position_rd = "cpf";

//Enviando menssagem de erro

var msg = document.getElementById("cadastroMessage");
// Validando dados Para envio
const Radios = document.getElementsByName('tipoPessoa');

Radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'cpf') {
      position_rd = "cpf";
    } else {
      position_rd = "cnpj";
    }
  });
});

// Iniciando o processo de cadastro

btn_cadastro.addEventListener("click",function(){

  //Processo de cadastro de CPF
  if(position_rd==="cpf"){
    let campos = Verificar_Campos_CPF();
    if(campos===true){
      let val_nome = Validar_Nome(nome.value.trim());
      if(val_nome===false){
         alert("Digite novamente o Nome ou Razão Social. Foram encontrados dados inválidos!");
      }
      var val_arraycpf = Validar_CPF(cpfCnpjInp.value.split("").map(Number));
      if(val_arraycpf===false){
        alert("O CPF informado é Inválido. Digite novamente!");
        cpfCnpjInp.value="";
      }
      var val_endereco = Validar_Endereco(endereco.value.trim());
      if(val_endereco===false){
        alert("Digite novamente o Endereço. Foram encontrados dados inválidos!");
        endereco.value = "";
      }
      var val_number_resid = Validar_Numero_Resid(numero.value.trim());
      if(val_number_resid===false){
        alert("Número da Residência inválido");
        numero.value = "";
      }
      var val_bairro = Validar_Bairro(bairro.value.trim());
      if(val_bairro===false){
        alert("O Bairro digitado é inválido!");
        bairro.value = "";
      }
      var val_cep = Validar_Cep(cep.value.trim());
      if(val_cep===false){
        alert("Digite novamente o CEP. Foram encontrados dados inválidos!");
        cep.value = "";
      }
      var val_cidade = Validar_Cidade(cidade.value.trim());
      if(val_cidade===false){
        alert("Digite novamente o nome da Cidade. Foram encontrados dados inválidos!");
        cidade.value="";
      }
      var val_estado = Validar_Estado(uf.value.trim());
      if(val_estado===false){
        alert("Selecione o Estado novamente. Foram encontrados dados inválidos!");
        uf.value="";
      }

      var val_contato=false;
      if(contato.value.length>11){
        alert("Digite novamente o número de Contato. Celular inválido!");
        contato.value="";
      }
      else{
        val_contato = Validar_Contato(contato.value.trim());
        if(val_contato===false){
           alert("Digite novamente o número de Contato. Celular inválido!");
           contato.value="";
        } 
      }

      var usuario = Validar_User(user.value.trim());
      if(usuario==false){
        alert("Digite novamente o nome de Usuário. Foram encontrados dados inválidos!");
        user.value = "";
      }

      var senha1 = Validar_Senha(passwd.value.trim());
      var senha2 = Validar_Senha(conf_pass.value.trim());
      var confirm_senha = false;
      if(senha1===false || senha2===false){
        alert("Digite novamente sua Senha. A senha digitada anteriormente contém o um tamanho menor que 8 caracteres ou não é uma senha válida!");
        passwd.value="";
        conf_pass.value="";
      }
      else if(senha1===true && senha2===true){
          var confirmacao_senha = Comparador_Senhas(passwd.value.trim(),conf_pass.value.trim());
          if(confirmacao_senha===false){
            alert("As senhas não são iguais! Digite novamente.");
            passwd.value="";
            conf_pass.value="";
            confirm_senha=false;
          }
          else{
            confirm_senha=true;
          }
      }
      
      var Val_email = Validar_Email(email.value.trim());
      if(Val_email===false){
        alert("Email inválido! Digite novamente seu email.");
        email.value="";
      }

      if(val_nome===true&&val_arraycpf===true&&val_endereco===true&&val_number_resid===true&&val_bairro===true&&val_cep===true&&val_cidade===true&&val_estado===true&&val_contato===true&&usuario===true&&confirm_senha===true&&Val_email===true){
        var Dados={
          usuario: user.value,
          passwd: conf_pass.value,
          email: email.value,
          contato: contato.value,
          nome: nome.value,
          cpf:cpfCnpjInp.value,
          endereco: endereco.value,
          numero: numero.value,
          bairro: bairro.value,
          cep: cep.value,
          cidade: cidade.value,
          estado: uf.value
        };

        sendData(Dados);
      }
      else{
         alert("Dados incorretos");
      }
      

    }
  }
  //Processo de cadastro do CNPJ.
  else{
    let campos = Verificar_Campos_CNPJ();
    if(campos===true){
        let val_nome = Validar_Nome(nome.value.trim());
        if(val_nome===false){
         alert("Digite novamente o Nome ou Razão Social. Foram encontrados dados inválidos!");
        }
        var val_arraycnpj = Validar_CNPJ(cpfCnpjInp.value.split("").map(Number));
        if(val_arraycnpj===false){
          alert("O CNPJ informado é Inválido. Digite novamente!");
          cpfCnpjInp.value="";
        }

        let val_InsEstadual = Validar_InscricaoEstadual(uf.value);
        if(val_InsEstadual===false){
          alert("A Incrição Estadual informada é Inválida. Digite novamente!");
          insc_est.value ="";
        }
        var val_endereco = Validar_Endereco(endereco.value.trim());
      if(val_endereco===false){
        alert("Digite novamente o Endereço. Foram encontrados dados inválidos!");
        endereco.value = "";
      }
      var val_number_resid = Validar_Numero_Resid(numero.value.trim());
      if(val_number_resid===false){
        alert("Número da Residência inválido");
        numero.value = "";
      }
      var val_bairro = Validar_Bairro(bairro.value.trim());
      if(val_bairro===false){
        alert("O Bairro digitado é inválido!");
        bairro.value = "";
      }
      var val_cep = Validar_Cep(cep.value.trim());
      if(val_cep===false){
        alert("Digite novamente o CEP. Foram encontrados dados inválidos!");
        cep.value = "";
      }
      var val_cidade = Validar_Cidade(cidade.value.trim());
      if(val_cidade===false){
        alert("Digite novamente o nome da Cidade. Foram encontrados dados inválidos!");
        cidade.value="";
      }
      var val_estado = Validar_Estado(uf.value.trim());
      if(val_estado===false){
        alert("Selecione o Estado novamente. Foram encontrados dados inválidos!");
        uf.value="";
      }

      var val_contato=false;
      if(contato.value.length>11){
        alert("Digite novamente o número de Contato. Celular inválido!");
        contato.value="";
      }
      else{
        val_contato = Validar_Contato(contato.value.trim());
        if(val_contato===false){
           alert("Digite novamente o número de Contato. Celular inválido!");
           contato.value="";
        } 
      }

      var usuario = Validar_User(user.value.trim());
      if(usuario==false){
        alert("Digite novamente o nome de Usuário. Foram encontrados dados inválidos!");
        user.value = "";
      }

      var senha1 = Validar_Senha(passwd.value.trim());
      var senha2 = Validar_Senha(conf_pass.value.trim());
      var confirm_senha = false;
      if(senha1===false || senha2===false){
        alert("Digite novamente sua Senha. A senha digitada anteriormente contém o um tamanho menor que 8 caracteres ou não é uma senha válida!");
        passwd.value="";
        conf_pass.value="";
      }
      else if(senha1===true && senha2===true){
          var confirmacao_senha = Comparador_Senhas(passwd.value.trim(),conf_pass.value.trim());
          if(confirmacao_senha===false){
            alert("As senhas não são iguais! Digite novamente.");
            passwd.value="";
            conf_pass.value="";
            confirm_senha=false;
          }
          else{
            confirm_senha=true;
          }
      }
      
      var Val_email = Validar_Email(email.value.trim());
      if(Val_email===false){
        alert("Email inválido! Digite novamente seu email.");
        email.value="";
      }

       if(val_nome===true&&val_arraycnpj===true&&val_InsEstadual===true&&val_endereco===true&&val_number_resid===true&&val_bairro===true&&val_cep===true&&val_cidade===true&&val_estado===true&&val_contato===true&&usuario===true&&confirm_senha===true&&Val_email===true){
        var Dados={
          usuario: user.value,
          passwd: conf_pass.value,
          email: email.value,
          contato: contato.value,
          nome: nome.value,
          cnpj:cpfCnpjInp.value,
          insc_estadual: insc_est.value,
          endereco: endereco.value,
          numero: numero.value,
          bairro: bairro.value,
          cep: cep.value,
          cidade: cidade.value,
          estado: uf.value
        };

        console.log(Dados);
      }
      else{
         alert("Dados incorretos!");
      }

    }

  }
});

function Verificar_Campos_CNPJ(){
    if(nome.value===""){
    alert("Preencha o campo de 'Nome/Razao Social' corretamente!");
    return"";
  }
  else if(cpfCnpjInp.value===""){
    alert("Preencha o CPF corretamente!");
    return"";
  }

  else if(inscricaoEstadual.value===""){
    alert("Preencha o Número da Inscrição Estadual corretamente!");
    return"";
  }

  else if(endereco.value===""){
    alert("Preencha o Endereço corretamente!");
    return"";
  }
  else if(numero.value===""){
    alert("Preencha o Número da Residência corretamente!");
    return"";
  }
  else if(bairro.value===""){
    alert("Preencha o Bairro corretamente!");
    return"";
  }
  else if(cep.value===""){
    alert("Preencha o CEP corretamente!");
    return"";
  }
  else if(cidade.value===""){
    alert("Preencha o Cidade corretamente!");
    return"";
  }
  else if(uf.value===""){
    alert("Selecione o Estado correto!");
    return"";
  }
  else if(contato.value===""){
    alert("Preencha o seu Contato corretamente!");
    return"";
  }
  else if(user.value===""){
    alert("Preencha o Nome de Usuário corretamente!");
    return"";
  }
  else if(passwd.value===""){
    alert("Preencha a Senha corretamente!");
    return"";
  }
  else if(conf_pass.value===""){
    alert("Preencha a Verificação de corretamente!");
    return"";
  }
  else if(email.value===""){
     alert("Preencha com Email correto!");
     return"";
  }
  else{
    return true;
  }
}

function Verificar_Campos_CPF(){
  if(nome.value===""){
    alert("Preencha o campo de 'Nome/Razao Social' corretamente!");
    return"";
  }
  else if(cpfCnpjInp.value===""){
    alert("Preencha o CPF corretamente!");
    return"";
  }
  else if(endereco.value===""){
    alert("Preencha o Endereço corretamente!");
    return"";
  }
  else if(numero.value===""){
    alert("Preencha o Número da Residência corretamente!");
    return"";
  }
  else if(bairro.value===""){
    alert("Preencha o Bairro corretamente!");
    return"";
  }
  else if(cep.value===""){
    alert("Preencha o CEP corretamente!");
    return"";
  }
  else if(cidade.value===""){
    alert("Preencha o Cidade corretamente!");
    return"";
  }
  else if(uf.value===""){
    alert("Selecione o Estado correto!");
    return"";
  }
  else if(contato.value===""){
    alert("Preencha o seu Contato corretamente!");
    return"";
  }
  else if(user.value===""){
    alert("Preencha o Nome de Usuário corretamente!");
    return"";
  }
  else if(passwd.value===""){
    alert("Preencha a Senha corretamente!");
    return"";
  }
  else if(conf_pass.value===""){
    alert("Preencha a Verificação de corretamente!");
    return"";
  }
  else if(email.value===""){
     alert("Preencha com Email correto!");
     return"";
  }
  else{
    return true;
  }
}

function Validar_Nome(Nome){
  const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
  let number_finds = 0;
  for (let i = 0; i < Nome.length; i++) {
    const char = Nome[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    nome.value = "";
    return false;
  }
  else{
    return true;
  }

}

function Validar_CPF(arraycpf){

    let i,j,soma,dv1,dv2,resto;

    // Calculando Digito Verificador 1
    i,soma=0;
    j = 10;
    for(i=0; i<9; i++){
        soma+=arraycpf[i]*j;
        j = j-1;
    }
    
    resto = soma % 11;

    if(resto < 2){
        dv1 = 0;
    }
    else{
        dv1 = 11 - resto;
    }

    //Calcular Digito verificador 2

    soma = 0;
    j = 11;

    for(i=0; i<10; i++){
        soma+=arraycpf[i]*j;
        j = j-1;
    }

    resto = soma % 11;

    if(resto < 2){
        dv2 = 0;
    }
    else{
        dv2 = 11 - resto;
    }

    //Comparação com os resultados.
    if((dv1 == arraycpf[9])&&(dv2 == arraycpf[10])){
        return true;
    }
    else{
        return false;
    }
}

function Validar_CNPJ(arraycnpj){
   let i, soma, dv1, dv2, resto;

    //Calculando Digito Validador 1
    let pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0;

    for (i = 0; i < 12; i++) {
        soma += arraycnpj[i] * pesos1[i];
    }

    resto = soma % 11;

    if(resto < 2){
        dv1 = 0;
    }
    else{
        dv1 = 11 - resto;
    }

    //Digito validador 2

    let pesos2 = [6].concat(pesos1); // mesma lista, mas começa com 6
    soma = 0;
    for (i = 0; i < 13; i++) {
        soma += arraycnpj[i] * pesos2[i];
    }

    resto = soma % 11;

    if(resto < 2){
        dv2 = 0;
    }
    else{
        dv2 = 11 - resto;
    }
    

    //Comparação

    if((dv1 == arraycnpj[12])&&(dv2==arraycnpj[13])){
        return true;
    }
    else{
        return false;
    }

}

function Validar_Endereco(Endereco){
  const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
  let number_finds = 0;
  for (let i = 0; i < Endereco.length; i++) {
    const char = Endereco[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    return false
  }
  else {
    return true;
  }

}

function Validar_Numero_Resid(number){
  const regex = /[0-9A-Za-z]/;
  let number_finds = 0;
  if((!regex.test(number)&&number.length>7)||(regex.test(number)&&number.length>7)||(!regex.test(number)&& number.length<7)){
    return false;
  }
  else{
    for (let i = 0; i < number.length; i++) {
      const char = number[i];
      if ((!regex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')||(char === 'ç')||(char === 'Ç')) {
        number_finds = number_finds + 1;
      }
    }
    if(number_finds>0){
      return false;
    }
    else{
      return true;
    }
  }
}

function Validar_Bairro(Bairro){
  const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
  let number_finds = 0;
  for (let i = 0; i < Bairro.length; i++) {
    const char = Bairro[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    return false;
  }
  else{
    return true;
  }
}

function Validar_Cep(Cep){
  const regex = /^\d{5}-?\d{3}$/;

  if (!regex.test(Cep)) {
    return false;
  }
  else{
    return true;
  }

}

function Validar_Cidade(Cidade){
  const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
  let number_finds = 0;
  for (let i = 0; i < Cidade.length; i++) {
    const char = Cidade[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    return false;
  }
  else{
    return true;
  }
}

function Validar_Estado(Estado){
    const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
  let number_finds = 0;
  for (let i = 0; i < Estado.length; i++) {
    const char = Estado[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    return false;
  }
  else{
    return true;
  }
}

function Validar_Contato(Contato){
  var celular = Contato.replace(/\D/g,""); 
  
  var regex = /[0-9]/;
  if(regex.test(celular)){
    return true;
  }
  else{
    return false;
  }
}

function Validar_User(User){
  const charRegex = /^[a-zA-Z0-9À-ÿ\s]$/;
  let number_finds = 0;
  for (let i = 0; i < User.length; i++) {
    const char = User[i];

    if ((!charRegex.test(char))||(char === '<')||(char === '>')||(char === '/')||(char === '\\')) {
      number_finds = number_finds + 1;
    }
  }

  if(number_finds>0){
    return false;
  }
  else{
    return true;
  }
}

function Comparador_Senhas(senha1, senha2){
  if(senha1!=senha2){
    return false;
  }
  else{
    return true;
  }
}

function Validar_Senha(Senha){
  let temMinuscula = false;
  let temMaiuscula = false;
  let temNumero = false;
  let temEspecial = false;
  const caracteresEspeciais = /[@$!%*?#&.]/;
  if(Senha.length<8){
    return false;
  }
  else{
    for (let i = 0; i < Senha.length; i++) {
      const char = Senha[i];

      if (/[a-z]/.test(char)) {
        temMinuscula = true;
      } else if (/[A-Z]/.test(char)) {
        temMaiuscula = true;
      } else if (/\d/.test(char)) {
        temNumero = true;
      } else if (caracteresEspeciais.test(char)) {
        temEspecial = true;
      }
    }

    if(temMaiuscula===true&&temMinuscula===true&&temNumero===true&&temEspecial===true){
      return true;
    }
    else{
      return false;
    }
  }

}

function Validar_Email(email){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(email)){
     return true;
  }
  else{
    return false;
  }
}

function Validar_InscricaoEstadual(UF){
 
  if(UF=="AC"){
    return val_IEAC(insc_est.value);
  }
  if(UF=="AL"){
    return val_IEAL(insc_est.value);
  }
    if(UF=="AP"){
    return val_IEAP(insc_est.value);
  }
    if(UF=="AM"){
    return val_IEAM(insc_est.value);
  }
    if(UF=="BA"){
    return val_IEBA(insc_est.value);
  }
    if(UF=="CE"){
    return val_IECE(insc_est.value);
  }
    if(UF=="DF"){
    return val_IEDF(insc_est.value);
  }
    if(UF=="ES"){
    return val_IEES(insc_est.value);
  }
    if(UF=="GO"){
    return val_IEGO(insc_est.value);
  }
    if(UF=="MA"){
    return val_IEMA(insc_est.value);
  }
    if(UF=="MT"){
    return val_IEMT(insc_est.value);
  }
    if(UF=="MS"){
    return val_IEMS(insc_est.value);
  }
    if(UF=="MG"){
    return val_IEMG(insc_est.value);
  }
    if(UF=="PA"){
    return val_IEPA(insc_est.value);
  }
    if(UF=="PB"){
    return val_IEPB(insc_est.value);
  }
    if(UF=="PR"){
    return val_IEPR(insc_est.value);
  }
    if(UF=="PE"){
    return val_IEPE(insc_est.value);
  }
    if(UF=="PI"){
    return val_IEPI(insc_est.value);
  }
    if(UF=="RJ"){
    return val_IERJ(insc_est.value);
  }
    if(UF=="RN"){
    return val_IERN(insc_est.value);
  }
    if(UF=="RS"){
    return val_IERS(insc_est.value);
  }
    if(UF=="RO"){
    return val_IERO(insc_est.value);
  }
    if(UF=="RR"){
    return val_IERR(insc_est.value);
  }
    if(UF=="SC"){
    return val_IESC(insc_est.value);
  }
    if(UF=="SP"){
    return val_IESP(insc_est.value);
  }
    if(UF=="SE"){
    return val_IESE(insc_est.value);
  }
    if(UF=="TO"){
    return val_IETO(insc_est.value);
  }


}

//Função de Enviar Dados

function sendData(json){
  fetch("http://localhost/api/createuser",{
    method:"POST",
     headers: {
    'Content-Type': 'application/json'
    },

    body: JSON.stringify(json)
  })
  .then(response => response.json())
  .then(result => {
  console.log(result);
})
.catch(error => {
  console.error('Erro na requisição:', error);
});
}

// Validadores de Inscrição Estadual
function val_IEAC(ie){
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
function val_IEAL(ie){
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
 function val_IEAM(ie){
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
function  val_IEAP(ie){
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
function val_IEBA(ie){
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
function  val_IECE(ie){
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
function  val_IEDF(ie){
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
function  val_IEES(ie){
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
function  val_IEGO(ie){
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
function  val_IEMA(ie){
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
function  val_IEMT(ie){
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
function  val_IEMS(ie){
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
function  val_IRMG(ie){
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
function  val_IEPA(ie){
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
function  val_IEPB(ie){
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
function  val_IEPR(ie){
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
function  val_IEPE(ie){
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
function  val_IEPI(ie){
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
function  val_IERJ(ie){
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
function  val_IERN(ie){
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
function val_IERS(ie){
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
function  val_IERO(ie){
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
function  val_IERR(ie){
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
function  val_IESC(ie){
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
function  val_IESP(ie){
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