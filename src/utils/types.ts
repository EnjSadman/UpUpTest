import { Status } from "./enums";

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  },
  location: {
    name: string;
    url: string;
  }

  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type RequestResponse = {
  info : Info,
  results: Character[]
}