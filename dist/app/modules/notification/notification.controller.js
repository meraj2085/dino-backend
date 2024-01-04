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
exports.NotificationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const notification_service_1 = require("./notification.service");
const sendNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield notification_service_1.NotificationService.sendNotification(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Notification sent successfully',
        data: result,
    });
}));
const getNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield notification_service_1.NotificationService.getNotification(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Notification fetched successfully',
        data: result,
    });
}));
const getUnreadCount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const result = yield notification_service_1.NotificationService.getUnreadCount(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Unread Notification count fetched successfully',
        data: result ? result : "0",
    });
}));
const deleteMyNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const result = yield notification_service_1.NotificationService.deleteMyNotification(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Notification deleted successfully',
        data: result,
    });
}));
const markRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const notificationId = req.body.notificationId;
    const result = yield notification_service_1.NotificationService.markRead(id, notificationId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Notification deleted successfully',
        data: result,
    });
}));
exports.NotificationController = {
    sendNotification,
    getNotification,
    getUnreadCount,
    deleteMyNotification,
    markRead,
};
