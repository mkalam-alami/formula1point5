import * as samples from "./tables-samples";
export type ColumnType = "text" | "integer" | "float" | "time" | "delta" | "picture" | "stint";

export interface IColumn {
  name: string;
  title: string;
  type: ColumnType;
}

export class AvailableColumns {
  public ranking: IColumn = { name: "ranking", type: "integer", title: "" };
  public carNumber: IColumn = { name: "carnumber", type: "integer", title: "" };
  public driver: IColumn = { name: "driver", type: "text", title: "" };
  public team: IColumn = { name: "team", type: "text", title: "" };
  public time: IColumn = { name: "time", type: "time", title: "Lap Time" };
  public lapTime: IColumn = { name: "laptime", type: "time", title: "Time" };
  public q1: IColumn = { name: "q1", type: "time", title: "Q1 Lap Time" };
  public q2: IColumn = { name: "q2", type: "time", title: "Q2 Lap Time" };
  public q3: IColumn = { name: "q3", type: "time", title: "Q3 Lap Time" };
  public stint: IColumn = { name: "stint", type: "stint", title: "Stint" };
  public q1Stint: IColumn = { name: "q1stint", type: "stint", title: "" };
  public q2Stint: IColumn = { name: "q2stint", type: "stint", title: "" };
  public q3Stint: IColumn = { name: "q3stint", type: "stint", title: "" };
  public delta: IColumn = { name: "delta", type: "delta", title: "Gap" };
  public laps: IColumn = { name: "laps", type: "integer", title: "Laps" };
  public points: IColumn = { name: "pts", type: "integer", title: "Pts" };
  public pits: IColumn = { name: "pits", type: "integer", title: "Pit stops" };
  public carPicture: IColumn = { name: "carpicture", type: "picture", title: "" };
}

export default new AvailableColumns();
