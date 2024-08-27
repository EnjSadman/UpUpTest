import { Status } from "../../utils/enums";

const BASE_URL = "https://rickandmortyapi.com/api/character/";

interface Props {
  pageNumber?: number;
  characterId?: number;
  status?: Status;
  name?: string;
}

export async function DataFetcher ({ pageNumber, characterId, status, name }: Props) {
  let result;
  let moddedUrl = BASE_URL;
  if (
    pageNumber === undefined
    && characterId === undefined
    && status === undefined
    && name === undefined
  ) {
    result = await fetch(BASE_URL);
    result = result.json();

    return result;
  }

  if (pageNumber !== undefined || status !== undefined || name !== undefined) {
    moddedUrl += `?`
  }

  if (pageNumber !== undefined) {
    moddedUrl += `page=${pageNumber}`
    if (status !== undefined || name !== undefined) {
      moddedUrl += "&"
    }
  }

  if (name !== undefined) {
    moddedUrl += `name=${name}`
    if (status !== undefined) {
      moddedUrl += "&"
    }
  }

  if (status !== undefined) {
    moddedUrl += `status=${status}`
  }

  result = await fetch(moddedUrl);
  result = result.json;

  return result;
}