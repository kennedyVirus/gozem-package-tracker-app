import { BadRequestError } from "@utils";
import { validateBody } from "./index";

const schema = {
	type: "object",
	properties: {
		description: { type: "string" },
		weight: { type: "number" },
		width: { type: "number" },
		height: { type: "number" },
		depth: { type: "number" },
		activeDelivery: { type: "string" },
		fromName: { type: "string" },
		fromAddress: { type: "string" },
		toName: { type: "string" },
		toAddress: { type: "string" },
		fromLocation: {
			type: "object",
			properties: {
				lng: { type: "number" },
				lat: { type: "number" },
			},
		},
		toLocation: {
			type: "object",
			properties: {
				lng: { type: "number" },
				lat: { type: "number" },
			},
		},
	},
	required: ["weight", "width", "height", "depth", "fromName", "fromAddress", "fromLocation", "toLocation", "toName", "toAddress"],
};

export const packageValidationHandler = async (req, res, next) => {
	let dataToValidate = req.body;
	let processValidation = validateBody(dataToValidate, schema);
	if (processValidation.isValid) {
		next();
	} else {
		next(new BadRequestError("VALIDATION_ERROR",processValidation.errors));
	}
};
