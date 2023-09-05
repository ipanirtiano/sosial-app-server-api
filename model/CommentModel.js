import db from "../config/connection.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";
import Posts from "./PostModel.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    desc: {
      type: DataTypes.STRING,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

export default Comments;

Posts.hasMany(Comments);
Comments.belongsTo(Posts, { foreignKey: "postId" });

Users.hasMany(Comments);
Comments.belongsTo(Users, { foreignKey: "userId" });
