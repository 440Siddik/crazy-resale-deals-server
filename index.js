const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9ef9oj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client
      .db("crazy-resale-deals")
      .collection("categories");
    const productsCollection = client
      .db("crazy-resale-deals")
      .collection("products");
    const usersCollection = client.db("crazy-resale-deals").collection("users");
    const bookingsCollection = client.db("crazy-resale-deals").collection("bookings");
    // categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/categories/:id", async (req, res) => {
      const categoryId = req.params.id;
      const query = { categoryId: ObjectId(categoryId) };
      const products = await productsCollection.find(query).toArray();
      res.send(products);
    });
// bookings 
app.get('/bookings', async(req, res) => {
  const email = req.query.email;
  const query = {email:email}
  const bookings = await bookingsCollection.find(query).toArray()
  res.send(bookings)
})
app.post('/bookings', async (req, res) => {
  const booking = req.body;
  console.log(booking)
  const result = await bookingsCollection.insertOne(booking)
  res.send(result)
})
    //users
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })
  } finally {
  }
}
run().catch(console.log());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Crazy resale deals server running");
});

app.listen(port, () => {
  console.log(`Crazy resale deals server running on port ${port}`);
});
