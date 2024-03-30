import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

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
  const collections = ['users', 'cocktails'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2] = await User.create(
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
  await Cocktail.create(
    {
      title: 'Margarita',
      image: 'fixtures/margarita.jpeg',
      isPublished: true,
      user: user1._id,
      recipe:
        '1. В шейкер положите лед, лимонный сок, текилу и апельсиновый ликер. 2. Встряхните хорошо. 3. Процедите в бокал, наполненный льдом. 4. Украсьте куском лимона или солью по краю бокала.',
      ingredients: [
        { title: 'Лед', amount: '50 г' },
        { title: 'Лимонный сок', amount: '30 мл' },
        { title: 'Текила', amount: '50 мл' },
        { title: 'Апельсиновый ликер', amount: '20 мл' },
        { title: 'Лимон', amount: '1 шт' },
      ],
    },
    {
      title: 'Old Fashioned',
      image: 'fixtures/oldFashioned.jpeg',
      isPublished: false,
      user: user1._id,
      recipe:
        '1. В стакан положите кубик сахара, ангостуру биттер и немного воды. 2. Размешайте до растворения сахара. 3. Добавьте кубики льда и виски. 4. Перемешайте и украсьте цедрой апельсина и вишней.',
      ingredients: [
        { title: 'Кубик сахара', amount: '1 шт' },
        { title: 'Ангостура биттер', amount: '2 капли' },
        { title: 'Вода', amount: '1 чайная ложка' },
        { title: 'Кубики льда', amount: '50 г' },
        { title: 'Виски', amount: '60 мл' },
        { title: 'Цедра апельсина', amount: '1 полоска' },
        { title: 'Вишня', amount: '1 шт' },
      ],
    },
    {
      title: 'Piña Colada',
      image: 'fixtures/pinaColada.jpeg',
      isPublished: true,
      user: user2._id,
      recipe:
        '1. В блендер положите ананасовый сок, кокосовое молоко, ром и лед. 2. Взбейте до получения однородной массы. 3. Вылейте в бокал и украсьте куском ананаса и вишней.',
      ingredients: [
        { title: 'Ананасовый сок', amount: '100 мл' },
        { title: 'Кокосовое молоко', amount: '100 мл' },
        { title: 'Белый ром', amount: '50 мл' },
        { title: 'Лед', amount: '100 г' },
        { title: 'Ананас', amount: '1 кольцо' },
        { title: 'Вишня', amount: '1 шт' },
      ],
    },
    {
      title: 'Negroni',
      image: 'fixtures/Negroni.jpeg',
      isPublished: true,
      user: user1._id,
      recipe:
        '1. В стакан с льдом налейте джин, вермут и красный биттер. 2. Перемешайте. 3. Украсьте кружком апельсина.',
      ingredients: [
        { title: 'Джин', amount: '30 мл' },
        { title: 'Вермут', amount: '30 мл' },
        { title: 'Красный биттер', amount: '30 мл' },
        { title: 'Лед', amount: '50 г' },
        { title: 'Апельсин', amount: '1 кружок' },
      ],
    },
  );

  await db.close();
};

void run();
