import express from 'express';

const app = express();

app.use((req, res, next) => {
    console.log('first middleware ran');
    next(); 
});

app.get("/", (req, res) => {
    res.send(JSON.{});
});

app.listen(8000, () => {
    console.log('\nServer running at http://localhost:8000\n');
});
