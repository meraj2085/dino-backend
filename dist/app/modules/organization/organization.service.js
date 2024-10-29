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
exports.OrganizationService = void 0;
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const organization_constant_1 = require("./organization.constant");
const organization_model_1 = require("./organization.model");
const organization_utils_1 = require("./organization.utils");
const addOrganization = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        data.profile_picture = uploadedImg.secure_url;
    }
    //Generate organization code
    const company_code = yield (0, organization_utils_1.generateOrganizationCode)();
    data.company_code = company_code;
    const organization = yield organization_model_1.Organization.create(data);
    return organization;
});
const getOrganizations = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: organization_constant_1.organizationFilterableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield organization_model_1.Organization.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield organization_model_1.Organization.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findById(id);
    return organization;
});
const updateOrganization = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        payload.profile_picture = uploadedImg.secure_url;
    }
    const updatedOrganization = yield organization_model_1.Organization.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updatedOrganization;
});
const organizationConfig = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrganizationConfig = yield organization_model_1.Organization.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updatedOrganizationConfig;
});
const deleteOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findByIdAndDelete(id);
    return organization;
});
exports.OrganizationService = {
    addOrganization,
    getOrganizations,
    getSingleOrganization,
    updateOrganization,
    deleteOrganization,
    organizationConfig,
};
