"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding Agave Bank Database...');
    const adminPassword = await bcrypt.hash('Admin@Agave2026', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@agaveruralbank.com' },
        update: {},
        create: {
            email: 'admin@agaveruralbank.com',
            password: adminPassword,
            role: client_1.Role.ADMIN,
            profile: {
                create: {
                    firstName: 'Agave',
                    lastName: 'Admin',
                    phoneNumber: '+233000000001',
                    kycLevel: 3,
                },
            },
        },
    });
    console.log('✅ Teller user created');
    const superAdminPassword = await bcrypt.hash('SuperAdmin@2026', 10);
    await prisma.user.upsert({
        where: { email: 'superadmin@agaveruralbank.com' },
        update: {},
        create: {
            email: 'superadmin@agaveruralbank.com',
            password: superAdminPassword,
            role: client_1.Role.SUPERADMIN,
            profile: {
                create: {
                    firstName: 'Super',
                    lastName: 'Admin',
                    phoneNumber: '+233000000002',
                    kycLevel: 3,
                },
            },
        },
    });
    console.log('✅ Super Admin user created');
    const customerPassword = await bcrypt.hash('Customer@123', 10);
    const customer = await prisma.user.upsert({
        where: { email: 'test.customer@gmail.com' },
        update: {},
        create: {
            email: 'test.customer@gmail.com',
            password: customerPassword,
            role: client_1.Role.CUSTOMER,
            profile: {
                create: {
                    firstName: 'Kofi',
                    lastName: 'Annan',
                    phoneNumber: '+233241234567',
                    address: 'Sogakope Main St, Volta Region',
                    dateOfBirth: new Date('1985-04-12'),
                    kycLevel: 1,
                },
            },
            accounts: {
                create: [
                    {
                        accountNumber: '1001002001',
                        type: 'SAVINGS',
                        balance: 5000.50,
                        currency: 'GHS',
                        status: 'ACTIVE',
                    },
                    {
                        accountNumber: '1001002002',
                        type: 'CURRENT',
                        balance: 10500.75,
                        currency: 'GHS',
                        status: 'ACTIVE',
                    }
                ]
            }
        },
    });
    console.log('✅ Test customer and accounts created');
    const tellerPassword = await bcrypt.hash('Teller@2026', 10);
    await prisma.user.upsert({
        where: { email: 'teller.one@agaveruralbank.com' },
        update: {},
        create: {
            email: 'teller.one@agaveruralbank.com',
            password: tellerPassword,
            role: client_1.Role.TELLER,
            profile: {
                create: {
                    firstName: 'Ama',
                    lastName: 'Mensah',
                    phoneNumber: '+233209876543',
                    kycLevel: 2,
                },
            },
        },
    });
    console.log('✅ Teller user created');
    console.log('🚀 Seeding complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map