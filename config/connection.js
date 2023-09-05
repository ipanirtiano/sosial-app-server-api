import { Sequelize } from "sequelize";

const db = new Sequelize(
  "bjphghark4wx1n9b1doc",
  "ultse26m0tkak3y0",
  "v402qvFs6JU1P1bQaGfL",
  {
    host: "bjphghark4wx1n9b1doc-mysql.services.clever-cloud.com",
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

export default db;
