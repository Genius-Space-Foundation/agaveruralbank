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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let StaffService = class StaffService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchUsers(dto) {
        const { query } = dto;
        if (!query) {
            return this.prisma.user.findMany({
                take: 20,
                include: { profile: true, accounts: true },
                orderBy: { email: 'asc' }
            });
        }
        return this.prisma.user.findMany({
            where: {
                OR: [
                    { email: { contains: query, mode: 'insensitive' } },
                    { profile: { firstName: { contains: query, mode: 'insensitive' } } },
                    { profile: { lastName: { contains: query, mode: 'insensitive' } } },
                    { profile: { nationalId: { contains: query, mode: 'insensitive' } } },
                    { accounts: { some: { accountNumber: { contains: query } } } }
                ],
            },
            include: {
                profile: true,
                accounts: true,
            },
            take: 20,
        });
    }
    async getUserDetails(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                accounts: true,
                auditLogs: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                },
                loans: true
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateKycStatus(userId, dto) {
        let newLevel = 1;
        if (dto.status === 'VERIFIED') {
            newLevel = 2;
        }
        const profile = await this.prisma.profile.update({
            where: { userId },
            data: {
                kycStatus: dto.status,
                kycLevel: newLevel
            },
            include: { user: true }
        });
        await this.prisma.auditLog.create({
            data: {
                action: `KYC_${dto.status}`,
                resource: 'Profile',
                resourceId: userId,
                userId: userId,
                metadata: {
                    status: dto.status,
                    previousLevel: profile.kycLevel,
                    newLevel
                },
            },
        });
        return profile;
    }
    async getAuditLogs(limit = 50) {
        return this.prisma.auditLog.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        email: true,
                        profile: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }
            }
        });
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map