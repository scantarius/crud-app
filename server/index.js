const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'skhizmatika321',
    database: 'crud'
})

/* 
CREATE TABLE crud (
    id int AUTO_INCREMENT,
    fullname varchar(50) NOT NULL,
    pos varchar(50) NOT NULL,
    experience varchar(50) NOT NULL,
    PRIMARY KEY(id)
);
*/

app.post('/create', (req, res) => {
    const fullname = req.body.fullname;
    const pos = req.body.pos;
    const experience = req.body.experience; 

    db.query(
        "INSERT INTO crud (fullname, pos, experience) VALUES (?, ?, ?)",
        [fullname, pos, experience], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/list', (req, res) => {
    if(db.query(
        "SELECT * FROM crud;", (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result)
        }
    }));
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const experience = req.body.experience;

    db.query("UPDATE crud SET experience = ? WHERE id = ?", [experience, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })

})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM crud WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Backend successfully loaded!')
});