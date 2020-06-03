const express = require("express");
const router = express.Router();

const Posts = require("../data/db.js")

// router.get("/", (req, res) => {
//     res.status(200).json("You got it!")
// })

router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        // console.log(posts)
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post.length == 0) {
            res.status(404).json({error: "Post not found!"})
        } else if (post === post) {
            res.status(200).json(post)
            console.log(res.params)
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
        console.log(newComment)
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    Posts.findById(id)
    .then(post => {
        Posts.remove(id)
        .then(() => {
            res.status(200).json(post)
        })
        .catch()
    })
    .catch()

    // let removedPost = {};
    // router.get("/:id", (req, res) => {
    //     Posts.findById(req.params.id)
    //     .then(post => {
    //         removedPost = post;
    //         console.log(removedPost);
    //     })
    // })
    // Posts.remove(req.params.id)
    // .then(post => {
    //     if (post === 0) {
    //         res.status(404).json({message: "The post with the specified ID does not exist."})
    //     } else {
    //         console.log(post)
    //         res.status(200).json(post)
    //     }
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.status(500).json({error: "The post could not be removed"})
    // })
})

router.put("/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(newPost => {
        res.status(200).json(changes)
        if (newPost === 0) {
            console.log(newPost)
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
})



module.exports = router;