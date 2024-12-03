import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer des utilisateurs
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['admin', 'editor', 'viewer']),
      },
    });
  }

  // Créer des catégories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        label: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // Créer des articles
  const users = await prisma.user.findMany(); // Récupérer les utilisateurs pour les assigner comme auteurs
  for (let i = 0; i < 20; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomCategory = faker.helpers.arrayElement(categories);

    await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        read_time: faker.number.int({ min: 5, max: 30 }),
        publication_date: faker.date.recent(),
        content: faker.lorem.paragraphs(3),
        category: randomCategory.id,
        author: randomUser.id,
      },
    });
  }

  // Créer des tags
  const tags = [];
  for (let i = 0; i < 10; i++) {
    const tag = await prisma.tag.create({
      data: {
        label: faker.lorem.word(),
        color: faker.color.rgb({ format: 'hex' }),
      },
    });
    tags.push(tag);
  }

  // Associer des articles et des tags
  const articles = await prisma.article.findMany();
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
  }

  console.log('✅ Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });