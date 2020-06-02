const express = require("express");
const router = express.Router();

const Posts = require("../data/db.js")

// router.get("/", (req, res) => {
//     res.status(200).json("You got it!")
// })

router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        console.log(posts)
        res.status(200).json(posts);
    })
})

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            console.log(post)
            res.status(200).json(post)
        } else {
            res.status(404).json({errorMessage: "Post not found Mr. Frodo!"})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the hub',
        });
      });
})

router.get("/:id/comments", (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments => {
        res.status(200).json(comments)
    })
})

router.post("/", (req, res) => {
    Posts.insert(req.body)
    .then(newPost => {
        res.status(200).json(newPost)
    })
})

router.post("/:id/comments", (req, res) => {
    Posts.insertComment(req.body)
    .then(newComment => {
        res.status(200).json(newComment)
    })
})

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
    .then(post => {
        res.status(200).json(post)
    })
})




module.exports = router;