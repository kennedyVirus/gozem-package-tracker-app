import { Schema, model } from "mongoose";
export const deliveryStatus = {
	OPEN: "OPEN",
	PICKED_UP: "PICKED-UP",
	IN_TRANSIT: "IN-TRANSIT",
	DELIVERED: "DELIVERED",
	FAILED: "FAILED",
};
const deliverySchema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		package: {
			type: String,
			ref: "Package",
		},
		location: {
			lng: {
				type: Number,
			},
			lat: {
				type: Number,
			},
		},
		startTime: {
			type: Date,
		},
		pickupTime: {
			type: Date,
		},
		endTime: {
			type: Date,
		},
		status: {
			type: String,
			required: true,
			enum: [deliveryStatus.OPEN, deliveryStatus.PICKED_UP, deliveryStatus.FAILED, deliveryStatus.IN_TRANSIT, deliveryStatus.DELIVERED],
			default: deliveryStatus.OPEN,
		},
	},
	{ timestamps: true }
);

export const Delivery = model("Delivery", deliverySchema);
