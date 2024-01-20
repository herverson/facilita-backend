const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/clients/coordinates', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, x_coordinate, y_coordinate FROM clients');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar coordenadas dos clientes' });
  }
});

app.get('/optimize-route', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, x_coordinate, y_coordinate FROM clients');
    const clients = result.rows;

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
    const result = await pool.query(
      'INSERT INTO clients (name, email, phone, x_coordinate, y_coordinate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, x_coordinate, y_coordinate]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
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

  while (route.length < n) {
    let minDistance = Number.MAX_VALUE;
    let nextPointIndex = -1;

    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        const dist = distance(currentPoint, clients[j]);
        if (dist < minDistance) {
          minDistance = dist;
          nextPointIndex = j;
        }
      }
    }

    if (nextPointIndex !== -1) {
      visited[nextPointIndex] = true;
      route.push(clients[nextPointIndex]);
      currentPoint = clients[nextPointIndex];
    }
  }

  return route;
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
