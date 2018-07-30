import {FOLLOW_ACTION_TYPE} from './follow.constants';
import {DCharacterShort} from '../character/character.dto';
import {DCorporationShort} from '../corporation/corporation.dto';
import {DAllianceShort} from '../alliance/alliance.dto';

export class DFollowAction {
  type: FOLLOW_ACTION_TYPE;
}

export class DFollow {
  follower: DCharacterShort;

  followingCharacter: DCharacterShort;
  followingCorporation: DCorporationShort;
  followingAlliance: DAllianceShort;
}
