"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const address_controller_1 = require("./address.controller");
const router = express_1.default.Router();
// Routes
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.HR, user_1.ENUM_USER_ROLE.EMPLOYEE), address_controller_1.AddressController.getAllAddress);
exports.AddressRoutes = router;
