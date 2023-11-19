import express from "express";
import PackageController from "@controllers/PackageController";
import { packageValidationHandler } from "@validators";
import { verifyToken, grantAccess } from "@middlewares";

const packageRouter = express.Router();

packageRouter.get("/package", verifyToken, grantAccess("read", "PACKAGE"), PackageController.getAll);
packageRouter.get("/package/undelivered", verifyToken, grantAccess("read", "PACKAGE"), PackageController.getAllUndelivered);
packageRouter.get("/package/:id", PackageController.getById);
packageRouter.post("/package", verifyToken, grantAccess("create", "PACKAGE"), packageValidationHandler, PackageController.create);
packageRouter.put("/package/:id", verifyToken, grantAccess("update", "PACKAGE"), packageValidationHandler, PackageController.update);
packageRouter.delete("/package/:id", verifyToken, grantAccess("delete", "PACKAGE"), PackageController.delete);

export default packageRouter;
