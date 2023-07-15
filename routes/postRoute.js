const express = require('express');
const router = express.Router();
const postData = require('../model/post');
const jwt = require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//view all the posts

router.get('/viewall', async (req, res) => {
  try {
    let data =await postData.find();
    res.json(data);
  }catch(error) {
    res.json(error.message);
  }
});

//code for add post

router.post('/addpost', (req, res) => {
  try {
    console.log(req.body);
    let item = req.body;
    const newPost = postData(item);
    jwt.verify(req.token,"hrz",
    (error,decoded)=>{
      if (decoded && decoded.email) {
        newPost.save();
        res.json({message:"Post added sucessfully"})
      } else {
        res.json({message:"Unauthorised user "})
      }
    })
  } catch (error) {
    res.status(400).json({message:"Unable to add the post"});
  }
});

//delete the post
router.delete("/delete/:id", async (req,res)=>{
  try{
    const postId = req.params.id;
    console.log(postId);
    await postData.findByIdAndDelete(postId);
    console.log("Deleted");
    res.json({message:"Deleted sucessfully"});
  }catch (error) {
    res.status(400).json("Unable to delete");
  }
});

//update the post
router.put("/edit/:id", async (req,res) => {
  try{
    console.log(req.body);
    const postId = req.params.id;
    console.log(postId);

      const updated = await postData.findByIdAndUpdate(postId, req.body);
      res.json({message:"Updated Sucessfully"});
  }catch (error) {
    console.log(error.message);
    res.status(400).json("Unable to update");
  }
});

module.exports = router;

