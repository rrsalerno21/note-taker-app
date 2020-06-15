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
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    
    console.log(note);

    fs.readFile('db/db.json', function(err, data) {
        if (err) throw err;
        let existArray = JSON.parse(data);

        console.log(existArray);
        existArray.push(note);
        console.log('New array:')
        console.log(existArray);

        fs.writeFile('db/db.json', JSON.stringify(existArray), err => {
            if (err) throw err;
            console.log('File writing success');
        });
    })


    // return the new note
    res.json(note);
    
})

app.listen(PORT, () => {
    console.log('App listen on PORT ' + PORT);
});