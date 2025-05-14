const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/apiRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});