import prisma from "../utils/db";

const Query = {
  // Label
  getAllLabels: () =>
    prisma.label.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  getAllReleases: () =>
    prisma.release.findMany({
      include: {
        label: true,
        artist: true,
        sessions: {
          include: {
            personnel: {
              include: {
                artist: true,
              },
            },
            engineer: true,
            studio: true,
            tracks: true,
          },
        },
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
        sessions: true,
      },
    });
  },
  getAllReleasesForArtist: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        artist: { name: { contains: query.name, mode: "insensitive" } },
        OR: [
          {
            sessions: {
              some: {
                personnel: {
                  some: {
                    artist: {
                      name: { contains: query.name, mode: "insensitive" },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      orderBy: [{ released: "asc" }, { catalogueNumber: "asc" }],
      include: {
        artist: true,
        label: true,
        sessions: true,
      },
    });
  },
  getReleasesForLeader: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        sessions: {
          some: {
            personnel: {
              some: {
                artist: { name: { contains: query.name, mode: "insensitive" } },
                AND: {
                  leader: {
                    equals: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ released: "asc" }, { catalogueNumber: "asc" }],
      include: {
        artist: true,
        label: true,
        sessions: true,
      },
    });
  },
  getReleasesForSideman: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        sessions: {
          some: {
            personnel: {
              some: {
                artist: { name: { contains: query.name, mode: "insensitive" } },
                AND: {
                  leader: {
                    equals: false,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [{ released: "asc" }, { catalogueNumber: "asc" }],
      include: {
        artist: true,
        label: true,
        sessions: true,
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
        label: true,
        sessions: true,
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
        label: true,
        sessions: true,
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
        label: true,
        sessions: true,
      },
    });
  },
  getArtist: (_: any, query: any) => {
    return prisma.artist.findUnique({
      where: query,
    });
  },
  getAllArtists: (_: any) => {
    return prisma.artist.findMany({
      orderBy: {
        name: "asc",
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
        sessions: true,
        label: true,
      },
    });
  },
  getReleaseById: (_: any, query: any) => {
    return prisma.release.findUnique({
      where: { id: query.releaseId },
      include: {
        artist: true,
        producer: true,
        designer: true,
        photographer: true,
        label: true,
        sessions: {
          include: {
            engineer: true,
            personnel: {
              orderBy: { leader: "desc" },
              include: {
                artist: true,
              },
            },
            tracks: true,
            studio: true,
          },
          orderBy: { date: "desc" },
        },
      },
    });
  },
  getReleaseByTitle: (_: any, query: any) => {
    return prisma.release.findMany({
      where: { title: { contains: query.title, mode: "insensitive" } },
      include: {
        artist: true,
        label: true,
        sessions: { include: { personnel: true, tracks: true } },
      },
    });
  },
  getReleasesBySeries: (_: any, query: any) => {
    return prisma.release.findMany({
      where: {
        catalogueNumber: {
          lte: query.last,
          gte: query.first,
        },
      },
      orderBy: {
        catalogueNumber: "asc",
      },
      include: {
        artist: true,
        label: true,
        sessions: true,
      },
    });
  },
};

export { Query };
