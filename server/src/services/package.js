import { Package } from "@models";
import { NotFoundError } from "@utils";

export const createPackage = async (data) => {
	const pack = new Package(data);
	return await pack.save();
};

export const getAllPackage = async (filter = {}) => {
	return await Package.find(filter).populate("activeDelivery").lean();
};

export const getPackageById = async (_id) => {
	const pack = await Package.findOne({ _id: _id }).populate("activeDelivery").lean();
	if (!pack) {
		throw new NotFoundError("INVALID_ID");
	}
	return pack;
};
export const deletePackage = async (_id) => {
	return await Package.findByIdAndDelete(_id);
};

export const updatePackage = async (_id, data) => {
	const pack = await Package.findById(_id);
	if (!pack) {
		throw new NotFoundError("INVALID_ID");
	}
	return await Package.findOneAndUpdate(
		{
			_id: pack._id,
		},
		data,
		{
			new: true,
		}
	);
};

export const getUndeliveredPackages = async () => {
	return await Package.find({ activeDelivery: { $exists: false } });
};
