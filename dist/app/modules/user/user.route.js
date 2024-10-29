"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("./user.controller");
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
// Routes
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.EMPLOYEE), user_controller_1.UserController.getUsers);
router.get('/my-team', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.EMPLOYEE), user_controller_1.UserController.getMyTeam);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.EMPLOYEE, user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.UserController.getSingleUser);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.addUserZodSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.addUser(req, res, next);
}
// validateRequest(UserValidation.addUserZodSchema),
// UserController.addUser
);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    // console.log(req.body);
    req.body = user_validation_1.UserValidation.updateUserZodSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.updateUser(req, res, next);
}
// validateRequest(UserValidation.updateUserZodSchema),
// UserController.updateUser
);
router.post('/delete/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
router.post('/disable-or-activate', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), 
// validateRequest(UserValidation.disableUserZodSchema),
user_controller_1.UserController.disableOrActivateUser);
exports.UserRoutes = router;
