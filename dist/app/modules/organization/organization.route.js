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
const router = express_1.default.Router();
// Routes
router.get('/', organization_controller_1.OrganizationController.getOrganizations);
router.get('/:id', organization_controller_1.OrganizationController.getSingleOrganization);
router.post('/', fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    // console.log(req.body);
    req.body = organization_validation_1.OrganizationValidation.addOrganizationZodSchema.parse(JSON.parse(req.body.data));
    return organization_controller_1.OrganizationController.addOrganization(req, res, next);
}
// validateRequest(OrganizationValidation.addOrganizationZodSchema),
// OrganizationController.addOrganization
);
router.patch('/:id', fileUploadHelper_1.fileUploadHelper.upload.single('profile_picture'), (req, res, next) => {
    // console.log(req.body);
    req.body = organization_validation_1.OrganizationValidation.updateOrganizationZodSchema.parse(JSON.parse(req.body.data));
    return organization_controller_1.OrganizationController.updateOrganization(req, res, next);
}
// validateRequest(OrganizationValidation.updateOrganizationZodSchema),
// OrganizationController.updateOrganization
);
router.delete('/:id', organization_controller_1.OrganizationController.deleteOrganization);
exports.OrganizationRoutes = router;
