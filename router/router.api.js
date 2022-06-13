const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const multer=require('multer');
//trying to connect database using expriss js
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "express_kammin"
});

conn.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("connection successfull");
    }
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname +"-kammin" + '-' + Date.now() +'.jpg')
    }
  })
  var upload = multer({ storage: storage })




//insert data to database
router.post("/insert", upload.single('myFile'), (req, res) => {
    const sql = `insert into foods_list(title, price, category, images) value('${req.body.title}',${req.body.price},'${req.body.category}','${req.file.filename}')`;
    conn.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows == 1) {
                res.status(200).json({ "message": "One item added successfull" });
            } else {
                res.status(400).json({ "message": "Unknown error" });
            }
        }
    });
});
//view all data from database
router.get("/items", (req, res) => {
    const sql = "SELECT * FROM foods_list"
    conn.query(sql, (err, result, fields) => {
        if (err) {
            res.status(400).json({ "message": err });
        } else {
            if (result.length >= 1) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ "message": "no such row found.." });
            }
        }
    });
});
//view  data from database id wise
router.get("/items/:id", (req, res) => {
    const sql = "SELECT * FROM foods_list where id="+req.params.id;
    conn.query(sql, (err, result,fields) => {
        if (err) {
            res.status(400).json({ "message": err });
        } else {
            if (result.length >= 1) {
                res.status(200).json(result[0]);
            } else {
                res.status(400).json({ "message": "no such row found.." });
            }
        }
    });
});
//update data from database;
router.put("/update/:id", upload.single('myFile'), (req, res) => {
    const sql = `UPDATE  foods_list set title ='${req.body.title}', price =${req.body.price}, category ='${req.body.category}', images='${req.file.filename}' where id=${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows == 1) {
                res.status(200).json({ "message": "One item update successfull" });
            } else {
                res.status(400).json({ "message": "Unknown error" });
            }
        }
    });
});
//Delete data from database
router.delete("/delete/:id", (req, res) => {
    const sql = "delete from foods_list where id=" + req.params.id;
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ "message": err });
        } else {
            if (results.affectedRows == 1) {
                res.status(200).json({ "message": "One item delete successfull" });
            } else {
                res.status(400).json({ "message": "no such row found.." });
            }
        }
    })

});
//export module
module.exports = router;