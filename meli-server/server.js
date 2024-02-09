const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const getCategories = (filters) => {
  return filters.find((filter) => filter.id === "category")?.values;
};

const mapResults = (results) =>
  results.map((item) => ({
    id: item.id,
    title: item.title,
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 2,
    },
  }));

// Ruta para buscar items por query
app.get('/api/items', async (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const limit = req.query.limit || 4

  try {
    const result = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=:${query}&limit=${limit}`
    );
  
    const data = await result.json()
  
    const categories = getCategories(data.filters);
  
    const results = {
      author: {
        name: "David Steeven",
        lastname: "Rojas Herrera",
      },
      categories: categories,
      items: mapResults(data.results),
    };
  
  
    res.json({results});
  } catch (error) {
    res.status(400).json({error});
  }
});

// Ruta para obtener un item por ID
app.get('/api/items/:id', async (req, res) => {
  const meliId = req.params.id;

  try {
    const [item, itemDescription] = await Promise.all([
      (await fetch(`https://api.mercadolibre.com/items/${meliId}`)).json(),
      (await fetch(`https://api.mercadolibre.com/items/${meliId}/description`)).json(),
    ]);
    
    const data = {
      id: item.id,
      title: item.title,
      picture: item.pictures[0].url,
      condition: item.condition === "new" ? "nuevo" : "usado",
      free_shipping: item.shipping.free_shipping,
      sold_cuantity: item.initial_quantity,
      description: itemDescription.plain_text,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 2,
      },
    };
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({data});
    
  } catch (error) {
    res.status(400).json({error});
  }
});

// Iniciar el servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});