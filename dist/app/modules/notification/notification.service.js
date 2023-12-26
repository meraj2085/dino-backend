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
/* eslint-disable prefer-const */
const sendMail_1 = require("../../../utils/sendMail");
const user_model_1 = require("../user/user.model");
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
        // send push notification
        // coming soon
    }
    return true;
});
exports.NotificationService = {
    sendNotification,
};
