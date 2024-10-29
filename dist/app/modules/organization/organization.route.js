"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const organization_controller_1 = require("./organization.controller");
// import validateRequest from '../../middlewares/validateRequest';
const organization_validation_1 = require("./organization.validation");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// Routes
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), organization_controller_1.OrganizationController.getOrganizations);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), organization_controller_1.OrganizationController.getSingleOrganization);
router.patch('/organizationConfig/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), organization_controller_1.OrganizationController.organizationConfig);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    req.body = organization_validation_1.OrganizationValidation.addOrganizationZodSchema.parse(JSON.parse(req.body.data));
    return organization_controller_1.OrganizationController.addOrganization(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    req.body = organization_validation_1.OrganizationValidation.updateOrganizationZodSchema.parse(JSON.parse(req.body.data));
    return organization_controller_1.OrganizationController.updateOrganization(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), organization_controller_1.OrganizationController.deleteOrganization);
exports.OrganizationRoutes = router;
