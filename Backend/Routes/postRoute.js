const express = require("express");

const postRouter = express.Router();

const { postModel } = require("../Models/postModel");
const { auth } = require("../Middleware/auth");


postRouter.use(auth);


// CREATE
postRouter.post("/create", async (req, res) => {
    try {
        const post = new postModel(req.body);
        await post.save();
        res.json({ msg: "New post created", post: req.body });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// READ
postRouter.get("/", async (req, res) => {
    try {
        const posts = await postModel.find({ userID: req.body.userID });
        res.json(posts);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// READ SINGLE
postRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id);
        if (post) {
            res.json(post);
        } else {
            res.json({ msg: "Post not found" });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

// UPDATE
postRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPost = await postModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedPost) {
            res.json({ msg: "Post updated", post: updatedPost });
        } else {
            res.json({ msg: "Post not found" });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

// DELETE
postRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await postModel.findByIdAndDelete(id);
        if (deletedPost) {
            res.json({ msg: "Post deleted", post: deletedPost });
        } else {
            res.json({ msg: "Post not found" });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = {
    postRouter
};
