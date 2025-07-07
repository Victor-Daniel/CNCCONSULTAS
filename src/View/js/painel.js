// Nome dinâmico
const userName = document.getElementById('userName');
const usuarioLogado = { nome: 'my account' };
userName.textContent = `${usuarioLogado.nome}`;

// Dropdown toggle
const userProfile = document.getElementById('userProfile');
const dropdownMenu = document.getElementById('dropdownMenu');

userProfile.addEventListener('click', function (e) {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
  userProfile.classList.toggle('active');
});

document.addEventListener('click', function () {
  dropdownMenu.classList.remove('show');
  userProfile.classList.remove('active');
});

// Ações dos botões
document.getElementById('btnIniciarNegativacao').addEventListener('click', () => {
  alert('Iniciar Negativação acionado!');
});

document.getElementById('btnRemoverNegativacao').addEventListener('click', () => {
  alert('Remover Negativação acionado!');
});

document.getElementById('btnRealizarConsultas').addEventListener('click', () => {
  alert('Realizar Consultas acionado!');
});
document.querySelector('.dropdown-menu a:last-child').addEventListener('click', () => {
  alert('Você saiu do sistema!');
  // Aqui você pode redirecionar para a página de login, por exemplo:
  // window.location.href = '/login.html';
});