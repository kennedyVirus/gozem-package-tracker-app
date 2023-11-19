import { createPackage, getAllPackage, getPackageById, deletePackage, updatePackage } from "@services";
import randomatic from "randomatic";
import { getUndeliveredPackages } from "../services/package";

export default class PackageController {
	static async create(req, res, next) {
		try {
			let body = {
				...req.body,
				_id: `PK-${randomatic("A", 6)}`,
			};
			const pack = await createPackage(body);
			return res.status(201).json({
				success: true,
				data: pack,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const packages = await getAllPackage(req.query);
			return res.status(200).json({
				success: true,
				data: packages,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getAllUndelivered(req, res, next) {
		try {
			const packages = await getUndeliveredPackages(req.query);
			return res.status(200).json({
				success: true,
				data: packages,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const pack = await getPackageById(req.params.id);
			return res.status(200).json({
				success: true,
				data: pack,
			});
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const pack = await updatePackage(req.params.id, req.body);
			return res.status(200).json({
				success: true,
				data: pack,
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const pack = await deletePackage(req.params.id);
			return res.status(200).json({
				success: true,
				data: {
					_id: pack._id,
					message: "Operation successfull",
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
