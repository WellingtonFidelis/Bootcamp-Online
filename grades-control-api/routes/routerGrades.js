import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.get('/consult', async (request, response) => {
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

router.post('/create', async (request, response) => {
  try {
    // console.log(request.body);
    let grade = request.body;
    const data = JSON.parse(await fs.readFile(global.fileNameJson));

    grade = {
      id: data.nextId++,
      ...grade,
      timestamp: new Date(),
    };

    // grade.id = data.nextId;
    // data.nextId++;

    data.grades.push(grade);

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));

    // response.end();
    response.send(grade);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});
// atualizar o recurso de forma integral
router.put('/update', async (request, response) => {
  try {
    const grade = request.body;
    const data = JSON.parse(await fs.readFile(global.fileNameJson));

    const index = data.grades.findIndex(
      (gradeIndex) => gradeIndex.id === grade.id
    );

    data.grades[index] = grade;

    await fs.writeFile(global.fileNameJson, JSON.stringify(data, null, 2));

    response.send(grade);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});

router.delete('/delete/:id', async (request, response) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileNameJson));
    // console.log(JSON.stringify(data));
    // console.log(data.accounts);
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(request.params.id)
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

router.get('/consult/:id', async (request, response) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileNameJson));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(request.params.id)
    );
    // request.params.id
    response.send(grade);
  } catch (error) {
    response.status(400).send({
      error: error.message,
    });
  }
});
export default router;
