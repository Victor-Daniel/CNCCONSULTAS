// Dropdown user profile
const userProfile = document.getElementById('userProfile');
const dropdownMenu = document.getElementById('dropdownMenu');

userProfile.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
  userProfile.classList.toggle('active');
});

// Simular consulta
const btnConsultar = document.getElementById('btnConsultar');
const resultado = document.getElementById('consultaResultado');

btnConsultar.addEventListener('click', () => {
  const cpf = document.getElementById('cpfInput').value;
  const cnpj = document.getElementById('cnpjInput').value;
  const nome = document.getElementById('nomeInput').value;

  // Exemplo de resultado fictício
  resultado.innerHTML = `
    <div class="result-card">
      <h3>Resultado da Consulta</h3>
      <p><strong>Cliente:</strong>${nome||'Victor Daniel'}</p>
       <p><strong>CPF/CNPJ:</strong>${cpf||cnpj}</p>
      <p><strong>Negativado:</strong> Sim</p>
      <p><strong>Estabelecimento:</strong> Loja Exemplo LTDA</p>
      <p><strong>Endereço:</strong> Rua Exemplo, 123 - Centro</p>
      <p><strong>Valor da Dívida:</strong> R$ 2.500,00</p>
      <p><strong>Local da Negativação:</strong> SCPC</p>
      <p><strong>Data de Geração:</strong> 15/06/2024</p>
      <p><strong>Dívida Paga:</strong> Não</p>
      <p><strong>Negativação Removida:</strong> Não</p>
    </div>
  `;
});
