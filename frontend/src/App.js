import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');



  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const order = {
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price, 0),
    };

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(data => {
        alert('Pedido finalizado com sucesso');
        setCart([]);
      })
      .catch(err => {
        console.error('Erro ao finalizar pedido:', err);
        alert('Erro ao finalizar pedido.');
      });
  };

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        console.log('Dados recebidos do backend:', data);
        setProducts(data);
      })
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      {cart.length > 0 && (
        <div className='cart'>
          <h2>Carrinho de Compras</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> R$ {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Finalizar Pedido
          </button>
        </div>
      )}

      <div className='search-bar'>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <input
          type="number"
          placeholder="Preço mínimo"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="products">
        {products.length === 0 && <p>Nenhum produto encontrado.</p>}
        {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!minPrice || p.price >= parseFloat(minPrice)) &&
          (!maxPrice || p.price <= parseFloat(maxPrice))
        ).map(p => (
          <div key={p.id} className="product-card">
            <h2 className="product-name">{p.name}</h2>
            <p className="product-description">{p.description}</p>
            <div className="product-price">R$ {p.price.toFixed(2)}</div>
            <button className='add-to-cart' onClick={() => addToCart(p)}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;





