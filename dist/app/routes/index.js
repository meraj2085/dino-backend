"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const organization_route_1 = require("../modules/organization/organization.route");
const user_route_1 = require("../modules/user/user.route");
const moduleRoutes = [
    {
        path: '/organization',
        route: organization_route_1.OrganizationRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
