import { gql } from "apollo-server";

const schema = gql`
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
    designer: String
    engineer: String
    producer: String
    photographer: String
    recordedAt: String
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
    engineer: String
    designer: String
    producer: String
    photographer: String
    recordedAt: String
  }

  input ArtistInput {
    name: String!
  }

  type Artist {
    id: String!
    name: String!
    releases: [Release!]!
  }

  input PersonnelInput {
    id: String
    name: String!
    instruments: [String]!
    leader: Boolean!
  }

  type Personnel {
    id: String!
    name: String!
    instruments: [String]!
    tracks: [Track]
    leader: Boolean!
    release: Release
  }

  input TrackInput {
    id: String
    title: String!
    composedBy: [String]!
    length: String!
    number: String
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

  input LabelInput {
    id: String
    name: String!
    imageUrl: String
  }

  type Label {
    id: String!
    name: String!
    imageUrl: String
    releases: [Release]
  }

  type Query {
    getAllLabels: [Label]!
    getAllReleases: [Release]!
    getAllReleasesByLabel(name: String!): [Release]!
    getReleasesByLabelId(labelId: String!): [Release]!
    getReleasesByLabelName(labelName: String!): [Release]!
    getReleasesByCatalogueNumber(catalogueNumber: String!): [Release]!
    getArtist(id: String!): Artist!
    getLabelByName(name: String!): Label!
    getLabelById(id: ID!): Label!
    getAllReleasesForArtist(name: String!): [Release]!
    getRecommendedReleases(releaseIds: [String]!): [Release]!
    getReleaseById(releaseId: String!): Release
  }

  type Mutation {
    createArtist(input: ArtistInput!): Artist!
    createLabel(input: LabelInput!): Label!
    createPersonnel(input: PersonnelInput!): Personnel!
    createRelease(input: ReleaseInput!): Release!
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
