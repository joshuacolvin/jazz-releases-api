import { gql } from "apollo-server";

const schema = gql`
  type Artist {
    id: String!
    name: String!
    releases: [Release]
  }

  type Engineer {
    id: String!
    name: String!
    releases: [Release]
  }

  type Designer {
    id: String!
    name: String!
    releases: [Release]
  }

  type Photographer {
    id: String!
    name: String!
    releases: [Release]
  }

  type Producer {
    id: String!
    name: String!
    releases: [Release]
  }

  type Studio {
    id: String!
    name: String!
    location: String
    sessions: [Session!]!
  }

  type Session {
    id: String!
    date: String!
    engineer: Engineer
    personnel: [Personnel]
    tracks: [Track]
    recordedBy: String
    release: Release
    studio: Studio
  }

  type Label {
    id: String!
    name: String!
    imageUrl: String
    releases: [Release]
  }

  type Personnel {
    id: String!
    artist: Artist
    instruments: [String]!
    appearsOn: [String]
    leader: Boolean!
    session: Session
  }

  type Release {
    id: String!
    artist: Artist!
    designer: Designer
    photographer: Photographer
    producer: Producer
    catalogueNumber: String!
    imageUrl: String
    label: Label!
    released: String
    title: String!
    sessions: [Session]
  }

  type Track {
    id: String!
    title: String!
    composedBy: [String]!
    length: String!
    personnel: [Personnel]
    session: Session!
    number: String
  }

  input ArtistInput {
    id: String
    name: String!
  }

  input EngineerInput {
    id: String
    name: String
  }

  input DesignerInput {
    id: String
    name: String
  }

  input PhotographerInput {
    id: String
    name: String
  }

  input ProducerInput {
    id: String
    name: String
  }

  input StudioInput {
    name: String!
    location: String
  }

  input LabelInput {
    id: String
    name: String!
    imageUrl: String
  }

  input SessionInput {
    id: String
    date: String!
    studio: StudioInput
    engineer: EngineerInput
    personnel: [PersonnelInput]
    tracks: [TrackInput]
    release: ReleaseInput
  }

  input PersonnelInput {
    id: String
    artist: ArtistInput!
    instruments: [String]!
    leader: Boolean!
    appearsOn: [String]
  }

  input ReleaseInput {
    id: String
    catalogueNumber: String!
    imageUrl: String
    label: LabelInput!
    released: String
    artist: ArtistInput!
    designer: DesignerInput
    engineer: EngineerInput
    photographer: PhotographerInput
    producer: ProducerInput
    title: String!
    sessions: [SessionInput]
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
    getAllArtists: [Artist]!
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
    createSession(input: SessionInput!): Session!
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
