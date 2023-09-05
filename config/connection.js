import { Sequelize } from "sequelize";

const db = new Sequelize("sosial_app_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
