import db from "../config/connection.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";
import Posts from "./PostModel.js";

const { DataTypes } = Sequelize;

const Likes = db.define(
  "likes",
  {
    postId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

export default Likes;

Posts.hasMany(Likes);
Likes.belongsTo(Posts, { foreignKey: "postId" });

Users.hasMany(Likes);
Likes.belongsTo(Users, { foreignKey: "userId" });
