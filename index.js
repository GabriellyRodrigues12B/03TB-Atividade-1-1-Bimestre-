const express = require('express');

const app = express();
const PORT = 3000;

// Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Olá frontend! O backend está funcionando corretamente 🚀'
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});