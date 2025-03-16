const express = require("express");
const db = require('../../database/db');

const checkIfLoginExists = (typeOfAuth) => (req, res, next) =>{
    const {login} = req.body;
    db.query('SELECT * FROM users WHERE login = ?', [login], (err, results) =>{
        if(err) return res.status(500).json('Błąd serwera!');
        if(typeOfAuth == 'register'){
            if(results.length) return res.status(401).json('Taki login już istnieje!');
            req.user = results[0];
        }else{
            if(!results.length) return res.status(401).json('Błędny login lub hasło!');
            req.user = results[0];
        }
        next();
    })

}

module.exports = checkIfLoginExists;