import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.artist.deleteMany();
  await prisma.label.deleteMany();
  await prisma.personnel.deleteMany();
  await prisma.track.deleteMany();
  await prisma.release.deleteMany();
  await prisma.studio.deleteMany();
  await prisma.session.deleteMany();

  const data = [
    {
      artist: {
        name: "Miles Davis",
      },
      title: "Miles Davis Volume 1",
      catalogueNumber: "1501",
      label: {
        name: "Blue Note Records",
      },
      producer: {
        name: "Alfred Lion",
      },
      designer: {
        name: "Reid Miles",
      },
      photographer: {
        name: "Francis Wolff",
      },
      released: "1955",
      imageUrl:
        "https://imagedelivery.net/bR9HEhfjyMUHYFEWVl9qPg/d23a17e2-4275-4e38-abd2-a8b66a569a00/public",
      sessions: [
        {
          date: new Date("05/09/1952").getTime().toString(),
          engineer: {
            name: "Rudy Van Gelder",
          },
          personnel: [
            {
              artist: { name: "Miles Davis" },
              instruments: ["trumpet"],
              leader: true,
            },
            {
              artist: { name: "Jay Jay Johnson" },
              instruments: ["trombone"],
            },
            {
              artist: { name: "Jackie McLean" },
              instruments: ["alto saxophone"],
            },
            {
              artist: { name: "Gil Coggins" },
              instruments: ["piano"],
            },
            {
              artist: { name: "Oscar Pettiford" },
              instruments: ["bass"],
            },
            {
              artist: { name: "Kenny Clarke" },
              instruments: ["drums"],
            },
          ],
          studio: {
            name: "WOR Studios",
            location: "New York City, New York",
          },
        },
      ],
    },
  ];

  // await prisma.label.create({
  //   data: {
  //     name: "Blue Note Records",
  //   },
  // });

  // data.forEach(async (d) => {
  //   await prisma.artist.upsert({
  //     where: { name: d.artist.name },
  //     create: { name: d.artist.name },
  //     update: { name: d.artist.name },
  //   });
  // });

  data.forEach(async (d) => {
    await prisma.release.create({
      data: {
        artist: {
          create: {
            name: d.artist.name,
          },
        },
        title: d.title,
        catalogueNumber: d.catalogueNumber,
        released: d.released,
        label: {
          connectOrCreate: {
            where: { name: d.label.name },
            create: { name: d.label.name },
          },
        },
        producer: {
          connectOrCreate: {
            where: { name: d.producer.name },
            create: { name: d.producer.name },
          },
        },
        designer: {
          connectOrCreate: {
            where: { name: d.designer.name },
            create: { name: d.designer.name },
          },
        },
        photographer: {
          connectOrCreate: {
            where: { name: d.photographer.name },
            create: { name: d.photographer.name },
          },
        },
        imageUrl: d.imageUrl,
        sessions: {
          create: d.sessions.map((s) => {
            return {
              date: s.date,
              engineer: {
                connectOrCreate: {
                  where: { name: s.engineer.name },
                  create: { name: s.engineer.name },
                },
              },
              personnel: {
                create: s.personnel.map((p) => {
                  return {
                    artist: {
                      connectOrCreate: {
                        where: { name: p.artist.name },
                        create: {
                          name: p.artist.name,
                        },
                      },
                    },
                    instruments: p.instruments,
                    leader: p.leader,
                  };
                }),
              },
              studio: {
                connectOrCreate: {
                  where: { name: s.studio.name },
                  create: {
                    name: s.studio.name,
                    location: s.studio.location,
                  },
                },
              },
            };
          }),
        },
      },
    });
  });

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
