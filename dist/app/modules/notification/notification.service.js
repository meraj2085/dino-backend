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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
const sendMail_1 = require("../../../utils/sendMail");
const user_model_1 = require("../user/user.model");
const notification_model_1 = require("./notification.model");
const sendNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, description, user_ids, sendPush = false, sendEmail = false, department, toAll, organization_id, } = data;
    let users = [];
    if (toAll) {
        users = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.find({
            status: 'Active',
            user_type: { $ne: 'super_admin' },
            organization_id,
        }));
        user_ids = users === null || users === void 0 ? void 0 : users.map((item) => item === null || item === void 0 ? void 0 : item._id);
    }
    else if (department) {
        users = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.find({
            status: 'Active',
            department,
            organization_id,
        }));
        user_ids = users === null || users === void 0 ? void 0 : users.map((item) => item === null || item === void 0 ? void 0 : item._id);
    }
    else if (user_ids) {
        users = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.find({
            _id: { $in: user_ids },
        }));
    }
    if (sendEmail) {
        yield Promise.all(users === null || users === void 0 ? void 0 : users.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, sendMail_1.sendMail)({
                to: item === null || item === void 0 ? void 0 : item.office_email,
                subject: title,
                message: description,
            });
        })));
    }
    if (sendPush) {
        yield notification_model_1.Notification.create({
            title: title,
            description: description,
            organization_id: organization_id,
            user_ids: user_ids,
        });
    }
    return true;
});
const getNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({
        user_ids: { $in: [id] },
    }).sort({ createdAt: -1 });
    return notifications;
});
const getUnreadCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({
        user_ids: { $in: [id] },
        read_by: { $nin: [id] },
    }).count();
    return notifications;
});
const deleteMyNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.updateMany({
        user_ids: { $in: [id] },
    }, {
        $pull: { user_ids: id },
    });
    return notifications;
});
const markRead = (id, notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.updateMany({
        _id: notificationId,
    }, {
        $addToSet: { read_by: id },
    });
    return notification;
});
exports.NotificationService = {
    sendNotification,
    getNotification,
    getUnreadCount,
    deleteMyNotification,
    markRead,
};
