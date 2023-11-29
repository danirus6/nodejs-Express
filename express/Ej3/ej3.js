const express = require('express')
const app = express()

const PORT = 3000;

const products = [
    {
        id: 1, nombre: 'Taza de Harry Potter' , precio: 300
    },
    { 
        id: 2, nombre: 'FIFA 22 PS5' , precio: 1000
    },
    {  
        id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100
    },
    {  
        id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200
    },
    {  
        id: 5,  nombre: 'Skin Valorant' , precio: 120
    },
    {  
        id: 6, nombre: 'Taza de Star Wars' , precio: 220
    }
  ];
  app.use(express.json());

  app.get('/products', (req, res) => {
    res.status(200).send({ message: 'todo ok', result: products })
})

//POST
app.post('/products/new', (req, res) =>{
    const {nombre, precio} = req.body;
    const newProduct = {
        id: products.length +1,
        nombre,
        precio
    }
    if(!nombre || !precio)
    res.status(400).send('Ingresa los datos correctamente');
    else{
        products.push(newProduct);
        res.status(201).send({
            message: 'todo correcto',
            products
        });
    }
});
//PUT
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10); // Convierte a número

    const found = products.some((product) => product.id === productId);

    if (found) {
        products.forEach(product => {
            if (product.id === productId) {
                product.nombre = req.body.nombre ? req.body.nombre : product.nombre;
                product.precio = req.body.precio ? req.body.precio : product.precio;
                res.send(product);
            }
        });
    } else {
        res.status(404).send('Error: Producto no encontrado');
    }
});


// DELETE
app.delete('/products/id/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10); // Convierte a número

    const found = products.some((product) => product.id === productId);

    if (found) {
        const deleteItem = products.filter((product) => product.id !== productId);
        res.status(202).send(deleteItem);
    } else {
        res.status(404).send({
            message: 'No existe el producto con el ID proporcionado'
        });
    }
});


app.get('/products/filter/price', (req, res) => {
  const { min, max } = req.query;
  const filteredProducts = products.filter(
    product => product.precio >= parseInt(min) && product.precio <= parseInt(max)
  );
  res.json({ description: 'Productos filtrados por precio', items: filteredProducts });
});

app.get('/products/filter/id/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id == id);

  if (product) {
    res.json({ description: 'Producto encontrado por ID', item: product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.get('/products/filter/nombre/:nombre', (req, res) => {
  const { nombre } = req.params;
  const product = products.find(product => product.nombre.toLowerCase() === nombre.toLowerCase());

  if (product) {
    res.json({ description: 'Producto encontrado por nombre', item: product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

  app.listen(PORT, () => {
  console.log(`Servidor http://localhost:${PORT}`);
});