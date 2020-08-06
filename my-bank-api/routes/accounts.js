import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    // console.log(request.body);
    let account = request.body;
    const data = JSON.parse(await fs.readFile('accounts.json'));

    account = {
      id: data.nextId++,
      ...account,
    };

    // account.id = data.nextId;
    // data.nextId++;

    data.accounts.push(account);

    await fs.writeFile('accounts.json', JSON.stringify(data, null, 2));

    // response.end();
    response.send(account);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

export default router;
