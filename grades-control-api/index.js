import express from 'express';
import accountsRouter from './routes/routerGrades.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();

global.fileNameJson = 'grades.json';

app.use(express.json());

app.use('/', accountsRouter);

// starting API
// verify in the callback if accounts file exists if not exist, create it.
app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileNameJson);
    console.log('API started! =)');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFile(global.fileNameJson, JSON.stringify(initialJson, null, 2))
      .then(() => {
        console.log('API started and file created! =)');
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
