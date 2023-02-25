import prisma from "../utils/db";

export const Mutation = {
  createLabel: (parent: any, args: any) => {
    return prisma.label.create({
      data: {
        ...args.input,
      },
    });
  },
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
  updateRelease: (parent: any, args: any) => {
    const {
      id,
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

    return prisma.release.update({
      where: { id: id },
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
  updateLabel: (parent: any, args: any) => {
    const { id, name, imageUrl } = args.input;
    return prisma.label.update({
      where: { id: id },
      data: {
        imageUrl,
        name,
      },
    });
  },
  deleteReleaseById: (parent: any, args: any) => {
    const { id } = args;

    const deleteTracks = prisma.track.deleteMany({
      where: {
        releaseId: id,
      },
    });

    const deletePersonnel = prisma.personnel.deleteMany({
      where: {
        releaseId: id,
      },
    });

    const deleteRelease = prisma.release.delete({
      where: {
        id,
      },
    });

    return prisma.$transaction([deleteTracks, deletePersonnel, deleteRelease]);
  },
};
