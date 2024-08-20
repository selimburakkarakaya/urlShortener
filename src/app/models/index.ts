import sequelize from "../config/database";
import Url from "./urlModel";

const db = {
  sequelize,
  Url,
};

export default db;
