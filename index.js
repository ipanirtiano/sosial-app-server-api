import express from "express";
import db from "./config/connection.js";
import dotenv from "dotenv";
import AuthRouter from "./routes/AuthRoutes.js";
import UserRouter from "./routes/UserRouter.js";
import PostRouter from "./routes/PostRoutes.js";
import CommentRouter from "./routes/CommentRoutes.js";
import LikeRouter from "./routes/LikesRoutes.js";
import Comments from "./model/CommentModel.js";
import Likes from "./model/LikeModel.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
dotenv.config();

try {
  await db.authenticate();
  console.log("Database connected...");
  //   await Users.sync();
  //   await Posts.sync();
  // await Comments.sync();
  // await Likes.sync();
} catch (error) {}

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
    origin: "https://sosial-app-client.vercel.app",
  })
);

// set multer diskStoreage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
// upload route
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(cookieParser());
app.use(express.json());
app.use(AuthRouter);
app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter);
app.use(LikeRouter);
app.use("/profile", express.static("public/profile"));
app.use("/upload", express.static("public/upload"));

app.listen(3000, () => console.log("Server run at port 3000..."));
