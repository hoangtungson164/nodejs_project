var con = require('../db.js');

exports.get = function (req, res, next) {
    var sql = "SELECT * FROM new_table";
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");
        console.log("Success get table");
        res.status(200).json(result);
    });
}

exports.getById = function (req, res, next) {
    var sql = "SELECT * FROM new_table WHERE id = " + req.params.id;
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with get this item.");
        console.log("Success get one object");
        res.status(200).json(result[0]);
    });
}

exports.createNewItem = function (req, res, next) {
    var sql = "INSERT INTO new_table (name, hobby, job, country) VALUES (?)"
    var value = [req.body.name, req.body.hobby, req.body.job, req.body.country] 
    con.query(sql, [value], function (err, result) {
        if (err) return res.status(500).send("There was a problem with create new item.");
        console.log("Success create new row");
        res.status(200).json('Success to create new row');
    });
}

exports.updateItem = function(req, res, next) {
    var sql = "UPDATE new_table SET name = " 
    + "'" + req.body.name + "', hobby = "
    + "'" + req.body.hobby + "', job = "
    + "'" + req.body.job + "', country = "
    + "'" + req.body.country + "'"
    + " WHERE id = " + req.params.id;
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with edit this item.");
        console.log("Success update row");
        res.status(200).json();
    }); 
}

exports.deleteItem = function(req, res, next) {
    var sql = "DELETE FROM new_table WHERE id = " + req.params.id;
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with delete this item.");
        console.log("Success delete row");
        res.status(200).json(result);
    }); 
}
