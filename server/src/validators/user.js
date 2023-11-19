import { BadRequestError } from "@utils";
import { validateBody } from "./index";

const schema = {
	type: "object",
	properties: {
		login: { type: "string" },

		password: { type: "string" },
	},
	required: ["login", "password"],
};

export const userValidatorHandler = async (req, res, next) => {
	let dataToValidate = req.body;
	let processValidation = validateBody(dataToValidate, schema);
	if (processValidation.isValid) {
		next();
	} else {
		next(new BadRequestError("VALIDATION_ERROR", processValidation.errors));
	}
};
