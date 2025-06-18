const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const BRAZIL_API = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
const EUROPE_API = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

app.get('/products', async (req, res) => {
    console.log('requisição recebida em /products');

    try {
        const axiosConfig = { timeout: 5000 };

        const [brRes, euRes] = await Promise.all([
            axios.get(BRAZIL_API, axiosConfig),
            axios.get(EUROPE_API, axiosConfig)
        ]);

        const brProducts = brRes.data.map(p => ({
            id: `br-${p.id}`,
            name: p.nome,
            price: parseFloat(p.preco),
            image: p.imagem,
            description: p.descricao,
            provider: 'brazilian'
        }));

        const euProducts = euRes.data.map(p => ({
            id: `eu-${p.id}`,
            name: p.name,
            price: parseFloat(p.price),
            image: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery[0] : null,
            description: p.description,
            provider: 'european'
        }));

        const allProducts = [...brProducts, ...euProducts];
        console.log(' Enviando produtos para o cliente, total:', allProducts.length);
        res.json(allProducts);

    } catch (err) {
        console.error(' Erro ao buscar produtos:', err.message);
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
});


app.post('/orders', (req, res) => {
    const order = req.body;

    fs.readFile('orders.json', 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) orders = JSON.parse(data);

        orders.push({
            id: Date.now(),
            ...order,
            createdAt: new Date().toISOString()
        });

        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), err => {
            if (err) {
                console.error('Erro ao salvar pedido:', err);
                return res.status(500).json({ error: 'Erro ao salvar pedido.' });
            }

            res.status(201).json({ message: 'Pedido salvo com sucesso.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
});

