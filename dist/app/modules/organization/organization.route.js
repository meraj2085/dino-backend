"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const organization_controller_1 = require("./organization.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const organization_validation_1 = require("./organization.validation");
const router = express_1.default.Router();
// Routes
router.get('/', organization_controller_1.OrganizationController.getOrganizations);
router.get('/:id', organization_controller_1.OrganizationController.getSingleOrganization);
router.post('/', (0, validateRequest_1.default)(organization_validation_1.OrganizationValidation.addOrganizationZodSchema), organization_controller_1.OrganizationController.addOrganization);
router.patch('/:id', (0, validateRequest_1.default)(organization_validation_1.OrganizationValidation.updateOrganizationZodSchema), organization_controller_1.OrganizationController.updateOrganization);
router.delete('/:id', organization_controller_1.OrganizationController.deleteOrganization);
exports.OrganizationRoutes = router;
