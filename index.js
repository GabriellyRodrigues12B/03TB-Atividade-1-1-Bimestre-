// importa o Express
const express = require("express");

// cria a aplicação
const app = express();

// definir a porta
const PORT = process.env.PORT || 3000;

// rota "/" que retorna um JSON
app.get("/", (req, res) => {
  res.json({
    mensagem: "Olá! Esse é meu backend simples 🚀",
    sucesso: true
  });
});

// iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
