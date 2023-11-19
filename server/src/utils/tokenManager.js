import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (payload, expires = "2 days") => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: expires,
	});
};

export const decodeToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};
