const express = require("express");

const checkIfUserAuth  = (req, res, next) =>{
    if(!req.session.user) return res.status(401).json("Nie jesteś zalogowany!");
    next();
}

module.exports = checkIfUserAuth;