const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json("You got it!")
})


const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})