import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.artist.deleteMany();
  await prisma.label.deleteMany();
  await prisma.personnel.deleteMany();
  await prisma.track.deleteMany();
  await prisma.release.deleteMany();

  //   await prisma.release.create({
  //     data: {
  //       artist: {
  //         connectOrCreate: {
  //           where: { name: "Jimmy Smith" },
  //           create: { name: "Jimmy Smith" },
  //         },
  //       },
  //       title: "House Party",
  //       catalogueNumber: "4002",
  //       label: {
  //         connectOrCreate: {
  //           where: { name: "Blue Note Records" },
  //           create: { name: "Blue Note Records" },
  //         },
  //       },
  //       recorded: new Date("09/22/1957"),
  //       released: new Date("03/15/1959"),
  //       personnel: {
  //         create: [
  //           { name: "Jimmy Smith", instruments: ["organ"], leader: true },
  //           {
  //             name: "Lee Morgan",
  //             instruments: ["trumpet"],
  //           },
  //           {
  //             name: "Curtis Fuller",
  //             instruments: ["trombone"],
  //           },
  //           {
  //             name: "George Coleman",
  //             instruments: ["alto saxophone"],
  //           },
  //           {
  //             name: "Lou Donaldson",
  //             instruments: ["alto saxophone"],
  //           },
  //           {
  //             name: "Tina Brooks",
  //             instruments: ["tenor saxophone"],
  //           },
  //           {
  //             name: "Kenny Burrell",
  //             instruments: ["guitar"],
  //           },
  //           { name: "Eddie McFadden", instruments: ["guitar"] },
  //           {
  //             name: "Donald Bailey",
  //             instruments: ["drums"],
  //           },
  //           { name: "Art Blakey", instruments: ["drums"] },
  //         ],
  //       },
  //       tracks: {
  //         create: [
  //           {
  //             title: "Au Privave",
  //             composedBy: ["Charlie Parker"],
  //             length: "15:09",
  //           },
  //           {
  //             title: "Lover Man",
  //             composedBy: ["Jimmy Davis", "Ram Ramirez", "James Sherman"],
  //             length: "7:00",
  //           },
  //           {
  //             title: "Just Friends",
  //             composedBy: ["John Klenner", "Sam M. Lewis"],
  //             length: "15:15",
  //           },
  //           {
  //             title: "Blues After All",
  //             composedBy: ["Kenny Burrell"],
  //             length: "6:06",
  //           },
  //         ],
  //       },
  //     },
  //   });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
