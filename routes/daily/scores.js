import { Router } from 'express';
import jsonSchema from 'jsonschema';

import SubmitScoreSchema from '../../schemas/SubmitScore';
import UpdateScoreSchema from '../../schemas/UpdateScore';
import Database from '../../database';
import { RouterError, RouterResponse } from '../utilities';

const router = Router();

router.post('/', (req, res, next) => {
	let validateResult = jsonSchema.validate(req.body, SubmitScoreSchema, {
		throwAll: false,
	});
	if (validateResult.valid) {
		Database.Scores.submitScore(req.body).then((score) => {
			res.send(new RouterResponse(score.uniqueHash));
		}, next);
	} else {
		next(new RouterError(validateResult.errors.shift().message, { status: 400, statusText: 'Bad Request' }));
	}
});
router.patch('/:scoreUniqueHash', (req, res, next) => {
	let validateResult = jsonSchema.validate(req.body, UpdateScoreSchema, {
		throwAll: false,
	});
	if (validateResult.valid) {
		Database.Scores.updateScore(req.params.scoreUniqueHash, req.body).then((score) => {
			res.send(new RouterResponse(score.uniqueHash));
		}, next);
	} else {
		next(new RouterError(validateResult.errors.shift().message, { status: 400, statusText: 'Bad Request' }));
	}
});

export default router;
