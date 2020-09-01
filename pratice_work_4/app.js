import express from 'express';
import mongodb from 'mongodb';
import { bankRouter } from './routes/appRouter.js';

import { db } from './models/index.js';

// const MongoClient = require('mongodb').MongoClient;
// const uri =
//   'mongodb+srv://root:M1poGAungRgRGQaO@db-test.d2yw0.mongodb.net/bank_account?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect(async (err) => {
//   const collection = client.db('bank_account').collection('accounts');
//   // perform actions on the collection object
//   client.close();
// });
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('Conectado com o mongodb com sucesso');
  } catch (error) {
    console.log('Erro ao conectar no mongodb ' + error);
  }
})();

const app = express();

app.use(express.json());

app.use(bankRouter);

app.listen(process.env.PORT, () => {
  console.log('API em execucao');
});
