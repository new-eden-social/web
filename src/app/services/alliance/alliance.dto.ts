import { DPagination } from '../paggination.dto';
import { DCorporationShortWithoutAlliance } from '../corporation/corporation.dto';

export class DAllianceIcon {
  px64x64: string;
  px128x128: string;
}


export class DAllianceName {
  id: number;
  name: string;
}

export class DAllianceShort {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;
  icon: DAllianceIcon;
}

export class DAlliance {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;
  executorCorporation: DCorporationShortWithoutAlliance;
  icon: DAllianceIcon;

  /* LIVE Data */
  hasSupers: boolean;
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
  memberCount: number;
  corpCount: number;
}

export class DAllianceList extends DPagination<DAllianceShort> {
}
