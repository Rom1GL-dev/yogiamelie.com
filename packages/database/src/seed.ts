import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password', SALT_ROUNDS);

  const user = await prisma.user.upsert({
    where: { email: 'dev@romain-gilot.fr' },
    update: {},
    create: {
      name: 'Admin',
      email: 'dev@romain-gilot.fr',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log(`User created: ${user.email} (${user.id})`);

  const link = await prisma.link.findFirst();
  if (!link) {
    await prisma.link.create({
      data: {
        instagram: '',
        facebook: '',
        youtube: '',
        tiktok: '',
      },
    });
    console.log('Default links row created.');
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
