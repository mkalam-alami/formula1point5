// Copy/pasted from https://www.formula1.com/en/results.html/2018/races/979/australia/practice-1.html
const demoData = `Pos 	No 	Driver 	Car 	Time 	Gap 	Laps
1 	44 	Lewis Hamilton 	Mercedes 	1:47.502 		6
2 	77 	Valtteri Bottas 	Mercedes 	1:48.806 	+1.304s 	7
3 	33 	Max Verstappen 	Red Bull Racing TAG Heuer 	1:48.847 	+1.345s 	9
4 	3 	Daniel Ricciardo 	Red Bull Racing TAG Heuer 	1:49.326 	+1.824s 	9
5 	5 	Sebastian Vettel 	Ferrari 	1:49.489 	+1.987s 	18
6 	7 	Kimi Räikkönen 	Ferrari 	1:49.928 	+2.426s 	20
7 	55 	Carlos Sainz 	Renault 	1:50.665 	+3.163s 	8
8 	8 	Romain Grosjean 	Haas Ferrari 	1:50.821 	+3.319s 	10
9 	16 	Charles Leclerc 	Sauber Ferrari 	1:50.961 	+3.459s 	14
10 	9 	Marcus Ericsson 	Sauber Ferrari 	1:51.016 	+3.514s 	14
11 	14 	Fernando Alonso 	McLaren Renault 	1:51.036 	+3.534s 	9
12 	47 	Lando Norris 	McLaren Renault 	1:51.232 	+3.730s 	9
13 	10 	Pierre Gasly 	Scuderia Toro Rosso Honda 	1:51.234 	+3.732s 	19
14 	11 	Sergio Perez 	Force India Mercedes 	1:51.459 	+3.957s 	18
15 	35 	Sergey Sirotkin 	Williams Mercedes 	1:51.589 	+4.087s 	14
16 	20 	Kevin Magnussen 	Haas Ferrari 	1:51.614 	+4.112s 	15
17 	31 	Esteban Ocon 	Force India Mercedes 	1:51.655 	+4.153s 	17
18 	27 	Nico Hulkenberg 	Renault 	1:51.717 	+4.215s 	7
19 	18 	Lance Stroll 	Williams Mercedes 	1:51.896 	+4.394s 	14
20 	38 	Sean Gelael 	Scuderia Toro Rosso Honda 	1:52.625 	+5.123s 	21`

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
const pointsColumn = { name: 'pits', type: ColumnTypes.INTEGER, label: 'Pts' }

const templates = {

  practice: {
    title: "Practice session",
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
    inputColumns: [
      rankingColumn,
      carNumberColumn,
      driverColumn,
      teamColumn,
      timeColumn,
      deltaColumn,
      pointsColumn
    ],
    outputColumns: [
      rankingColumn,
      driverColumn,
      teamColumn,
      deltaColumn,
      pointsColumn
    ]
  }

}

// Exports

window.f1p5 = window.f1p5 || {}
window.f1p5.data = {
  demoData,
  templates
}