# 🛒 Projeto e-commerce - Desafio técnico

Esse projeto de e-commerce foi feito como parte de um desafio técnico. Ele contém Front-end em **React** e Back-end em **Node.js**. O objetivo é simular uma loja virtual com listagem de produtos, carrinho de compras e finalização de pedidos.

---

## 📦 Funcionalidades

- Filtrar produto por nome  
- Filtros por nome de produto  
- Adicionar produtos ao carrinho  
- Listagem de produtos, descrição e preço  
- Finalização de pedidos com envio dos dados para o back-end  
- Visualização e cálculo do total dos produtos adicionados ao carrinho  

---

## 📁 Estruturas das Pastas
ecommerce-dev/
├── backend/
├── frontend/
└── README.md

## 💻 Tecnologias utilizadas

## Chatgpt
Como tenho pouco conhecimento em programação e iniciei os meus estudos faz 5 meses, precisei utilizar para obter uma aplicação limpa e sem complexidades.

### Front-end
- APIs  
- React  
- CSS puro (sem frameworks)

### Back-end
- Node.js  
- Express  
- Arquivos `.json` para persistência (simulação de banco de dados)

---

## 🧠 Decisões Técnicas

- O backend foi mantido simples com Express e arquivos `.json` para foco na lógica.
- O frontend foi feito com React sem bibliotecas externas para manter leveza e controle total sobre a UI.
- As imagens dos produtos são ilustrativas e foram usadas como placeholders para fins de apresentação.
- As APIs externas de fornecedores (Brasil e Europa) estão mapeadas para futura integração.
- O carrinho foi implementado totalmente no estado local (`useState`), com persistência mínima para simplicidade.

---

## 🚀 Como rodar o projeto

### Backend

```bash
cd backend
npm install
node index.js


---

## 🧠 Decisões Técnicas

- O back-end foi mantido simples com Express e arquivos `.json` para foco na lógica.  
- As APIs externas de fornecedores (Brasil e Europa) estão mapeadas para futura integração.  
- O frontend foi feito com React sem bibliotecas externas para manter leveza e controle total sobre a UI.  
- O carrinho foi implementado totalmente no estado local (`useState`), com persistência mínima para simplicidade.

---

## 🚀 Como rodar o projeto

### Back-end
bash
cd backend
npm install
node index.js
O back-end ficará disponível em: http://localhost:3001

### Front-end
bash
cd frontend
npm install
npm start
O frontend ficará disponível em: http://localhost:3000
