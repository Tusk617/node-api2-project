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
        if (post.length == 0) {
            res.status(404).json({error: "Post not found!"})
        } else if (post === post) {
            res.status(200).json(post)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Error retrieving the hub'});
      });
})

router.get("/:id/comments", (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments => {
        if (comments.length === 0) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else res.status(200).json(comments)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

router.post("/", (req, res) => {
    Posts.insert(req.body)
    .then(newPost => {
        res.status(200).json(newPost)
        if (!newPost.title || !newPost.contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        } else res.status(201).status(newPost)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the hub',
        });
      });
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

router.put("/:id", (req, res) => {
    // let banana = "";
    Posts.update(req.params.id, req.body)
    .then(newPost => {
        res.status(200).json(newPost)
    })
})



module.exports = router;