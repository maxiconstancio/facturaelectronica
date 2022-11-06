import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes/index.js'
import { config } from 'dotenv';
config();

//import indexRouter from './apiServices/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), 'public')));

//app.use('/', indexRouter);
app.use(routes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
  });
  
  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
   // res.status(err.status || 500);
    res.status(500).json(err);
  });
  
  export default app;
  