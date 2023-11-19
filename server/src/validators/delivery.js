import { deliveryStatus } from "@models";
import { BadRequestError } from "@utils";
import { validateBody } from "./index";

const schema = {
	type: "object",
	properties: {
		package: { type: "string" },
		location: {
			type: "object",
			properties: {
				lng: { type: "number" },
				lat: { type: "number" },
			},
		},
		startTime: { type: "string", format: "date" },
		pickupTime: { type: "string", format: "date" },
		endTime: { type: "string", format: "date" },
		status: { enum: [deliveryStatus.OPEN, deliveryStatus.PICKED_UP, deliveryStatus.FAILED, deliveryStatus.IN_TRANSIT, deliveryStatus.DELIVERED] },
	},
	required: ["package"],
};

export const locationSchema = {
	type: "object",
	properties: {
		lng: { type: "number" },
		lat: { type: "number" },
	},
	required: ["lng", "lat"],
};

export const deliveryValidationHandler = async (req, res, next) => {
	let dataToValidate = req.body;
	let processValidation = validateBody(dataToValidate, schema);
	if (processValidation.isValid) {
		next();
	} else {
		next(new BadRequestError("VALIDATION_ERROR", processValidation.errors));
	}
};
