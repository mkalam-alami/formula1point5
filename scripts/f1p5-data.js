const teams = {
  'Renault': { shortname: 'Renault', color: '#f7f31c' },
  'Haas Ferrari': { shortname: 'Haas', color: '#535459' },
  'Sauber Ferrari': { shortname: 'Sauber', color: '#920209' },
  'McLaren Renault': { shortname: 'McLaren', color: '#e58a17' },
  'Scuderia Toro Rosso Honda': { shortname: 'Toro Rosso', color: '#3362bd' },
  'Force India Mercedes': { shortname: 'Force India', color: '#eb9ac3' },
  'Williams Mercedes': { shortname: 'Williams', color: '#eff0f4' }
}

const rankingColumn = { name: 'ranking', type: ColumnTypes.INTEGER, label: '' }
const carNumberColumn = { name: 'carnumber', type: ColumnTypes.INTEGER, label: '' }
const driverColumn = { name: 'driver', type: ColumnTypes.TEXT, label: '' }
const teamColumn = { name: 'team', type: ColumnTypes.TEXT, label: '' }
const timeColumn = { name: 'time', type: ColumnTypes.TIME, label: 'Lap Time' }
const stintColumn = { name: 'stint', type: ColumnTypes.STINT, label: 'Stint' }
const deltaColumn = { name: 'delta', type: ColumnTypes.DELTA, label: 'Gap' }
const lapsColumn = { name: 'laps', type: ColumnTypes.INTEGER, label: 'Laps' }
const pointsColumn = { name: 'pts', type: ColumnTypes.INTEGER, label: 'Pts' }
const pitsColumn = { name: 'pits', type: ColumnTypes.INTEGER, label: 'Pit stops' }

const templates = {

  practice: {
    title: "Practice session",
    samples: f1p5.samples.practice,
    inputColumns: [
      rankingColumn,
      carNumberColumn,
      driverColumn,
      teamColumn,
      timeColumn,
      deltaColumn,
      lapsColumn
    ],
    outputColumns: [
      rankingColumn,
      driverColumn,
      teamColumn,
      timeColumn,
      stintColumn,
      deltaColumn,
      lapsColumn
    ]
  },

  race: {
    title: "Race",
    samples: f1p5.samples.race,
    samplesPits: f1p5.samples.racePits,
    inputColumns: [
      rankingColumn,
      carNumberColumn,
      driverColumn,
      teamColumn,
      lapsColumn,
      deltaColumn,
      pointsColumn
    ],
    outputColumns: [
      rankingColumn,
      driverColumn,
      teamColumn,
      deltaColumn,
      pitsColumn,
      stintColumn
    ]
  }

}

// Exports

window.f1p5 = window.f1p5 || {}
window.f1p5.data = {
  teams,
  templates
}
