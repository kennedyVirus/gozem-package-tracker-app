import { logger } from "@utils";

export class AppError extends Error {
	constructor(_message, _errors, _code) {
		super(_message);
		this.errors = _errors;
		this.code = _code;
	}
}

export class AuthError extends AppError {
	constructor(_message) {
		super(_message, {}, 401);
	}
}

export class NotFoundError extends AppError {
	constructor(_message) {
		super(_message, {}, 404);
	}
}

export class PermissionError extends AppError {
	constructor() {
		super("ACCESS_DENIED", {}, 403);
	}
}

export class BadRequestError extends AppError {
	constructor(_message = "BAD_REQUEST", _errors = {}) {
		super(_message, _errors, 400);
	}
}

let ERROR_CODES = {
	BAD_REQUEST: "Bad request",
	ACCESS_DENIED: "Access denied",
	INVALID_ID: "The provided id is not found",
	VALIDATION_ERROR: "VALIDATION_ERROR",
};

export const errorHandler = (err, req, res, _next) => {
	let statusCode = err instanceof AppError ? err.code : 500;
	let message = err instanceof AppError ? ERROR_CODES[err.message] || err.message : "Oops ! An unexpected error occurred.";
	logger.error(`Ip:${req.ip} | path: ${req.url} | ${req.method} | status: ${statusCode} | message : ${message}`);
	return res.status(statusCode).json({
		success: false,
		error: true,
		message: message,
		errors: err?.errors || {},
	});
};

export const validatorErrorFormatter = (errors) => {
	let errorData = {
		requiredFields: {
			message: "",
			fields: [],
		},
		typeError: {
			fields: [],
		},
	};
	errors.forEach(function (error) {
		switch (error.keyword) {
			case "required": {
				// requirement not fulfilled.
				errorData.requiredFields.message = "Missing properties";
				errorData.requiredFields.fields.push(error.params.missingProperty);
				break;
			}
			case "type": {
				let currentTypeErrorFields = errorData.typeError.fields;

				if (currentTypeErrorFields.length > 0) {
					let existingType = currentTypeErrorFields.find((item) => item.type === error.params.type);
					if (existingType) {
						let index = currentTypeErrorFields.findIndex((el) => el === existingType);
						existingType.fields.push(error.instancePath.substring(1));
						errorData.typeError.fields[index] = existingType;
					} else {
						errorData.typeError.fields.push({
							type: error.params.type,
							fields: [error.instancePath.substring(1)],
							message: error.message,
						});
					}
				} else {
					errorData.typeError.fields.push({
						type: error.params.type,
						fields: [error.instancePath.substring(1)],
						message: error.message,
					});
				}

				break;
			}

			default:
				errorData.unknownInput = "Unknown input error. :(";
		}
	});
	return errorData;
};
