const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = 7000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
