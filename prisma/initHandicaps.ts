import { PrismaClient, HandicapType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insérer des handicaps avec des types définis
  await prisma.handicap.createMany({
    data: [
      { type: HandicapType.MOBILITY },
      { type: HandicapType.VISUAL },
      { type: HandicapType.HEARING },
      { type: HandicapType.COGNITIVE },
    ],
  });
  console.log('Handicaps ajoutés avec succès!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
