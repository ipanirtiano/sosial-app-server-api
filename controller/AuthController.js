import Users from "../model/UserModel.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

// controller register
export const register = async (req, res) => {
  // validate email
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) return res.status(500).json({ msg: "Email already taken!" });

  // validate confirm password
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ msg: "Password dont match!" });

  // hash password
  const hashPasswod = await argon.hash(req.body.password);

  // insert data user to table users
  try {
    const response = await Users.create({
      name: req.body.name,
      email: req.body.email,
      phone: "null",
      website: "null",
      profile_pic: "http://localhost:3000/profile/profile.png",
      cover_pic:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
      password: hashPasswod,
    });
    res.status(201).json({ msg: "User created succesfully please login..." });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// controller login
export const login = async (req, res) => {
  // cek email to table users
  const user = await Users.findOne({
    where: { email: req.body.email },
  });
  // validate user email
  if (!user) return res.status(404).json({ msg: "Username not registered!" });

  // validate password
  const match = await argon.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password!" });

  // set json web token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN_KEY);

  // send json web token as cookies
  res
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ token });
};

// get token login
export const getToken = (req, res) => {
  try {
    const token = req.cookies.access_token;
    // validate token
    if (!token)
      return res.status(403).json({ msg: "Dont have a valid token!" });

    // send token as response
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// controller logout
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ msg: "User has been logged out!" });
};
