import Posts from "../model/PostModel.js";
import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

// create post
export const addPost = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // add post
    try {
      // insert post to table post
      await Posts.create({
        desc: req.body.desc,
        img: req.body.img,
        userId: decode.id,
      });
      res.status(201).json({ msg: "Post created succesfully..." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// get all post
export const getAllPost = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // get all post
    try {
      const response = await Posts.findAll({
        order: [["id", "DESC"]],
        include: { attributes: ["name", "profile_pic"], model: Users },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// get post by ID
export const getPostById = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // get post info by ID
    const response = await Posts.findAll({
      where: {
        userId: decode.id,
      },
      order: [["id", "DESC"]],
      include: { attributes: ["name", "profile_pic"], model: Users },
    });
    res.status(200).json(response);
    try {
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};
