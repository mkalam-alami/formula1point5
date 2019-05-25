import availableColumns, { IColumn } from "./columns";
import * as samples from "./tables-samples";

export interface ITableFormat {
  title: string;
  defaultHeaderTitle: string;
  inputColumns: IColumn[];
  outputColumns: IColumn[];
  style?: string;
  samples?: string;
  samplesPits?: string;
}

export class AvailableTableFormats {

  public practice: ITableFormat = {
    title: "Practice session",
    defaultHeaderTitle: "F1.5 First Practice classification",
    samples: samples.practice,
    inputColumns: [
      availableColumns.ranking,
      availableColumns.carNumber,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.lapTime,
      availableColumns.delta,
      availableColumns.laps,
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.lapTime,
      availableColumns.stint,
      availableColumns.delta,
      availableColumns.laps,
    ],
  };

  public qualifying: ITableFormat = {
    title: "Qualifying",
    defaultHeaderTitle: "F1.5 Qualifying classification",
    samples: samples.qualifying,
    inputColumns: [
      availableColumns.ranking,
      availableColumns.carNumber,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.q1,
      availableColumns.q2,
      availableColumns.q3,
      availableColumns.laps,
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.q1,
      availableColumns.q1Stint,
      availableColumns.q2,
      availableColumns.q2Stint,
      availableColumns.q3,
      availableColumns.q3Stint,
      availableColumns.delta,
      availableColumns.laps,
    ],
  };

  public race: ITableFormat = {
    title: "Race",
    defaultHeaderTitle: "F1.5 Race classification",
    samples: samples.race,
    samplesPits: samples.racePits,
    inputColumns: [
      availableColumns.ranking,
      availableColumns.carNumber,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.laps,
      availableColumns.delta,
      availableColumns.points,
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.delta,
      availableColumns.pits,
      availableColumns.stint,
    ],
  };

  public pits: ITableFormat = {
    title: "Fastest pit stops (unfinished)",
    defaultHeaderTitle: "F1.5 Fastest pit stop award",
    style: "dhl",
    samples: samples.race,
    inputColumns: [
      availableColumns.ranking,
      availableColumns.carNumber,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.laps,
      availableColumns.delta,
      availableColumns.points,
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.team,
      availableColumns.driver,
      availableColumns.carPicture,
      availableColumns.time,
      availableColumns.points,
    ],
  };

}

export const availableTableFormats = new AvailableTableFormats();
