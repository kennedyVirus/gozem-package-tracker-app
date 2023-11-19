import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { initDb } from "@config";
import { errorHandler, logger } from "@utils";
import compression from "compression";
import { initUserSeed } from "@services";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import methodOverride from "method-override";
import xss from "xss-clean";
import MainRouter from "@routes";
import { createServer } from "http";
import { initEventListener } from "./events";
import cors from 'cors'
const socket = require('socket.io')

const app = express();
const port = process.env.PORT || 4000;
const stream = {
	write: (message) => logger.http(message),
};
const skip = () => {
	const env = process.env.NODE_ENV || "development";
	return env !== "production";
};
const morganMiddleware = morgan(":remote-addr | :method  :url :status :res[content-length] - :response-time ms", { stream, skip });

/**App usage config */
app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");
	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization,Accept");

	next();
});
app.use(bodyParser.json());
app.use(compression());
app.use(morganMiddleware);
app.use(cors())
const server = createServer(app);
const io = socket(server);
initEventListener(io);


MainRouter(app);


initDb()
	.then(async (_result) => {
		await initUserSeed();
		server.listen(port, () => {
			console.log(`NODE_ENV=${process.env.NODE_ENV}`);
			console.log(`app is listening to port ${port} 🔥`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
app.use(errorHandler);
