import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    // console.log(request.body);
    let account = request.body;
    const data = JSON.parse(await fs.readFile(global.fileNameJson));

    account = {
      id: data.nextId++,
      ...account,
    };

    // account.id = data.nextId;
    // data.nextId++;

    data.accounts.push(account);

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));

    // response.end();
    response.send(account);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

router.get('/', async (request, response) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileNameJson));
    delete data.nextId;
    response.send(data);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

export default router;
