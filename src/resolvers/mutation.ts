import prisma from "../utils/db";

export const Mutation = {
  createRelease: (parent: any, args: any) => {
    const {
      catalogueNumber,
      label,
      artist,
      imageUrl,
      personnel,
      recorded,
      released,
      title,
      tracks,
    } = args.input;

    return prisma.release.create({
      data: {
        artist: {
          connectOrCreate: {
            where: { name: artist.name },
            create: { name: artist.name },
          },
        },
        imageUrl: imageUrl,
        title: title,
        catalogueNumber: catalogueNumber,
        label: {
          connectOrCreate: {
            where: { name: label.name },
            create: { name: label.name },
          },
        },
        recorded: recorded,
        released: released,
        personnel: {
          create: personnel,
        },
        tracks: {
          create: tracks,
        },
      },
      include: {
        artist: true,
        label: true,
        personnel: true,
        tracks: true,
      },
    });
  },
};
