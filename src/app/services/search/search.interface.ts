import { ICharacter } from '../character/character.interface';
import { ICorporation } from '../corporation/corporation.interface';
import { IAlliance } from '../alliance/alliance.interface';

export interface ISearchResponse {
  characters: ICharacter[],
  corporations: ICorporation[],
  alliances: IAlliance[]
}

export interface ISearchState {
  data: ISearchResponse
}
