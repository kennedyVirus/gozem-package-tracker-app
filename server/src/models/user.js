import { Schema, model } from "mongoose";
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
export const userRole = {
	ADMIN: "ADMIN",
	DRIVER: "DRIVER",
	CUSTOMER: "CUSTOMER",
};
const userSchema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		login: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: [userRole.ADMIN, userRole.CUSTOMER, userRole.DRIVER],
			default: userRole.CUSTOMER,
		},
	},
	{ timestamps: true }
);
//Auto crypt password before save
userSchema.pre("save", async function (next) {
	let user = this;

	if (user.password) {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

//Auto crypt password before update
userSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
	let user = this;

	let password = user._update.password;

	// only hash the password if it has been modified (or is new)
	if (!password) return next();

	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	user._update.password = await bcrypt.hash(password, salt);
	next();
});

export const User = model("User", userSchema);
