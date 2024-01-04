"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        office_email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6).max(100),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        old_password: zod_1.z
            .string({
            required_error: 'Old password is required',
        })
            .min(6)
            .max(100),
        new_password: zod_1.z
            .string({
            required_error: 'New password is required',
        })
            .min(6)
            .max(100),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    changePasswordZodSchema,
};
