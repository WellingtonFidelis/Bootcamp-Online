import { db } from '../models/index.js';

const BankApi = db.bankApi;
// create one document
const create = async (request, response) => {
  const account = new BankApi({
    agencia: request.body.agencia,
    conta: request.body.conta,
    name: request.body.name,
    balance: request.body.balance,
  });
  try {
    const data = await account.save();
    response.send(data);
  } catch (error) {
    response.status(500).send('Erro ao salvar ' + error);
  }
};
// search all documents
const findAll = async (request, response) => {
  try {
    const data = await BankApi.find();
    if (!data) {
      response.status(404).send('Nada encontrado!');
    } else {
      response.send(data);
    }
  } catch (error) {
    response.status(500).send('Erro ao buscar todos os documentos ' + error);
  }
};
// search only one document
const findOne = async (request, response) => {
  const id = request.params.id;
  try {
    const data = await BankApi.findById({ _id: id });
    if (!data) {
      response.status(404).send('Não encontrado a conta id: ' + id);
    } else {
      response.send(data);
    }
  } catch (error) {
    response
      .status(500)
      .send('Erro ao buscar o documento id: ' + id + 'erro ' + error);
  }
};
// update one document
const update = async (request, response) => {
  const id = request.params.id;
  try {
    const data = await BankApi.findByIdAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    if (!data) {
      response.status(404).send('Não encontrado a conta id: ' + id);
    } else {
      response.send(data);
    }
  } catch (error) {
    response
      .status(500)
      .send('Erro ao atualizar o documento id: ' + id + 'erro ' + error);
  }
};
// remove one document
const remove = async (request, response) => {
  const id = request.params.id;

  try {
    const data = await BankApi.findByIdAndRemove({ _id: id });
    if (!data) {
      response.status(404).send('Não encontrado a conta id: ' + id);
    } else {
      response.send('Conta exclída com sucesso.');
    }
  } catch (erro) {}
};

export default { create, findAll, findOne, update, remove };
