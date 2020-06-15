const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get(`/`, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', data => {
        res.json(data);
    });
});

app.post('/api/notes', (req, res) => {
    const note = req.body;

    fs.readFile('db.json', (err, data )=> {
        if (err) throw err;
        
        const newNoteArray = data;

        newNoteArray.push(note);

        fs.writeFile('./db/db.json', newNoteArray);
    });
})

app.listen(PORT, () => {
    console.log('App listen on PORT ' + PORT);
});