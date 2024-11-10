"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_constant_1 = require("./user.constant");
const user_service_1 = require("./user.service");
const organization_model_1 = require("../organization/organization.model");
const addUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const file = req.file;
    const result = yield user_service_1.UserService.addUser(data, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const organization_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.organization_id;
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield user_service_1.UserService.getUsers(filters, paginationOptions, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getMyTeam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user)
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const req_user = req === null || req === void 0 ? void 0 : req.user;
    if (!req_user) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized',
        });
    }
    const result = yield user_service_1.UserService.getMyTeam(filters, paginationOptions, req_user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Team fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const organization_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.organization_id;
    const result = yield user_service_1.UserService.getSingleUser(id, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User fetched successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const organization_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.organization_id;
    const id = req.params.id;
    const data = req.body;
    const file = req.file;
    const result = yield user_service_1.UserService.updateUser(id, data, organization_id, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const organization_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.organization_id;
    const organization = yield organization_model_1.Organization.findOne({
        _id: organization_id,
    }).select('user_delete_permission');
    if (!(organization === null || organization === void 0 ? void 0 : organization.user_delete_permission)) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'You do not have permission to delete user',
        });
    }
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
const disableOrActivateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const organization_id = (_e = req.user) === null || _e === void 0 ? void 0 : _e.organization_id;
    const { id, status } = req.body;
    const result = yield user_service_1.UserService.disableOrActivateUser(id, status, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User disabled successfully',
        data: result,
    });
}));
exports.UserController = {
    addUser,
    getUsers,
    getMyTeam,
    getSingleUser,
    updateUser,
    deleteUser,
    disableOrActivateUser,
};
