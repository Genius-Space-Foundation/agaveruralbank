import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Agave Bank Database...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('Admin@Agave2026', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@agaveruralbank.com' },
    update: {},
    create: {
      email: 'admin@agaveruralbank.com',
      password: adminPassword,
      role: Role.ADMIN,
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
  console.log('✅ Admin user created');

  // 2. Create a Test Customer
  const customerPassword = await bcrypt.hash('Customer@123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'test.customer@gmail.com' },
    update: {},
    create: {
      email: 'test.customer@gmail.com',
      password: customerPassword,
      role: Role.CUSTOMER,
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

  // 3. Create a Test Teller
  const tellerPassword = await bcrypt.hash('Teller@2026', 10);
  await prisma.user.upsert({
    where: { email: 'teller.one@agaveruralbank.com' },
    update: {},
    create: {
      email: 'teller.one@agaveruralbank.com',
      password: tellerPassword,
      role: Role.TELLER,
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
