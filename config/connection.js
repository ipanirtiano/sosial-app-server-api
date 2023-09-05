import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize(
  "bjphghark4wx1n9b1doc",
  "ultse26m0tkak3y0",
  "v402qvFs6JU1P1bQaGfL",
  {
    host: "bjphghark4wx1n9b1doc-mysql.services.clever-cloud.com",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default db;
