require('dotenv').config();
const express = require("express");

const server = express();

//middleware
server.use(express.json());

const postsRouter = require("./posts/posts-router.js");
// const jokesRouter = require("./jokes/jokes_router.js");

server.use("/api/posts", postsRouter);
// server.use("/api/jokes", jokesRouter);

server.get("/", (req, res) => {
    res.status(200).json({
        port: process.env.PORT,
        environment: process.env.NODE_ENV,
        joke: process.env.FUNNY_JOKE
    })
})


const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})