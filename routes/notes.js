const express = require("express");
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('all notes');
})

router.post('/create', (req, res) =>{
    res.send('create note');
})

router.put('/update/:id', (req, res) =>{
    const id = req.params.id;
    res.send(`update note id: ${id}`);
})

router.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    res.send(`delete note id: ${id}`);
})

module.exports = router;