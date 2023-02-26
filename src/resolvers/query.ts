import prisma from "../utils/db";

const Query = {
  // Label
  getAllLabels: () => prisma.label.findMany(),
  getAllReleases: () =>
    prisma.release.findMany({
      include: {
        artist: true,
        label: true,
        personnel: true,
        tracks: true,
      },
    }),
  getAllReleasesByLabel: (_: any, query: any) => {
    return prisma.release.findMany({
      where: { label: { name: { equals: query.name, mode: "insensitive" } } },
      orderBy: {
        catalogueNumber: "asc",
      },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
      },
    });
  },
  getAllReleasesForArtist: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        personnel: {
          some: {
            name: {
              contains: query.name,
              mode: "insensitive",
            },
          },
        },
      },
      orderBy: {
        released: "asc",
        catalogueNumber: "asc",
      },
      include: {
        artist: true,
        personnel: true,
        label: true,
        tracks: true,
      },
    });
  },
  getReleasesByLabelId: (_: any, query: any) => {
    return prisma.release.findMany({
      where: { labelId: query.labelId },
      orderBy: {
        catalogueNumber: "asc",
      },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
        label: true,
      },
    });
  },

  getArtist: (_: any, query: any) => {
    return prisma.artist.findUnique({
      where: query,
      include: {
        releases: true,
      },
    });
  },
  getLabelByName: (_: any, query: any) => {
    return prisma.label.findUnique({
      where: query,
      include: {
        releases: true,
      },
    });
  },
  getLabelById: (_: any, query: any) => {
    return prisma.label.findUnique({
      where: query,
      include: {
        releases: true,
      },
    });
  },
};

export { Query };
