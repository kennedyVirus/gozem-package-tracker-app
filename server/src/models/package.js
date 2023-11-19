import { Schema, model } from "mongoose";

const packageSchema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		description: { type: String },
		weight: { type: Number },
		width: { type: Number },
		height: { type: Number },
		depth: { type: Number },
		activeDelivery: {
			type: String,
			ref: "Delivery",
		},
		fromName: { type: String },
		fromAddress: { type: String },
		fromLocation: {
			lng: {
				type: Number,
			},
			lat: {
				type: Number,
			},
		},
		toName: { type: String },
		toAddress: { type: String },
		toLocation: {
			lng: {
				type: Number,
			},
			lat: {
				type: Number,
			},
		},
	},
	{ timestamps: true }
);

export const Package = model("Package", packageSchema);
