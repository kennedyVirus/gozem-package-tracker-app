import Ajv from "ajv";
import addFormats from "ajv-formats";
import { validatorErrorFormatter } from "@utils";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateBody = (data, schema) => {
	const validate = ajv.compile(schema);
	const valid = validate(data);

	if (!valid) {
		const formattedErrors = validatorErrorFormatter(validate.errors);
		return {
			isValid: false,
			errors: formattedErrors,
		};
	}
	return {
		isValid: true,
	};
};

export * from "./delivery";
export * from "./package";
export * from './user'