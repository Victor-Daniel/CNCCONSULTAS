document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita o envio real

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  // Exemplo de validação (pode substituir por requisição real)
  if(username === 'admin' && password === '1234') {
    message.style.color = 'green';
    message.textContent = 'Login bem-sucedido!';
    // Redirecionar ou outras ações...
  } else {
    message.style.color = 'red';
    message.textContent = 'Usuário ou senha inválidos.';
  }
});