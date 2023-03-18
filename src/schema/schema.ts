import { Personnel } from "@prisma/client";
import { gql } from "apollo-server";

const schema = gql`
  type Artist {
    id: String!
    name: String!
    releases: [Release!]!
  }

  type Label {
    id: String!
    name: String!
    imageUrl: String
    releases: [Release]
  }

  type Personnel {
    id: String!
    name: String!
    instruments: [String]!
    appearsOn: [String]
    leader: Boolean!
    release: Release
  }

  type Release {
    id: String!
    artist: Artist!
    catalogueNumber: String!
    imageUrl: String
    label: Label!
    personnel: [Personnel]
    recorded: String
    released: String
    title: String!
    tracks: [Track]
  }

  type Track {
    id: String!
    title: String!
    composedBy: [String]!
    length: String!
    personnel: [Personnel]
    release: Release!
    number: String
  }

  input ArtistInput {
    name: String!
  }

  input LabelInput {
    id: String
    name: String!
    imageUrl: String
  }

  input PersonnelInput {
    id: String
    name: String!
    instruments: [String]!
    leader: Boolean!
    appearsOn: [String]
  }

  input ReleaseInput {
    id: String
    artist: ArtistInput!
    catalogueNumber: String!
    imageUrl: String
    label: LabelInput!
    personnel: [PersonnelInput]
    recorded: String
    released: String
    title: String!
    tracks: [TrackInput]
  }

  input TrackInput {
    id: String
    title: String!
    composedBy: [String]!
    length: String!
    number: String
  }

  type Query {
    getAllLabels: [Label]!
    getAllReleases: [Release]!
    getAllReleasesByLabel(name: String!): [Release]!
    getReleasesByLabelId(labelId: String!): [Release]!
    getReleasesByLabelName(labelName: String!): [Release]!
    getReleasesByCatalogueNumber(catalogueNumber: String!): [Release]!
    getReleasesForLeader(name: String!): [Release]!
    getReleasesForSideman(name: String!): [Release]!
    getArtist(id: String!): Artist!
    getLabelByName(name: String!): Label!
    getLabelById(id: ID!): Label!
    getAllReleasesForArtist(name: String!): [Release]!
    getRecommendedReleases(releaseIds: [String]!): [Release]!
    getReleaseById(releaseId: String!): Release
    getReleaseByTitle(title: String!): [Release]!
    getReleasesBySeries(last: String!, first: String!): [Release]!
  }

  type Mutation {
    createArtist(input: ArtistInput!): Artist!
    createLabel(input: LabelInput!): Label!
    createPersonnel(input: PersonnelInput!): Personnel!
    createRelease(input: ReleaseInput!): ID
    createTrack(input: TrackInput!): Track!
    deleteArtistById(artistId: String!): ID
    deleteReleaseById(id: String!): ID
    deletePersonnelById(personnelId: String!): Personnel
    deleteTrackById(trackId: String!): Track
    updateLabel(input: LabelInput!): Label!
    updateRelease(input: ReleaseInput!): Release!
  }
`;

export { schema };
