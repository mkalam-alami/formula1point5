const tyres = ['H','M','S']

const teams = {
  'renault': { shortName: 'Renault', color: '#f7f31c', carPicture: 'car-renault.jpg' },
  'haas ferrari': { shortName: 'Haas', color: '#535459', carPicture: 'car-haas.jpg' },
  'alfa romeo racing ferrari': { shortName: 'Alfa Romeo', color: '#920209', carPicture: 'car-sauber.jpg' },
  'mclaren renault': { shortName: 'McLaren', color: '#e58a17', carPicture: 'car-mclaren.jpg' },
  'scuderia toro rosso honda': { shortName: 'Toro Rosso', color: '#3362bd', carPicture: 'car-tororosso.jpg' },
  'racing point bwt mercedes': { shortName: 'Racing Point', color: '#eb9ac3', carPicture: 'car-forceindia.jpg' },
  'williams mercedes': { shortName: 'Williams', color: '#eff0f4', carPicture: 'car-williams.jpg' }
}

const teamsThatDontExist = [
  'mercedes',
  'ferrari',
  'red bull racing honda',
]

const ColumnTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  TEXT: 'text',
  TIME: 'time',
  DELTA: 'delta',
  CARPICTURE: 'picture'
}

const rankingColumn = { name: 'ranking', type: ColumnTypes.INTEGER, title: '' }
const carNumberColumn = { name: 'carnumber', type: ColumnTypes.INTEGER, title: '' }
const driverColumn = { name: 'driver', type: ColumnTypes.TEXT, title: '' }
const teamColumn = { name: 'team', type: ColumnTypes.TEXT, title: '' }
const timeColumn = { name: 'time', type: ColumnTypes.TIME, title: 'Lap Time' }
const lapTimeColumn = { name: 'laptime', type: ColumnTypes.TIME, title: 'Time' }
const q1Column = { name: 'q1', type: ColumnTypes.TIME, title: 'Q1 Lap Time' }
const q2Column = { name: 'q2', type: ColumnTypes.TIME, title: 'Q2 Lap Time' }
const q3Column = { name: 'q3', type: ColumnTypes.TIME, title: 'Q3 Lap Time' }
const stintColumn = { name: 'stint', type: ColumnTypes.STINT, title: 'Stint' }
const q1StintColumn = { name: 'q1stint', type: ColumnTypes.STINT, title: '' }
const q2StintColumn = { name: 'q2stint', type: ColumnTypes.STINT, title: '' }
const q3StintColumn = { name: 'q3stint', type: ColumnTypes.STINT, title: '' }
const deltaColumn = { name: 'delta', type: ColumnTypes.DELTA, title: 'Gap' }
const lapsColumn = { name: 'laps', type: ColumnTypes.INTEGER, title: 'Laps' }
const pointsColumn = { name: 'pts', type: ColumnTypes.INTEGER, title: 'Pts' }
const pitsColumn = { name: 'pits', type: ColumnTypes.INTEGER, title: 'Pit stops' }
const carPictureColumn = { name: 'carpicture', type: ColumnTypes.CARPICTURE, title: '' }

const templates = {

  practice: {
    title: "Practice session",
    defaultHeaderTitle: "F1.5 First Practice classification",
    samples: f1p5.samples.practice,
    inputColumns: [ rankingColumn, carNumberColumn, driverColumn, teamColumn, lapTimeColumn, deltaColumn, lapsColumn ],
    outputColumns: [ rankingColumn, driverColumn, teamColumn, lapTimeColumn, stintColumn, deltaColumn, lapsColumn ]
  },

  qualifying: {
    title: "Qualifying",
    defaultHeaderTitle: "F1.5 Qualifying classification",
    samples: f1p5.samples.qualifying,
    inputColumns: [ rankingColumn, carNumberColumn, driverColumn, teamColumn, q1Column, q2Column, q3Column, lapsColumn ],
    outputColumns: [ rankingColumn, driverColumn, teamColumn, q1Column, q1StintColumn, q2Column, q2StintColumn, q3Column, q3StintColumn, deltaColumn, lapsColumn ]
  },

  race: {
    title: "Race",
    defaultHeaderTitle: "F1.5 Race classification",
    samples: f1p5.samples.race,
    samplesPits: f1p5.samples.racePits,
    inputColumns: [ rankingColumn, carNumberColumn, driverColumn, teamColumn, lapsColumn, deltaColumn, pointsColumn ],
    outputColumns: [ rankingColumn, driverColumn, teamColumn, deltaColumn, pitsColumn, stintColumn ]
  },

  pits: {
    title: "Fastest pit stops",
    defaultHeaderTitle: "F1.5 Fastest pit stop award",
    style: "dhl",
    samples: f1p5.samples.race,
    inputColumns: [ rankingColumn, carNumberColumn, driverColumn, teamColumn, lapsColumn, deltaColumn, pointsColumn ],
    outputColumns: [ rankingColumn, teamColumn, driverColumn, carPictureColumn, timeColumn, pointsColumn ]
  }

}

// Exports

window.f1p5 = window.f1p5 || {}
window.f1p5.data = {
  tyres,
  teams,
  teamsThatDontExist,
  templates
}
