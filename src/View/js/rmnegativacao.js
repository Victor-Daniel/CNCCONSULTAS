// Dropdown
const userProfile = document.getElementById('userProfile');
const dropdownMenu = document.getElementById('dropdownMenu');

userProfile.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
  userProfile.classList.toggle('active');
});

// Botão Remover
const btnRemover = document.getElementById('btnRemover');

btnRemover.addEventListener('click', () => {
  const cpf = document.getElementById('cpf').value.trim();
  const motivo = document.getElementById('motivo').value.trim();
  const dataRemocao = document.getElementById('dataRemocao').value;

  // Simples demonstração
  console.log('Remoção registrada:', {
    cpf,
    motivo,
    dataRemocao
  });

  alert('Negativação removida com sucesso!');
});