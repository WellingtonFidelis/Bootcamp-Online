export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      requerid: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  });

  const accounts = mongoose.model('accounts', schema, 'accounts');
  return accounts;
};
