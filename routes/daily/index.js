import Database from '../../database';
import { Router } from 'express';

const router = Router();

router.get('/leaderboard', async (req, res, next) => {
	Database.Scores.getTodayLast10Scores(req.query.type).then((scores) => {
		res.send(new RouterResponse(scores));
	}, next);
});

import scoresRouter from './scores';
router.use('/scores', scoresRouter);

import seedsRouter from './seeds';
import { RouterResponse } from '../utilities';
router.use('/seeds', seedsRouter);

export default router;
