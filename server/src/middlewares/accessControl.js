import { AccessControl } from "accesscontrol";
import { userRole } from "@models";
import { PermissionError } from "@utils";

const accessControl = new AccessControl();

export const initAccessControl = () => {
	accessControl.grant(userRole.CUSTOMER).read("PACKAGE");
	accessControl.grant(userRole.DRIVER).read(["DELIVERY", "PACKAGE"]).update("DELIVERY");
	accessControl.grant(userRole.ADMIN).createAny(["USER", "PACKAGE", "DELIVERY"]).readAny(["USER", "PACKAGE", "DELIVERY"]).updateAny(["USER", "PACKAGE", "DELIVERY"]).deleteAny(["USER", "PACKAGE", "DELIVERY"]);
	return accessControl;
};

export const grantAccess = (action, ressource) => {
	return (req, res, next) => {
		const userRights = initAccessControl();
		const permission = userRights.can(req.user.role)[action](ressource);

		if (!permission.granted) {
			return next(new PermissionError());
		}
		next();
	};
};
