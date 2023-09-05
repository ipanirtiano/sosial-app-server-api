import db from "../config/connection.js";
import { Sequelize } from "sequelize";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Posts = db.define(
  "posts",
  {
    desc: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

export default Posts;

Users.hasMany(Posts);
Posts.belongsTo(Users, { foreignKey: "userId" });
