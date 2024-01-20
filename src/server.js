const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = knex(require('../knexfile'));

app.get('/clients', async (req, res) => {
  try {
    const clients = await db('clients').select('*');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/clients/coordinates', async (req, res) => {
  try {
    const clients = await db('clients').select('id', 'x_coordinate', 'y_coordinate');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar coordenadas dos clientes' });
  }
});

app.get('/optimize-route', async (req, res) => {
  try {
    const clients = await db('clients').select('id', 'name', 'x_coordinate', 'y_coordinate');

    if (clients.length === 0) {
      return res.status(400).json({ error: 'Nenhum cliente cadastrado.' });
    }

    const optimizedRoute = calculateOptimizedRoute(clients);
    res.json(optimizedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao calcular rota mais eficiente.' });
  }
});

app.post('/clients', async (req, res) => {
  const { name, email, phone, x_coordinate, y_coordinate } = req.body;
  try {
    const newClient = await db('clients').insert({ name, email, phone, x_coordinate, y_coordinate }).returning('*');
    res.json(newClient[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

function calculateOptimizedRoute(clients) {
  const n = clients.length;
  const visited = Array(n).fill(false);
  const route = [];

  const distance = (point1, point2) =>
    Math.sqrt(Math.pow(point1.x_coordinate - point2.x_coordinate, 2) + Math.pow(point1.y_coordinate - point2.y_coordinate, 2));

  let currentPoint = { x_coordinate: 0, y_coordinate: 0 };

  for (let i = 0; i < n; i++) {
    visited[i] = true;
    route.push(clients[i]);

    let minDistance = Number.MAX_VALUE;
    let nextPoint = null;

    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        const dist = distance(currentPoint, clients[j]);
        if (dist < minDistance) {
          minDistance = dist;
          nextPoint = clients[j];
        }
      }
    }

    currentPoint = nextPoint;
  }

  return route;
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



