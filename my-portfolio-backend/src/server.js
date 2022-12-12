import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const withDB = async operations => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('react-portfolio-db');

        await operations(db);

        client.close();
    } catch (err) {
        res.status(500).send({ message: 'Database Error', err });
    }
}

app.get('/hello', (req, res) => res.send('Hello!'));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`));

app.get('/api/projects/:name', async (req, res) => {
    const projectName = req.params.name;
    await withDB(async db => {
        const projectInfo = await db.collection('projects').findOne({ name: projectName });
        res.status(200).json(projectInfo);
    });
});
app.post('/api/projects/:name/upvote', async (req, res) => {
    const projectName = req.params.name;

    await withDB(async db => {
        const projectInfo = await db.collection('projects').findOne({ name: projectName });
        await db.collection('projects').updateOne({ name: projectName }, { '$set': {
            upvotes: projectInfo.upvotes + 1,
        }});
        const updatedProjectInfo = await db.collection('projects').findOne({ name: projectName });
        res.status(200).json(updatedProjectInfo);
    });
});
app.post('/api/projects/:name/add-comment', async (req, res) => {
    const projectName = req.params.name;
    const newComment = req.body.comment;

    await withDB(async (db) => {
        const projectInfo = await db.collection('projects').findOne({ name: projectName });
        await db.collection('projects').updateOne({ name: projectName }, { '$set': {
            comments: projectInfo.comments.concat(newComment),
        }});
        const updatedProjectInfo = await db.collection('projects').findOne({ name: projectName });
        res.status(200).json(updatedProjectInfo);
    });
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Server is listening on port 8000'));