const express = require("express");
const router = express.Router();

const Posts = require("../data/db.js")

// router.get("/", (req, res) => {
//     res.status(200).json("You got it!")
// })

router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
})


module.exports = router;