import { createDelivery, getAllDeliveries, getDeliveryById, deleteDelivery, updateDelivery } from "@services";
import randomatic from "randomatic";

export default class DeliveryController {
	static async create(req, res, next) {
		try {
			let body = {
				...req.body,
				_id: `DL-${randomatic("A", 8)}`,
			};
			const delivery = await createDelivery(body);
			return res.status(201).json({
				success: true,
				data: delivery,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const deliveries = await getAllDeliveries(req.query);
			return res.status(200).json({
				success: true,
				data: deliveries,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const delivery = await getDeliveryById(req.params.id);
			return res.status(200).json({
				success: true,
				data: delivery,
			});
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const delivery = await updateDelivery(req.params.id, req.body);
			return res.status(200).json({
				success: true,
				data: delivery,
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const delivery = await deleteDelivery(req.params.id);
			return res.status(200).json({
				success: true,
				data: {
					_id: delivery._id,
					message: "Operation successfull",
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
