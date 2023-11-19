import { decodeToken, AppError } from "@utils";

export const verifyToken = (req, res, next) => {
	const header = req.query.token || req.headers["authorization"];
	if (!header) return next(new AppError("MISSING_TOKEN", {}, 401));

	const token = header.replace("Bearer ", "");
	const decoded = decodeToken(token);
	req.user = decoded.user;
	next();
};
