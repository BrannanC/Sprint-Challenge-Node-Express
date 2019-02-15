const express = require('express');
const cors = require('cors');

const projectRouter = require('./Project/project-router');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda</h>
  `);
});

module.exports = server;