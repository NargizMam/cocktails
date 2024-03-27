import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing. skipping drop ...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['users'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2, user3] = await User.create(
    {
      email: 'misha@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Major',
      avatar: 'fixtures/buster.jpeg',
    },
    {
      email: 'anna@gmail.com',
      password: '0000',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Anna',
      avatar: 'fixtures/siyay.jpeg',
    },
    {
      email: 'nini@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Ninini',
      avatar: 'fixtures/relaps.jpeg',
    },
  );

   await db.close();
};

void run();
