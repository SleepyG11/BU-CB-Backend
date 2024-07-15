import Database from './database';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '8kb' }));

import dailyRouter from './routes/daily';

app.use('/daily', dailyRouter);

app.use((error, req, res, next) => {
	if (error.cause) console.error(error);
	res.status(error.status).send(error);
});

Database.sequelize.sync().then(() => {
	app.listen(+process.env.APP_PORT, process.env.APP_HOST, () => {
		console.log('Server started');
	});
});
