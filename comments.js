// Create we server
// 1. Import express
const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');
const bodyParser = require('body-parser');

// 2. Create a server
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 3. Create a router
// 3.1 Create a new comment
router.post('/new', (req, res) => {
    const { name, content, time } = req.body;
    const newComment = new Comments({ name, content, time });
    newComment.save()
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// 3.2 Get all comments
router.get('/all', (req, res) => {
    Comments.find()
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// 3.3 Get a comment by id
router.get('/:id', (req, res) => {
    Comments.findById(req.params.id)
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// 3.4 Update a comment
router.put('/:id', (req, res) => {
    Comments.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({ message: 'Comment updated' });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// 3.5 Delete a comment
router.delete('/:id', (req, res) => {
    Comments.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Comment deleted' });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// 4. Export router
module.exports = router;