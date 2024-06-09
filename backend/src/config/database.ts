import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const databaseUrl = process.env.DATABASE_URL || "";
const sequelize = new Sequelize(databaseUrl, {
  host: "localhost",
  logging: false,
  dialect: "postgres", 
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
export default sequelize;
testConnection();
