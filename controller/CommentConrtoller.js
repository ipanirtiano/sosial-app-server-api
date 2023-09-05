import Comments from "../model/CommentModel.js";
import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

// add comment
export const addComment = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // add post
    try {
      // insert post to table post
      await Comments.create({
        desc: req.body.desc,
        postId: req.body.postId,
        userId: decode.id,
      });
      res.status(201).json({ msg: "Comments created succesfully..." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// get all comment by ID Post
export const getCommentById = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // add post
    try {
      const response = await Comments.findAll({
        where: { postId: req.params.postId },
        include: {
          attributes: ["name", "profile_pic"],
          model: Users,
        },
      });

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};
