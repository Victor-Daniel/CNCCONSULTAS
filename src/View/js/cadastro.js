// Alternar entre CPF e CNPJ
const tipoPessoaRadios = document.getElementsByName('tipoPessoa');
const cpfCnpjInput = document.getElementById('cpfCnpj');
const inscricaoEstadualGroup = document.getElementById('inscricaoEstadualGroup');
const fone = document.getElementById("contato");

tipoPessoaRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'cpf') {
      cpfCnpjInput.previousElementSibling.textContent = 'CPF';
      cpfCnpjInput.placeholder = 'Digite o CPF';
      inscricaoEstadualGroup.style.display = 'none';
    } else {
      cpfCnpjInput.previousElementSibling.textContent = 'CNPJ';
      cpfCnpjInput.placeholder = 'Digite o CNPJ';
      inscricaoEstadualGroup.style.display = 'block';
    }
  });
});

cpfCnpjInput.addEventListener("keydown",function(e){
   let regex = /[0-9]/;
   if(!regex.test(e.key)&&(e.key != "Backspace")&&(e.key != "ArrowLeft")&&(e.key != "ArrowRight")&&(e.key != "Tab")){
      e.preventDefault();
   }

});

fone.addEventListener("keydown",function(e){
    let regex = /[0-9]/;
    if(!regex.test(e.key)&&(e.key != "Backspace")&&(e.key != "ArrowLeft")&&(e.key != "ArrowRight")&&(e.key != "Tab")){
      e.preventDefault();
    }
});

                                                         
