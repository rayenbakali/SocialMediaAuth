import mongoose from 'mongoose';
import { DBNAME, __DEV__ } from './default.js';

export default async function mongoConfig() {
	mongoose.Promise = global.Promise;

	mongoose.set('debug', __DEV__);
	mongoose.set('strictQuery', false);

	const c = await mongoose.connect(`mongodb://localhost:27017/${DBNAME}`);

	if (c) {
		console.log(`Connected to ${c.connection.db.databaseName}`);
	} else {
		console.error('Unable to connect to the database');
	}
}
