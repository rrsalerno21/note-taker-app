const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get(`*`, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', data => {
        res.json(data);
    });
});

app.listen(PORT, () => {
    console.log('App listen on PORT ' + PORT);
});