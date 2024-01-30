const express = require('express');
const morgan = require('morgan');
const tenderRouter = require('./router/tenderRouter');
const userRouter = require('./router/useRouter');
const app = express();

//MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

//ROUTERS
app.use('/api/v1/tenders', tenderRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
