import { Personnel, Session, Track } from "@prisma/client";
import prisma from "../utils/db";

export const Mutation = {
  createArtist: (parent: any, args: any) => {
    const { name } = args.input;
    return prisma.artist.create({
      data: {
        name,
      },
    });
  },
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
      producer,
      designer,
      photographer,
      artist,
      imageUrl,
      released,
      title,
      sessions,
    } = args.input;

    return prisma.release.create({
      data: {
        artist: {
          connectOrCreate: {
            where: {
              name: artist.name,
            },
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
        producer: {
          connectOrCreate: {
            where: { name: producer.name },
            create: { name: producer.name },
          },
        },
        designer: {
          connectOrCreate: {
            where: { name: designer.name },
            create: { name: designer.name },
          },
        },
        photographer: {
          connectOrCreate: {
            where: { name: photographer.name },
            create: { name: photographer.name },
          },
        },
        released: released,
        sessions: {
          create: sessions,
        },
      },
      include: {
        artist: true,
        sessions: true,
        label: true,
      },
    });
  },
  updateRelease: (parent: any, args: any) => {
    const {
      id,
      catalogueNumber,
      label,
      artist,
      engineer,
      producer,
      designer,
      photographer,
      imageUrl,
      sessions,
      released,
      title,
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
        producer: {
          connectOrCreate: {
            where: { name: producer.name },
            create: { name: producer.name },
          },
        },
        designer: {
          connectOrCreate: {
            where: { name: designer.name },
            create: { name: designer.name },
          },
        },
        photographer: {
          connectOrCreate: {
            where: { name: photographer.name },
            create: { name: photographer.name },
          },
        },
        released: released,
      },
    });

    const sessionUpdate = sessions?.map((s: any) => {
      return prisma.session.upsert({
        where: { id: s?.id ? s.id : "0" },
        update: {
          date: s.date,
          engineer: {
            connectOrCreate: {
              where: { name: s.engineer.name },
              create: { name: s.engineer.name },
            },
          },
          personnel: {
            upsert: s.personnel?.map((p: any) => {
              return {
                where: { id: p?.id ? p.id : "0" },
                update: {
                  artist: {
                    connectOrCreate: {
                      where: { name: p.artist.name },
                      create: { name: p.artist.name },
                    },
                  },
                  instruments: p.instruments,
                  leader: p.leader,
                  appearsOn: p.appearsOn,
                },
                create: {
                  artist: {
                    connectOrCreate: {
                      where: { name: p.artist.name },
                      create: { name: p.artist.name },
                    },
                  },
                  instruments: p.instruments,
                  leader: p.leader,
                  appearsOn: p.appearsOn,
                },
              };
            }),
          },
          tracks: {
            upsert: s.tracks?.map((t: Track) => {
              return {
                where: { id: t?.id ? t.id : "0" },
                update: {
                  title: t.title,
                  composedBy: t.composedBy,
                  length: t.length,
                  number: t.number,
                },
                create: {
                  title: t.title,
                  composedBy: t.composedBy,
                  length: t.length,
                  number: t.number,
                },
              };
            }),
          },
          studio: {
            connectOrCreate: {
              where: { name: s.studio?.name },
              create: {
                name: s.studio?.name,
                location: s.studio?.location,
              },
            },
          },
        },
        create: {
          date: s.date,
          release: {
            connect: { id: id },
          },
          personnel: {
            create: s.personnel?.map((p: any) => {
              return {
                artist: {
                  connectOrCreate: {
                    where: { name: p.artist.name },
                    create: { name: p.artist.name },
                  },
                },
                instruments: p.instruments,
                leader: p.leader,
                appearsOn: p.appearsOn,
              };
            }),
          },
          tracks: {
            create: s.tracks?.map((t: Track) => {
              return {
                title: t.title,
                composedBy: t.composedBy,
                length: t.length,
                number: t.number,
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
        },
      });
    });

    prisma.$transaction([releaseUpdate, ...sessionUpdate]);

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

    const deleteSessions = prisma.session.deleteMany({
      where: {
        releaseId: id,
      },
    });

    const deleteRelease = prisma.release.delete({
      where: {
        id,
      },
    });

    return prisma.$transaction([deleteSessions, deleteRelease]);
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
