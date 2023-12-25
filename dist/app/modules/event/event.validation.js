"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const addEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        from_date: zod_1.z.string().nonempty(),
        to_date: zod_1.z.string().nonempty(),
        title: zod_1.z.string().nonempty(),
        type: zod_1.z.string(),
    }),
});
const updateEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().nonempty().optional(),
        from_date: zod_1.z.string().nonempty().optional(),
        to_date: zod_1.z.string().nonempty().optional(),
        type: zod_1.z.string().nonempty().optional(),
    }),
});
exports.EventValidation = {
    updateEventZodSchema,
    addEventZodSchema,
};
