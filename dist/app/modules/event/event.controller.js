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
exports.EventController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const event_constant_1 = require("./event.constant");
const event_service_1 = require("./event.service");
const addEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const organization_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.organization_id;
    const data = req.body;
    const result = yield event_service_1.EventService.addEvent(data, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Events created successfully',
        data: result,
    });
}));
const getAllEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const organization_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.organization_id;
    const filters = (0, pick_1.default)(req.query, event_constant_1.eventFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield event_service_1.EventService.getAllEvent(filters, paginationOptions, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Events fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const organization_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.organization_id;
    const id = req.params.id;
    const result = yield event_service_1.EventService.getSingleEvent(id, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event fetched successfully',
        data: result,
    });
}));
const updateEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    const data = req.body;
    const organization_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.organization_id;
    const result = yield event_service_1.EventService.updateEvent(id, data, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event updated successfully',
        data: result,
    });
}));
const deleteEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = req.params.id;
    const organization_id = (_e = req.user) === null || _e === void 0 ? void 0 : _e.organization_id;
    const result = yield event_service_1.EventService.deleteEvent(id, organization_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event deleted successfully',
        data: result,
    });
}));
exports.EventController = {
    addEvent,
    getAllEvent,
    getSingleEvent,
    updateEvent,
    deleteEvent,
};
