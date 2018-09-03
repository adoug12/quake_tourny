const express = require('express');

const stats = require('./routes/api/stats');
const tournaments = require('./routes/api/tournaments');

const app = express();

app.use('/api/stats', stats);
app.use('/api/tournaments', tournaments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
