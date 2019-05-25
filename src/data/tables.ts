import * as samples from './tables-samples';
export type ColumnType = 'text' | 'integer' | 'float' | 'time' | 'delta' | 'picture' | 'stint'

export interface Column {
  name: string
  title: string
  type: ColumnType
}

export interface TableFormat {
  title: string
  defaultHeaderTitle: string
  inputColumns: Column[]
  outputColumns: Column[]
  style?: string
  samples?: string
  samplesPits?: string
}


export class AvailableColumns {
  ranking: Column = { name: 'ranking', type: 'integer', title: '' }
  carNumber: Column = { name: 'carnumber', type: 'integer', title: '' }
  driver: Column = { name: 'driver', type: 'text', title: '' }
  team: Column = { name: 'team', type: 'text', title: '' }
  time: Column = { name: 'time', type: 'time', title: 'Lap Time' }
  lapTime: Column = { name: 'laptime', type: 'time', title: 'Time' }
  q1: Column = { name: 'q1', type: 'time', title: 'Q1 Lap Time' }
  q2: Column = { name: 'q2', type: 'time', title: 'Q2 Lap Time' }
  q3: Column = { name: 'q3', type: 'time', title: 'Q3 Lap Time' }
  stint: Column = { name: 'stint', type: 'stint', title: 'Stint' }
  q1Stint: Column = { name: 'q1stint', type: 'stint', title: '' }
  q2Stint: Column = { name: 'q2stint', type: 'stint', title: '' }
  q3Stint: Column = { name: 'q3stint', type: 'stint', title: '' }
  delta: Column = { name: 'delta', type: 'delta', title: 'Gap' }
  laps: Column = { name: 'laps', type: 'integer', title: 'Laps' }
  points: Column = { name: 'pts', type: 'integer', title: 'Pts' }
  pits: Column = { name: 'pits', type: 'integer', title: 'Pit stops' }
  carPicture: Column = { name: 'carpicture', type: 'picture', title: '' }
}

export const availableColumns = new AvailableColumns();

export class AvailableTableFormats {

  practice: TableFormat = {
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
      availableColumns.laps
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.lapTime,
      availableColumns.stint,
      availableColumns.delta,
      availableColumns.laps
    ]
  }

  qualifying: TableFormat = {
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
      availableColumns.laps
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
      availableColumns.laps
    ]
  }

  race: TableFormat = {
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
      availableColumns.points
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.driver,
      availableColumns.team,
      availableColumns.delta,
      availableColumns.pits,
      availableColumns.stint
    ]
  }

  pits: TableFormat = {
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
      availableColumns.points
    ],
    outputColumns: [
      availableColumns.ranking,
      availableColumns.team,
      availableColumns.driver,
      availableColumns.carPicture,
      availableColumns.time,
      availableColumns.points
    ]
  }

}

export const availableTableFormats = new AvailableTableFormats();