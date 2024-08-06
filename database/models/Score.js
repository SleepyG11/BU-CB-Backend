import { Model, DataTypes, Op } from 'sequelize';
import crypto from 'node:crypto';
import { RouterError } from '../../routes/utilities';

const NANEINF_FIELDS = ['nonEndlessScore', 'endlessScore', 'oneHourScore'];

function insertInfinityInScore(score) {
	NANEINF_FIELDS.forEach((field) => {
		if (score[field] === -1) score[field] = Infinity;
	});
	return score;
}

function insertNaneinfInScore(score) {
	NANEINF_FIELDS.forEach((field) => {
		if (score[field] === Infinity) score[field] = 'naneinf';
	});
	return score;
}

const LEADERBOARDS = {
	fastestTimeNonEndless: {
		order: [
			['nonEndlessTime', 'ASC'],
			['createdAt', 'ASC'],
		],
		filter: { nonEndlessTime: { [Op.not]: null }, nonEndlessScore: { [Op.not]: null } },
		attributes: ['userId', 'username', 'updatedAt', 'nonEndlessTime'],
	},
	highestScoreNonEndless: {
		order: [
			['nonEndlessScore', 'DESC'],
			['createdAt', 'ASC'],
		],
		filter: { nonEndlessTime: { [Op.not]: null }, nonEndlessScore: { [Op.not]: null } },
		attributes: ['userId', 'username', 'updatedAt', 'nonEndlessScore'],
	},
	highestScoreOneHour: {
		order: [
			['oneHourScore', 'DESC'],
			['createdAt', 'ASC'],
		],
		filter: { oneHourScore: { [Op.not]: null } },
		attributes: ['userId', 'username', 'updatedAt', 'oneHourScore'],
	},
};

export default class Score extends Model {
	static async getTodayLast10Scores(leaderboard) {
		let requestDate = new Date();
		let leaderboardData = LEADERBOARDS[leaderboard];
		if (!leaderboardData) throw new RouterError('Invalid leaderboard type', { status: 400, statusText: 'Bad Request' });
		let scores = await this.findAll({
			where: {
				date: requestDate,
				...leaderboardData.filter,
			},
			limit: 10,
			order: leaderboardData.order,
			attributes: leaderboardData.attributes,
		}).catch((e) => {
			throw new RouterError('Cannot get leaderboard: Database error', { cause: e });
		});
		return scores.map(insertNaneinfInScore);
	}
	static async getLast10Scores(leaderboard) {
		let leaderboardData = LEADERBOARDS[leaderboard];
		if (!leaderboardData) throw new RouterError('Invalid leaderboard type', { status: 400, statusText: 'Bad Request' });
		let scores = await this.findAll({
			where: {
				...leaderboardData.filter,
			},
			limit: 10,
			order: leaderboardData.order,
			attributes: leaderboardData.attributes,
		}).catch((e) => {
			throw new RouterError('Cannot get leaderboard: Database error', { cause: e });
		});
		return scores.map(insertNaneinfInScore);
	}
	static async submitScore(data) {
		let requestDate = new Date();
		let score = await this.create(
			{
				...insertInfinityInScore(data),
				createdAt: requestDate,
				date: requestDate,
				uniqueHash: crypto.randomUUID() + requestDate.valueOf(),
			},
			{
				returning: ['uniqueHash'],
			}
		).catch((e) => {
			throw new RouterError('Cannot submit score: Database error', { cause: e });
		});
		return score;
	}
	static async updateScore(hash, data) {
		let requestDate = new Date();

		let score = await this.findOne({
			where: {
				uniqueHash: hash,
			},
		}).catch((e) => {
			throw new RouterError('Cannot update score: Database error', { cause: e });
		});
		if (!score) throw new RouterError('Score not found', { status: 400, statusText: 'Bad Request' });
		let updatedScore = await score
			.update(
				{
					...insertInfinityInScore(data),
					updatedAt: requestDate,
				},
				{
					returning: ['uniqueHash'],
				}
			)
			.catch((e) => {
				throw new RouterError('Cannot update score: Database error', { cause: e });
			});
		return updatedScore;
	}

	static setup(sequelize) {
		return this.init(
			{
				id: {
					type: DataTypes.BIGINT,
					autoIncrement: true,
					primaryKey: true,
				},
				uniqueHash: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				userId: {
					type: DataTypes.BIGINT,
					allowNull: false,
				},
				username: {
					type: DataTypes.STRING(256),
					allowNull: true,
				},
				nonEndlessScore: {
					type: DataTypes.DOUBLE,
					allowNull: true,
				},
				endlessScore: {
					type: DataTypes.DOUBLE,
					allowNull: true,
				},
				oneHourScore: {
					type: DataTypes.DOUBLE,
					allowNull: true,
				},
				nonEndlessTime: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				endlessTime: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				startsFromEndless: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false,
				},
				gameVersion: {
					type: DataTypes.STRING(32),
					allowNull: false,
				},
				modVersion: {
					type: DataTypes.STRING(32),
					allowNull: false,
				},
				date: {
					type: DataTypes.DATEONLY,
					allowNull: false,
					defaultValue: DataTypes.NOW,
				},
			},
			{
				sequelize,
			}
		);
	}
}
