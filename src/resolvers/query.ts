import prisma from "../utils/db";

const Query = {
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
  getLabel: (_: any, query: any) => {
    return prisma.label.findUnique({
      where: query,
      include: {
        releases: true,
      },
    });
  },
};

export { Query };
