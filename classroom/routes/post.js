const express = require("express");
const router = express.Router();

//Posts
//Index
router.get("/", (req, res) => {
    res.send("GET for posts");
  });
  
  //Show
  router.get("/:id", (req, res) => {
    res.send("GET for show posts");
  });
  
  //POST
  router.post("/", (req, res) => {
      res.send("POST for posts");
  });
  
  //Delete
  router.delete("/:id", (req, res) => {
    res.send("DELETE for post id");
  });

  module.exports = router;