import { ICharacterResponse } from '../character/character.interface';
import { ICorporation } from '../corporation/corporation.interface';
import { IAlliance } from '../alliance/alliance.interface';

export interface ISearchResponse {
  characters: ICharacterResponse[],
  corporations: ICorporation[],
  alliances: IAlliance[]
}

export interface ISearchState {
  data: ISearchResponse
}
