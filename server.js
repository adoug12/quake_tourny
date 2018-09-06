const express = require('express');
const bodyParser = require('body-parser');

const stats = require('./routes/api/stats');
const tournament = require('./routes/api/tournament');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/stats', stats);
app.use('/api/tournament', tournament);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
