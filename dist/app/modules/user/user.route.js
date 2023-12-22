"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("./user.controller");
const express_1 = __importDefault(require("express"));
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// Routes
router.get('/', user_controller_1.UserController.getUsers);
router.get('/:id', user_controller_1.UserController.getSingleUser);
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidation.addUserZodSchema), user_controller_1.UserController.addUser);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateUser);
router.delete('/:id', user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
