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
        OR: [
          {
            personnel: {
              some: {
                name: {
                  contains: query.name,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            artist: {
              name: {
                contains: query.name,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: [{ released: "asc" }, { catalogueNumber: "asc" }],
      include: {
        artist: true,
        personnel: true,
        label: true,
        tracks: true,
      },
    });
  },
  getReleasesByCatalogueNumber: (_: any, query: any) => {
    return prisma.release.findMany({
      where: { catalogueNumber: query.catalogueNumber },
      orderBy: {
        released: "asc",
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
  getReleasesByLabelName: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        label: { name: { contains: query.labelName, mode: "insensitive" } },
      },
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
  getRecommendedReleases: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        id: { in: query.releaseIds },
      },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
        label: true,
      },
    });
  },
  getReleaseById: (_: any, query: any) => {
    return prisma.release.findUnique({
      where: { id: query.releaseId },
      include: {
        artist: true,
        tracks: true,
        personnel: true,
        label: true,
      },
    });
  },
};

export { Query };
