const express = require("express");

const server = express();

//middleware
server.use(express.json());

const postsRouter = require("./posts/posts-router.js");

server.use("/api/posts", postsRouter);


const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})