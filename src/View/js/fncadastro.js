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
            confirm_senha=true;
          }
      }
      
      var Val_email = Validar_Email(email.value.trim());
      if(Val_email===false){
        alert("Email inválido! Digite novamente seu email.");
        email.value="";
      }

      if(val_nome===true&&val_arraycpf===true&&val_endereco===true&&val_number_resid===true&&val_bairro===true&&val_cep===true&&val_cidade===true&&val_estado===true&&val_contato===true&&usuario===true&&confirm_senha===true&&Val_email===true){
        alert("Dados OK");
      }
      else{
         alert("Dados incorretos");
      }
      

    }
  }
  //Processo de cadastro do CNPJ.
  else{
    let campos = Verificar_Campos_CNPJ();
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

function Validar_CNPJ(arrayCnpj){
  
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
  const charRegex = /^[a-zA-ZÀ-ÿçÇ^~´\s]$/;
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
