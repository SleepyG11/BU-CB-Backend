import { Router } from 'express';
import Database from '../../database';
import { RouterResponse } from '../utilities';

const router = Router();

router.get('/', (req, res, next) => {
	Database.Seeds.getLast10Seeds().then((seeds) => {
		res.send(new RouterResponse(seeds));
	}, next);
});

router.get('/today', (req, res, next) => {
	Database.Seeds.getTodaySeed().then((seed) => {
		res.send(new RouterResponse(seed));
	}, next);
});

export default router;
