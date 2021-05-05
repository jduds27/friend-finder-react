import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'mongodb';
import cors from 'cors'

const { MongoClient } = pkg;
const app = express();
app.use(cors(), bodyParser.urlencoded({ extended: true }));

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db =  client.db('friend-finder');

    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
};

app.get('/iceCream-lover/:id', async (req, res) => {
  withDB(async (db) => {
    let id = req.params.id;
    await db
      .collection('ice_cream_lovers')
      .findOne({ id: Number(id) }, (err, result) => {
        if (err)  throw err
        console.log('result :>> ', result);
        res.status(200).json(result.name)
      });
  }, res);
});

app.get('/iceCream', (req, res) => {
  res.json({
    iceCream: [
      {
        id: 1,
        flavor: 'Vanilla',
        ice_cream_lover_id: 1,
      },
      {
        id: 2,
        flavor: 'Chocolate',
        ice_cream_lover_id: 2,
      },
      {
        id: 3,
        flavor: 'Strawberry',
        ice_cream_lover_id: 3,
      },
      {
        id: 4,
        flavor: 'Mint',
        ice_cream_lover_id: 4,
      },
      {
        id: 5,
        flavor: 'Cookie Dough',
        ice_cream_lover_id: 5,
      },
    ],
  });
});

app.listen(8000, () => {
  console.log('listening on 8000');
});
