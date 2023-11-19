import { Delivery, Package } from "@models";
import { NotFoundError } from "@utils";
import { deliveryStatus } from "../models";

export const createDelivery = async (data) => {
	const delivery = new Delivery(data);
	await delivery.save();
	await Package.findOneAndUpdate(
		{
			_id: delivery.package,
		},
		{
			activeDelivery: delivery._id,
		},
		{
			new: true,
		}
	);
	return delivery;
};

export const getAllDeliveries = async (filter = {}) => {
	return await Delivery.find(filter).populate("package").lean();
};

export const getDeliveryById = async (_id) => {
	const delivery = await Delivery.findById(_id).populate("package").lean();
	if (!delivery) {
		throw new NotFoundError("INVALID_ID");
	}
	return delivery;
};

export const deleteDelivery = async (_id) => {
	return await Delivery.findByIdAndDelete(_id);
};

export const updateDelivery = async (_id, data) => {
	const delivery = await Delivery.findById(_id);
	if (!delivery) {
		throw new NotFoundError("INVALID_ID");
	}
	return await Delivery.findOneAndUpdate(
		{
			_id: delivery._id,
		},
		data,
		{
			new: true,
		}
	).populate('package');
};

export const setDeliveryStatus = async (_id, status) => {
	const delivery = await Delivery.findById(_id);
	if (!delivery) {
		throw new NotFoundError("INVALID_ID");
	}

	let dataToUpdate = {
		status,
	};
	if (status === deliveryStatus.PICKED_UP) {
		dataToUpdate.pickupTime = Date.now();
	}
	if (status === deliveryStatus.IN_TRANSIT) {
		dataToUpdate.startTime = Date.now();
	}

	if ([deliveryStatus.DELIVERED, deliveryStatus.FAILED].includes(status)) {
		dataToUpdate.endTime = Date.now();
	}

	return await Delivery.findOneAndUpdate(
		{
			_id: delivery._id,
		},
		dataToUpdate,
		{
			new: true,
		}
	);
};
