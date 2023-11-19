import { authenticateUser } from "@services";

export default class UserController {
    static async login(req, res, next) {
        try {
            const user = await authenticateUser(req.body);
            return res.status(201).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
}