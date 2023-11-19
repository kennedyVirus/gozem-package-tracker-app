import "dotenv/config";
import mongoose from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
const { plugin, connect } = mongoose;
const host = process.env.NODE_ENV === "production" ? process.env.MONGO_URI : process.env.MONGO_URI_TEST;

plugin(mongooseAutopopulate);

export const initDb = () => {
	return connect(host, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

export const clearDb = async () => {
	await mongoose.connection.db.dropDatabase();
};

export const clearCollection = async (collection) => {
	const collections = await mongoose.connection.db.listCollections().toArray();
	collections.forEach(async (element) => {
		if (element.name === collection) {
			await mongoose.connection.db.dropCollection(collection);
		}
	});
};

export const createCollection = async (collection) => {
	await clearCollection(collection);
	await mongoose.connection.db.createCollection(collection);
};
