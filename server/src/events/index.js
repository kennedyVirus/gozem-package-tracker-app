import { updateDelivery, setDeliveryStatus } from "@services";
import { validateBody, locationSchema } from "@validators";
import { deliveryStatus } from "@models";
import { BadRequestError } from "@utils";

export const initEventListener = (io) => {
	io.on("connection", (socket) => {
		console.log(`New client connected`);
		io.emit("test", { message: "Hello" });

		socket.on("location_changed", async (payload) => {
			try {
				const { location, delivery_id } = payload;
				const processValidation = validateBody(location, locationSchema);

				if (!processValidation.isValid) throw new BadRequestError("VALIDATION_ERROR", processValidation.errors);

				const deliveryUpdate = await updateDelivery(delivery_id, { location });
				socket.emit("delivery_updated", deliveryUpdate);
			} catch (error) {
				console.log(error);
				socket.emit("update_error", error.message);
			}

			//TODO:Best way to do this ?
		});

		socket.on("status_changed", async (payload) => {
			try {
				const { status, delivery_id } = payload;
				const acceptedStatus = [deliveryStatus.OPEN, deliveryStatus.PICKED_UP, deliveryStatus.FAILED, deliveryStatus.IN_TRANSIT, deliveryStatus.DELIVERED];

				if (!acceptedStatus.includes(status)) throw new BadRequestError("VALIDATION_ERROR", "Satuts not matched");

				const deliveryUpdate = await setDeliveryStatus(delivery_id, status);
				console.log(deliveryUpdate)
				socket.emit("delivery_updated", deliveryUpdate);
			} catch (error) {
				console.log(error)
				socket.emit("update_error", error.message);
			}
		});
	});
};
