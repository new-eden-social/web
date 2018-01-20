import { DAllianceShort } from '../alliance/alliance.dto';
import { DPagination } from '../paggination.dto';

export class DCorporationIcon {
  px64x64: string;
  px128x128: string;
  px256x256: string;
}


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
  icon: DCorporationIcon;
}

export class DCorporationShortWithoutAlliance {
  id: number;
  name: string;
  ticker: string;
  description: string;
  icon: DCorporationIcon;
}

export class DCorporation {
  id: number;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
  icon: DCorporationIcon;

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
