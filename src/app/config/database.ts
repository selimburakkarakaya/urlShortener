import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME as string,
    process.env.MYSQL_DB_USER as string,
    process.env.MYSQL_DB_PASSWORD as string,
    {
        host: process.env.MYSQL_DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

export default sequelize;
