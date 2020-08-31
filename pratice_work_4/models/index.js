import mongoose from 'mongoose';
import bankApiModel from './bankApiModel.js';

const db = {};
db.url = process.env.MONGO_URL;
db.mongoose = mongoose;
db.bankApi = bankApiModel(mongoose);

export { db };
