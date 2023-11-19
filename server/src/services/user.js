import { User, userRole } from "@models";
import { NotFoundError, AuthError, generateToken } from "@utils";
import randomatic from "randomatic";

const bcrypt = require("bcryptjs");

export const authenticateUser = async ({ login, password }) => {
	const user = await User.findOne({ login }).lean();
	if (!user) throw new NotFoundError("INVALID_LOGIN");

	const validPassword = bcrypt.compareSync(password, user.password);
	if (!validPassword) throw new AuthError("INVALID_CREDENTIALS");

	const { role, _id } = user;
	const token = generateToken({ user: { login, role, _id } });
	return {
		token,
		user: {
			login,
			role,
			_id,
		},
	};
};

export const initUserSeed = async () => {
	let admin = await User.findOne({ login: "track.admin@gozem.com", role: userRole.ADMIN });
	if (!admin) {
		admin = new User({
			_id: randomatic("A", 10),
			login: "track.admin@gozem.com",
			password: "SuperApp@2022**",
			role: userRole.ADMIN,
		});
		await admin.save();
	}

	let driver = await User.findOne({ login: "track.driver@gozem.com", role: userRole.DRIVER });
	if (!driver) {
		driver = new User({
			_id: randomatic("A", 10),
			login: "track.driver@gozem.com",
			password: "DriverApp@2022**",
			role: userRole.DRIVER,
		});
		await driver.save();
	}

	return {
		admin: {
			_id: admin._id,
			role: admin.role,
			login: admin.login,
		},
		driver: {
			_id: driver._id,
			role: driver.role,
			login: driver.login,
		},
	};
};

export const createCustomer = async (data) => {
	let customer = User.findOne(data);

	if (!customer) {
		customer = new User(data);
		await customer.save();
	}

	return customer;
};
