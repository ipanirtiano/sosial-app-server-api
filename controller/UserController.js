import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const getUserInfo = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // validate token
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);
    // get user info by ID
    try {
      const response = await Users.findOne({
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "website",
          "profile_pic",
          "cover_pic",
        ],
        where: { id: decode.id },
      });

      if (!response) return res.status(404).json({ msg: "User not found!" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// controller update user profile
export const updateUser = async (req, res) => {
  // validate token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, async (error, decode) => {
    if (error) return res.sendStatus(403);

    try {
      // find user by ID user profile
      const user = await Users.findOne({ where: { id: decode.id } });
      // validate user
      if (!user) return res.status(404).json({ msg: "User not found!" });

      // update user
      const response = await Users.update(
        {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          website: req.body.website,
        },
        { where: { id: user.id } }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};
