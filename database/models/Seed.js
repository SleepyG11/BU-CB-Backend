import { Model, DataTypes, Op } from 'sequelize';
import moment from 'moment-timezone';

function generateSeed() {
	let letters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
	let result = '';
	while (result.length < 16) {
		result += letters[Math.floor(Math.random() * letters.length)];
	}
	return result;
}

export default class Seed extends Model {
	static async getTodaySeed() {
		let currentDate = new Date();
		let seed = await this.findOne({
			where: {
				date: currentDate,
			},
		});
		if (seed) return seed;
		let newSeed = await this.create({
			date: currentDate,
			seed: generateSeed(),
		});
		return newSeed;
	}
	static async getLast10Seeds() {
		let targetDate = moment().add(-10, 'd').toDate();
		let seeds = await this.findAll({
			where: {
				date: {
					[Op.gte]: targetDate,
				},
			},
			order: [['date', 'DESC']],
		});
		return seeds;
	}

	static setup(sequelize) {
		return this.init(
			{
				date: {
					primaryKey: true,
					type: DataTypes.DATEONLY,
					allowNull: false,
					defaultValue: DataTypes.NOW,
				},
				seed: {
					type: DataTypes.CHAR(16),
					allowNull: false,
				},
			},
			{
				sequelize,
				createdAt: false,
				updatedAt: false,
				deletedAt: false,
			}
		);
	}
}
