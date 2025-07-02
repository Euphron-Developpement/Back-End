import { PrismaClient, HandicapType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Fonction pour générer un faux fichier PDF sous forme de Uint8Array
function generateFakePDF(): Uint8Array {
  const fakeContent = faker.lorem.paragraphs(5);
  return new TextEncoder().encode(fakeContent);
}

// Fonction pour supprimer les doublons dans la table Handicap
async function deleteDuplicateHandicaps() {
  // Récupérer tous les handicaps existants
  const existingHandicaps = await prisma.handicap.findMany();

  // Créer un Set pour les types uniques de handicap
  const uniqueHandicaps = new Set<string>();

  // Parcourir les handicaps pour identifier les doublons
  for (const handicap of existingHandicaps) {
    if (uniqueHandicaps.has(handicap.type)) {
      // Si le type est déjà présent, supprimer l'enregistrement
      await prisma.handicap.delete({
        where: { id: handicap.id },
      });
    } else {
      // Sinon, ajouter le type à l'ensemble des handicaps uniques
      uniqueHandicaps.add(handicap.type);
    }
  }

  console.log('Doublons supprimés dans la table Handicap.');
}

// Fonction principale pour le seeding
async function main() {
  console.log('🌱 Début du seeding...');

  // 1. Supprimer les doublons dans la table Handicap
  console.log('🧹 Suppression des doublons dans la table Handicap...');
  await deleteDuplicateHandicaps(); // Supprimer les doublons
  console.log('✅ Doublons dans la table Handicap supprimés avec succès!');

  // 2. Créer des utilisateurs
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        admin: faker.datatype.boolean(), // ← Génère true ou false aléatoirement
      },
    });
    users.push(user);
  }

  // 3. Créer des catégories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        label: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // 4. Créer des articles
  for (let i = 0; i < 20; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomCategory = faker.helpers.arrayElement(categories);

    await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        read_time: faker.number.int({ min: 5, max: 30 }),
        publication_date: faker.date.recent(),
        content: faker.lorem.paragraphs(3).split('\n').map(p => `<p>${p}</p>`).join(''),
        category: randomCategory.id,
        author: randomUser.id,
      },
    });
  }

  // 5. Créer des tags
  const tags = [];
  for (let i = 0; i < 10; i++) {
    const tag = await prisma.tag.create({
      data: {
        label: faker.word.noun(),
        color: faker.color.rgb({ format: 'hex' }),
      },
    });
    tags.push(tag);
  }

  // 6. Associer des articles et des tags
  const articles = await prisma.article.findMany();

  const mediaTypes = await Promise.all([
    prisma.media_Type.create({ data: { label: 'image' } }),
    prisma.media_Type.create({ data: { label: 'video' } }),
  ]);

  for (const article of articles) {
    const randomTags = faker.helpers.arrayElements(tags, faker.number.int({ min: 1, max: 3 }));
    for (const tag of randomTags) {
      await prisma.article_Tags.create({
        data: {
          article_id: article.id,
          tag_id: tag.id,
        },
      });
    }

    await prisma.media.create({
      data: {
        url: `https://picsum.photos/seed/${article.id}/1200/600`,
        article: article.id,
        hero: true,
        type: mediaTypes[0].id,
      }
    });

  }

  // 7. Créer des événements
  const events = [];
  for (let i = 0; i < 5; i++) {
    const event = await prisma.event.create({
      data: {
        name: faker.lorem.words(3),
        start_date: faker.date.future(),
        end_date: faker.date.future(),
        location: faker.address.city(),
        slot: faker.number.int({ min: 10, max: 100 }),
        alcool: faker.datatype.boolean(),
      },
    });
    events.push(event);
  }

  // 8. Créer des commandes (Orders) sans total_price ni status
  const orders = [];
  for (let i = 0; i < 10; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const order = await prisma.order.create({
      data: {
        user_Id: randomUser.id,
      },
    });
    orders.push(order);
  }

  // 9. Créer des handicaps (si nécessaire)
  const handicapTypes = Object.values(HandicapType);
  for (const type of handicapTypes) {
    const existingHandicap = await prisma.handicap.findFirst({
      where: { type },
    });

    if (!existingHandicap) {
      await prisma.handicap.create({
        data: { type },
      });
      console.log(`Ajout du handicap ${type}`);
    }
  }

  // 10. Créer des réservations avec des handicaps
  for (let i = 0; i < 10; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomOrder = faker.helpers.arrayElement(orders);
    const randomEventId = faker.helpers.arrayElement(events).id;

    // Récupérer les handicaps existants
    const randomHandicaps = faker.helpers.arrayElements(handicapTypes, faker.number.int({ min: 1, max: 2 }));

    // Récupérer les IDs des handicaps
    const handicapIds = await prisma.handicap.findMany({
      where: {
        type: {
          in: randomHandicaps,
        },
      },
      select: {
        id: true,
      },
    });

    // Créer la réservation
    await prisma.reservation.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        companion_id: null,
        order_id: randomOrder.id,
        code: faker.string.alphanumeric(10),
        pdf: generateFakePDF(),
        event_id: randomEventId,
        handicaps: {
          connect: handicapIds.map((handicap) => ({ id: handicap.id })),
        },
      },
    });
  }

  console.log('✅ Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
