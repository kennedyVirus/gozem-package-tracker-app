import deliveryRouter from "./delivery";
import packageRouter from "./package";
import UserController from "@controllers/UserController";
import { userValidatorHandler } from "@validators";

const MainRouter = (app) => {
	app.use("/api", packageRouter);
	app.use("/api", deliveryRouter);
	app.post("/auth", userValidatorHandler, UserController.login);
	app.get("/", (req, res) => {
		res.status(200).json({
			success: true,
			message: "PACKAGE_TRACKER_API_HOME",
		});
	});
	app.get("*", (req, res) => {
		res.status(404).json({
			success: false,
			error: null,
			message: "ROUTE_NOT_FOUND",
		});
	});
};

export default MainRouter;
