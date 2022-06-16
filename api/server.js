const express = require('express');
const app = express();
const CommonCrewFacility = require('./facilities').CommonCrewFacility;

require('dotenv').config();

app.use(express.json());
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3030',
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

const redis = require('redis');

let client = null;
if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

  client = redis.createClient({
    url,
  });
  (async function init() {
    console.log('Connecting to Redis');
    await client.connect();
  })();
}

const axios = require('axios');

const OMDB_URL = process.env.OMDB_API.replace(
  '{key}',
  process.env.OMDB_API_KEY
);

app.get('/', async (req, res) => {
  return res.send('hello');
});

// Translate incoming JSON body to OMDB GET request URL
const generateTitleQuery = ({ title, id, page }) => {
  if (!page) {
    page = 1;
  }

  console.log(page);
  if (title) {
    return `${OMDB_URL}&s=${title}&page=${page}`.toLowerCase();
  } else if (id) {
    return `${OMDB_URL}&i=${id}`.toLowerCase();
  } else {
    return null;
  }
};

app.post('/', async (req, res) => {
  const query = generateTitleQuery(req.body).toLowerCase();

  if (query == null) {
    return res.send({
      data: {
        message: 'Title or ID missing.',
      },
    });
  }

  if (client) {
    const cached = await client.get(query);
    if (cached) {
      console.log('Using cache.');
      return res.send({
        data: JSON.parse(cached),
        fromCache: true,
      });
    }
  }

  console.warn('Requesting from OMDB');
  let resp;
  try {
    resp = await axios.get(query);
  } catch (e) {
    console.log('error');
  }

  if (client) {
    await client.set(query, JSON.stringify(resp.data));
  }

  return res.send({
    data: resp.data,
    fromCache: false,
  });
});

const generateCommonCrewQuery = (body) => {
  return [
    generateTitleQuery({
      title: body.film1,
    }),
    generateTitleQuery({
      title: body.film2,
    }),
  ];
};

app.post('/common/crew', async (req, res) => {
  const [query1, query2] = generateCommonCrewQuery(req.body);

  if (query1 == null || query2 == null) {
    return res.send({
      data: {
        message: 'Title or ID missing.',
      },
    });
  }

  if (client) {
    const [cached1, cached2] = [
      await client.get(query1),
      await client.get(query2),
    ];
    if (cached1 && cached2) {
      console.log('Using cache.');

      return res.send({
        data: CommonCrewFacility.getCommonCrew(
          JSON.parse(cached1),
          JSON.parse(cached2)
        ),
        fromCache: true,
      });
    }
  }

  console.warn('Requesting from OMDB');
  const [resp1, resp2] = [await axios.get(query1), await axios.get(query2)];

  if (client) {
    await client.set(query1, JSON.stringify(resp1.data));
    await client.set(query2, JSON.stringify(resp2.data));
  }

  return res.send({
    data: CommonCrewFacility.getCommonCrew(resp1.data, resp2.data),
    fromCache: false,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
