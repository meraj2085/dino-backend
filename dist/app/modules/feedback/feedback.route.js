"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// Routes
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), feedback_controller_1.FeedbackController.getAllFeedback);
router.post('/', feedback_controller_1.FeedbackController.addFeedback);
router.get('/:id', feedback_controller_1.FeedbackController.getSingleFeedback);
exports.FeedbackRoutes = router;
