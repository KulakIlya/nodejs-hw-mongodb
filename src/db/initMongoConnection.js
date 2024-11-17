import mongoose from 'mongoose';
import env from '../utils/env.js';

const initMongoConnection = () => {
  const username = env('MONGODB_USER');
  const password = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const db = env('MONGODB_DB');

  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log('Mongo connection successfully established!'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

export default initMongoConnection;
