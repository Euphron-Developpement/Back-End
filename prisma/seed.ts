import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ajouter un utilisateur
  const user = await prisma.user.create({
    data: {
      first_name: 'Alice',
      last_name: 'Dupont',
      email: 'alice.dupont@example.com',
      password: 'securepassword123',
      role: 'admin',
    },
  });

  // Ajouter une catégorie
  const category = await prisma.category.create({
    data: {
      label: 'Tech',
    },
  });

  // Ajouter un article
  const article = await prisma.article.create({
    data: {
      title: 'Introduction à NestJS',
      read_time: 10,
      publication_date: new Date(),
      category: category.id,
      author: user.id,
      content: 'Contenu de l\'article...',
    },
  });

  // Ajouter un tag
  const tag = await prisma.tag.create({
    data: {
      label: 'NestJS',
      color: 'blue',
    },
  });

  // Ajouter une relation Article_Tags
  await prisma.article_Tags.create({
    data: {
      article_id: article.id,
      tag_id: tag.id,
    },
  });

  console.log('Seed data has been added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });