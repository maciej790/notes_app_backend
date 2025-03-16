const express = require("express");
const router = express.Router();
const checkIfLoginExists = require('../middlewares/auth/checkIfLoginExists');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const session = require("express-session");

router.post('/login', checkIfLoginExists('login'), async (req, res) =>{
    const hashedPassword = req.user.password;
    const passwordFromUser = req.body.password;
    const isPasswordMatch = await bcrypt.compare(passwordFromUser, hashedPassword);
    if(!isPasswordMatch) return res.status(401).json('Błędny login lub hasło!');
    req.session.user = req.body;
    return res.status(200).json(`Zalogowano jako ${req.session.user.login}`)
})

router.post('/register', checkIfLoginExists('register'), async (req, res) =>{
    const {login, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO `users`(`login`, `password`) VALUES (?,?)", [login, hashedPassword], (err, results) =>{
        if (err) return res.status(500).json('Błąd serwera');
        req.session.user = req.body;
        res.status(200).json('Zarejestrowano pomyślnie!');
    })
})

router.post('/logout', (req, res) =>{
    req.session.destroy((err) =>{
        if(err) res.status(500).send("Błąd serwera!");
        return res.status(200).send("Wylogowano!");
    })
})

module.exports = router;