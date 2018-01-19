import { DAllianceShort } from '../alliance/alliance.dto';
import { DPagination } from '../paggination.dto';

export class DCorporationName {
  id: number;
  name: string;
}

export class DCorporationShort {
  id: number;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
}

export class DCorporationShortWithoutAlliance {
  id: number;
  name: string;
  ticker: string;
  description: string;
}

export class DCorporation {
  id: number;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;

  /* LIVE Data*/
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
}

export class DCorporationList extends DPagination<DCorporationShort> {
}
