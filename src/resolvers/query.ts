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
      where: { label: { name: query.name } },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
      },
    });
  },
  getReleasesByLabelId: (_: any, query: any) => {
    return prisma.release.findMany({
      where: { labelId: query.labelId },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
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
