import express from 'express';
import bankApiController from '../controllers/bankApiController.js';

const app = express();

app.post('/create', bankApiController.create);
app.get('/consultAll', bankApiController.findAll);
app.get('/consult/:id', bankApiController.findOne);
app.put('/update/:id', bankApiController.update);
app.delete('/delete/:id', bankApiController.remove);

export { app as bankRouter };
