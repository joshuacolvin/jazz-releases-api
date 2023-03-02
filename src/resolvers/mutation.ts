import { Personnel, Track } from "@prisma/client";
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

    const releaseUpdate = prisma.release.update({
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
      },
    });

    const personnelUpdate = personnel?.map((p: Personnel) => {
      return prisma.personnel.upsert({
        where: { id: p.id },
        update: {
          id: p.id,
          name: p.name,
          instruments: p.instruments,
          leader: p.leader,
          releaseId: id,
        },
        create: {
          name: p.name,
          instruments: p.instruments,
          leader: p.leader,
          releaseId: id,
        },
      });
    });

    const tracksUpdate = tracks?.map((t: Track) => {
      return prisma.track.upsert({
        where: { id: t?.id },
        update: {
          title: t.title,
          composedBy: t.composedBy,
          length: t.length,
          number: t.number,
          releaseId: id,
        },
        create: {
          title: t.title,
          composedBy: t.composedBy,
          length: t.length,
          number: t.number,
          releaseId: id,
        },
      });
    });

    prisma.$transaction([releaseUpdate, ...personnelUpdate, ...tracksUpdate]);

    return prisma.release.findUnique({
      where: { id: id },
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
  deleteArtistById: (parent: any, args: any) => {
    return prisma.artist.delete({
      where: { id: args.artistId },
    });
  },
  deletePersonnelById: (parent: any, args: any) => {
    return prisma.personnel.delete({
      where: { id: args.personnelId },
    });
  },
  deleteTrackById: (parent: any, args: any) => {
    return prisma.track.delete({
      where: { id: args.trackId },
    });
  },
};
