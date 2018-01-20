import { POST_TYPES } from './post.constants';
import { DCharacterShort } from '../character/character.dto';
import { DKillmailShort } from '../killmail/killmail.dto';
import { DUniverseLocation } from '../universe/location/location.dto';
import { DPagination } from '../paggination.dto';

export class DPost {
  id: string;
  content: string;
  type: POST_TYPES;
  character: DCharacterShort;
  killmail?: DKillmailShort;
  hashtags: string[];
  location?: DUniverseLocation;
  createdAt: Date;
}

export class DPostList extends DPagination<DPost> {
}
