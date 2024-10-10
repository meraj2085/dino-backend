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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const addUser = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //If file uploaded then upload to cloudinary
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        // console.log(uploadedImg);
        data.profile_picture = uploadedImg.secure_url;
    }
    //Generate employee code
    const employee_code = yield (0, user_utils_1.generateEmployeeCode)((_a = data.organization_id) !== null && _a !== void 0 ? _a : '');
    data.employee_code = employee_code;
    const user = yield user_model_1.User.create(data);
    return user;
});
const getUsers = (filters, paginationOptions, organization_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    andConditions.push({
        organization_id,
        user_type: {
            $ne: 'super_admin',
        },
    });
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select('-password');
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyTeam = (filters, paginationOptions, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        _id: userId,
    });
    let manager_id;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'Manager') {
        manager_id = userId;
    }
    else {
        manager_id = user === null || user === void 0 ? void 0 : user.manager_id;
    }
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    andConditions.push({
        $or: [
            {
                manager_id: manager_id,
            },
            {
                _id: manager_id,
            },
        ],
    });
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select('-password');
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (id, organization_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        _id: id,
        organization_id,
    }).select('-password');
    return user;
});
const updateUser = (id, payload, organization_id, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        // console.log(uploadedImg);
        payload.profile_picture = uploadedImg.secure_url;
    }
    const updateUser = yield user_model_1.User.findOneAndUpdate({ _id: id, organization_id }, payload, {
        new: true,
    }).select('-password');
    return updateUser;
});
const deleteUser = (id, organization_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndDelete({
        _id: id,
        organization_id,
    }).select('-password');
    return user;
});
exports.UserService = {
    addUser,
    getUsers,
    getMyTeam,
    getSingleUser,
    updateUser,
    deleteUser,
};
