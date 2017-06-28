export interface IAlliance {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;
  executorCorp: number;
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
