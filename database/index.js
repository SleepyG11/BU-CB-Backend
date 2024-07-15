import { Sequelize } from 'sequelize';
import ScoreModel from './models/Score';
import SeedModel from './models/Seed';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_BASE,
	schema: process.env.DB_SCHEMA ?? 'public',
	logging: false,
});
const Scores = ScoreModel.setup(sequelize);
const Seeds = SeedModel.setup(sequelize);

export default class Database {
	static sequelize = sequelize;
	static s = sequelize;

	static Scores = Scores;
	static Seeds = Seeds;
}
