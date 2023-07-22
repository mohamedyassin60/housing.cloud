import { prisma } from "~/server/db";

async function main() {

  const data = [
    {
      name: 'Unit 1',
      description: 'Amazing unit with new furniture',
      price: 600,
      bedrooms: 2,
      distanceToCampus: 800
    },
    {
      name: 'Unit 2',
      description: 'Small studio with great privacy',
      price: 800,
      bedrooms: 1,
      distanceToCampus: 500
    },
    {
      name: 'Unit 3',
      description: 'Large unit close to the campus',
      price: 300,
      bedrooms: 6,
      distanceToCampus: 200
    },
    {
      name: 'Unit 4',
      description: 'Awesome unit very close to the campus',
      price: 900,
      bedrooms: 3,
      distanceToCampus: 100
    }
  ]

  // Seeding the Database with some dummy data
  await Promise.all(data.map((item) => prisma.unit.create({ data: item })))
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })