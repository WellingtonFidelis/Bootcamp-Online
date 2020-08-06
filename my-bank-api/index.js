import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

// starting API
// verify in the callback if accounts file exists if not exist, create it.
app.listen(3000, async () => {
  try {
    await fs.readFile('accounts.json');
    console.log('API started! =)');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFile('accounts.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API started and file created! =)');
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
