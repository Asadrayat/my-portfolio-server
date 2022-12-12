const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
// middle wares 
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.8nnhhq6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectCollection = client.db('portfolio').collection('projects');
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const projects = await projectCollection.findOne(query);
            res.send(projects);
        })
    }
    finally {

    }
}

run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send(`My Portfolio Service ${port}`);
})

app.listen(port, () => {
    console.log(`My Portfolio running on ${port}`);
})