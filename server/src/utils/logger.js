import winston from "winston";
import path from "path";

// Define your severity levels.
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = process.env.NODE_ENV === "production" ? "debug" : "warn";

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf((info) => `${info.timestamp} | ${info.level} : ${info.message} `)
);

const transports = [
	// Allow the use the console to print the messages
	new winston.transports.Console(),
	// Allow to print all the error level messages inside the error.log file
	new winston.transports.File({
		filename: path.resolve(__dirname, "../logs/error.log"),
		level: "error",
	}),
	// Allow to print all the error message inside the all.log file
	// (also the error log that are also printed inside the error.log(
	new winston.transports.File({ filename: path.resolve(__dirname, "../logs/server.log") }),
];

export const logger = winston.createLogger({
	level,
	levels,
	format,
	transports,
});
