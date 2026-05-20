const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

// SimpleCRUD
// 2mmvo1vT8PSsqNSh

const uri =
  'mongodb+srv://SimpleCRUD:2mmvo1vT8PSsqNSh@cluster0.wbbieaf.mongodb.net/?appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/', (req, res) => {
  res.send('YES!!! Connected');
});

async function run() {
  //
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create Db and some Collection
    const usersDB = client.db('usersDB');
    const usersCollection = usersDB.collection('users');

    // all api here to the connected DB
    app.get('/users', async (req, res) => {
      console.log('users data', req.body);
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('need user with id', id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('user info ', newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
      console.log('Delete a user from DB');
    });

    app.patch('/users/:id', (req, res) => {
      console.log('');
    });
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
