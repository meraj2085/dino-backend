"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    organization_id: { type: String, required: true },
    from_date: { type: String, required: true },
    to_date: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['event', 'holiday'], required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
