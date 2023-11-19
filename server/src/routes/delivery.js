import express from "express";
import DeliveryController from "@controllers/DeliveryController";
import { deliveryValidationHandler } from "@validators";
import { verifyToken, grantAccess } from "@middlewares";

const deliveryRouter = express.Router();

deliveryRouter.use(verifyToken);
deliveryRouter.get("/delivery", grantAccess("read", "DELIVERY"), DeliveryController.getAll);
deliveryRouter.get("/delivery/:id", grantAccess("read", "DELIVERY"), DeliveryController.getById);
deliveryRouter.post("/delivery", grantAccess("create", "DELIVERY"), deliveryValidationHandler, DeliveryController.create);
deliveryRouter.put("/delivery/:id", grantAccess("update", "DELIVERY"), deliveryValidationHandler, DeliveryController.update);
deliveryRouter.delete("/delivery/:id", grantAccess("delete", "DELIVERY"), DeliveryController.delete);

export default deliveryRouter;
