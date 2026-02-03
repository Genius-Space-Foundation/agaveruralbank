"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/guards/roles.decorator");
const client_1 = require("@prisma/client");
const staff_service_1 = require("./staff.service");
const staff_dto_1 = require("./dto/staff.dto");
let StaffController = class StaffController {
    staffService;
    constructor(staffService) {
        this.staffService = staffService;
    }
    async searchUsers(query) {
        return this.staffService.searchUsers(query);
    }
    async getUser(id) {
        return this.staffService.getUserDetails(id);
    }
    async updateKyc(id, dto) {
        return this.staffService.updateKycStatus(id, dto);
    }
    async getAuditLogs(limit) {
        return this.staffService.getAuditLogs(limit ? parseInt(limit) : 50);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Search for customers' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.SearchUserDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed user profile' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('users/:id/kyc'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user KYC status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_dto_1.UpdateKycStatusDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateKyc", null);
__decorate([
    (0, common_1.Get)('audit'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent system audit logs' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getAuditLogs", null);
exports.StaffController = StaffController = __decorate([
    (0, swagger_1.ApiTags)('Staff Portal'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.TELLER, client_1.Role.SUPERADMIN),
    (0, common_1.Controller)('staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map