const tipoPessoaRadios = document.getElementsByName('tipoPessoa');
const cpfCnpjInput = document.getElementById('cpfCnpj');
const inscricaoEstadualGroup = document.getElementById('inscricaoEstadualGroup');

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

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();

});