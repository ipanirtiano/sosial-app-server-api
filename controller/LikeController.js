import Likes from "../model/LikeModel.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

// send like
export const addLike = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // add Like
    try {
      // insert Like to table Like
      await Likes.create({
        postId: req.body.postId,
        userId: decode.id,
      });
      res.status(201).json({ msg: "Liked..." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// get all like by ID Post
export const getLike = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // get Likes by ID Post
    try {
      const response = await Likes.findAll({
        where: { postId: req.params.postId },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// delete liked
export const deleteLike = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // Delete Likes by ID
    try {
      const response = await Likes.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ msg: "Like Deleted" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};
