export interface Corporation {
  id: number;
  name: string;
  ticker: string;
  description: string;
  url: string;
  memberCount: number;
  ceoId: number;
  allianceId: number;
  creatorId: number;
  creationDate: Date;
  taxRate: number;
  hasSupers: boolean;
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
}
