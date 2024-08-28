import { Status } from "../../utils/enums";
import { FetchProps } from "../../utils/types";

const BASE_URL = "https://rickandmortyapi.com/api/character/";



export async function DataFetcher ({ pageNumber, status, name }: FetchProps) {
  let result;
  let moddedUrl = BASE_URL;
  if (
    pageNumber === undefined
    && (status === undefined || status === Status.all)
    && (name === undefined || name === "")
  ) {
    result = await fetch(BASE_URL);
    result = result.json();

    return result;
  }

  if (pageNumber !== undefined || (name !== undefined || name !== "")) {
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
    if (status !== undefined && status !== Status.all) {
      moddedUrl += "&"
    }
  }

  if (status !== undefined && status !== Status.all) {
    moddedUrl += `status=${status}`
  }

  result = await fetch(moddedUrl);
  result = result.json();

  return result;
}

export async function SingleCharacterFetch(characterId : number) {
  let result = await fetch(`${BASE_URL}${characterId}`);
  
  return result.json();
}

export async function DirectLinkFetch(link:string) {
  let result = await fetch(link);

  return result;
}