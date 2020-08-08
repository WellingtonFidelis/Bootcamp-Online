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

router.get('/:id', async (request, response) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileNameJson));
    const account = data.accounts.find(
      (account) => account.id === parseInt(request.params.id)
    );
    // request.params.id
    response.send(account);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileNameJson));
    // console.log(JSON.stringify(data));
    // console.log(data.accounts);
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(request.params.id)
    );
    // console.log(data.accounts);

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));
    // request.params.id
    response.send('<h1>Account deleted!</h1>');
    // response.end();
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

// atualizar o recurso de forma integral
router.put('/', async (request, response) => {
  try {
    const account = request.body;
    const data = JSON.parse(await fs.readFile(global.fileNameJson));

    const index = data.accounts.findIndex(
      (accountIndex) => accountIndex.id === account.id
    );

    data.accounts[index] = account;

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));

    response.send(account);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

// atualização parcial
router.patch('/updateBalance', async (request, response) => {
  try {
    const account = request.body;
    const data = JSON.parse(await fs.readFile(global.fileNameJson));

    const index = data.accounts.findIndex(
      (accountIndex) => accountIndex.id === account.id
    );

    data.accounts[index].balance = account.balance;

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));

    response.send(data.accounts[index]);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

export default router;
