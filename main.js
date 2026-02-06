const produtos = [
  { id: 1, nome: "Smartphone Pro Max", preco: "R$ 5.999", icone: "fa-mobile-screen" },
  { id: 2, nome: "Fone Noise Cancelling", preco: "R$ 1.200", icone: "fa-headphones" },
  { id: 3, nome: "Teclado Mecânico RGB", preco: "R$ 450", icone: "fa-keyboard" },
  { id: 4, nome: "Câmera Mirrorless", preco: "R$ 8.500", icone: "fa-camera" }
]

const renderizarProdutos = () => {
  const container = document.querySelector('.product-grid')
  if (!container) return

  produtos.forEach(produto => {
    const card = document.createElement('div')
    card.className = 'product-card'
    card.innerHTML = `
      <i class="fa-solid ${produto.icone}" style="font-size: 3rem; color: #38bdf8; margin-bottom: 1rem;"></i>
      <h3>${produto.nome}</h3>
      <p style="margin: 0.5rem 0; color: #94a3b8;">Tecnologia de ponta para o seu dia a dia.</p>
      <strong style="font-size: 1.2rem; color: #f8fafc;">${produto.preco}</strong>
      <button style="margin-top: 1rem; width: 100%; padding: 0.5rem; cursor: pointer; background: #6366f1; border: none; color: white; border-radius: 5px;">Comprar</button>
    `
    container.appendChild(card)
  })
}

// Inicializa a renderização se estivermos na página de produtos
document.addEventListener('DOMContentLoaded', renderizarProdutos)

USE dsweb;

CREATE TABLE IF NOT EXISTS produtos (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  PRIMARY KEY (id)
);

server.js (Backend Atualizado):

import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: 'benserverplex.dns.net',
  user: '',
  password: '',
  database: 'dsweb',
  connectionLimit: 10
})

app.get('/', async (request, response) => {
  const [rows] = await pool.query('SELECT * FROM products')
  
  return response.json(rows)
})

app.post('/products', async (request, response) => {
  const { name, price, description, category } = request.body

  const query = 'INSERT INTO products (name, price, description, category) VALUES (?, ?, ?, ?)'
  const values = [name, price, description, category]

  await pool.query(query, values)

  return response.status(201).json({ message: "Produto cadastrado com sucesso" })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
