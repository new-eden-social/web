import { DCharacterName } from '../character/character.dto';
import { DCorporationName } from '../corporation/corporation.dto';
import { DAllianceName } from '../alliance/alliance.dto';

export class DSearch {
  characters: DCharacterName[];
  corporations: DCorporationName[];
  alliances: DAllianceName[];
}
