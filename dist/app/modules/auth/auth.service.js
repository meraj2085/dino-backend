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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const isUserExists_1 = require("../../../utils/isUserExists");
const jwtHelper_1 = require("../../../utils/jwtHelper");
const user_model_1 = require("../user/user.model");
const cryptoPassword_1 = require("../../../utils/cryptoPassword");
const passwordGenerate_1 = require("../../../utils/passwordGenerate");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { office_email, password } = payload;
    if (!office_email || !password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Office email & password is required');
    }
    const user = yield (0, isUserExists_1.isUserExist)(office_email, user_model_1.User);
    const is_manager = (yield user_model_1.User.countDocuments({ manager_id: user === null || user === void 0 ? void 0 : user._id })) > 0;
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.status === 'Disabled') {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is disabled');
    }
    // Check if password is correct
    const passwordMatch = yield (0, cryptoPassword_1.comparePassword)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, user_type, organization_id } = user;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ userId, user_type, organization_id, is_manager }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ userId, user_type, organization_id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExists = yield user_model_1.User.findById({ _id: userId, status: 'Active' }, { _id: 1, user_type: 1, organization_id: 1 }).lean();
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Generate a new token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        userId: isUserExists._id,
        user_type: isUserExists.user_type,
        organization_id: isUserExists.organization_id,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (userId, old_password, new_password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!user.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not set');
    }
    const passwordMatch = yield (0, cryptoPassword_1.comparePassword)(old_password, user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    // Encrypt password
    const hashedPassword = yield (0, cryptoPassword_1.encryptPassword)(new_password);
    // Update password
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ _id: userId }, { password: hashedPassword, is_password_reset: true }, {
        new: true,
    }).select('-password');
    return updatedUser;
});
const adminResetPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const new_password = yield (0, passwordGenerate_1.generateStrongPassword)();
    if (!new_password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Default password is not set');
    }
    const hashedPassword = yield (0, cryptoPassword_1.encryptPassword)(new_password);
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ _id: id }, { password: hashedPassword, is_password_reset: false }, {
        new: true,
    }).select('-password');
    return updatedUser;
});
const showPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).select([
        'password',
        'is_password_reset',
        'office_email',
    ]);
    if (!user || !user.password || user.is_password_reset === true) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not authorized');
    }
    const decoded_password = yield (0, cryptoPassword_1.decryptPassword)(user.password);
    return {
        office_email: user.office_email,
        password: decoded_password,
    };
});
exports.AuthService = {
    login,
    refreshToken,
    changePassword,
    showPassword,
    adminResetPassword,
};
