import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Url extends Model {
  id!: number;
  originalUrl!: string;
  shortUrl!: string;
  description!: string;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Url',
    tableName: 'Urls',
    timestamps: false,
  }
);

export default Url;
