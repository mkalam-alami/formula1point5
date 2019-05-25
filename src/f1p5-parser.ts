import { ColumnTypes } from './f1p5-data-2019';
import * as f1p5data from './f1p5-data-2019';

export const parseTable = (rawData: string, rawDataPits: string, inputColumns: Array<any>, outputColumns: Array<any>) => {
  if (!rawData || !outputColumns || outputColumns.length === 0) {
    return []
  }

  // Parse into a two-dimensional array
  const rawTable = parseStringToTable(rawData)
  const rawTablePits = rawDataPits ? parseStringToTable(rawDataPits) : null

  // Transform each line into an object, parse by column type
  let bestF1Time: number|null = null
  let rows = rawTable.map((rawLine: any) => {
    const row: any = {};
    rawLine.forEach((rawCell: any, index: number) => {
      const columnInfo = inputColumns[index]
      if (columnInfo) {
        const columnName = columnInfo.name
        let value

        switch (columnInfo.type) {
          case ColumnTypes.INTEGER: 
          value = parseInt(rawCell)
          break;
          
          case ColumnTypes.FLOAT: 
          value = parseFloat(rawCell)
          break;
          
          case ColumnTypes.TIME:
          value = parseTime(rawCell)
          break;

          case ColumnTypes.DELTA:
          if (!bestF1Time && rawCell.includes(':')) {
            bestF1Time = parseTime(rawCell)
          }
          value = rawCell
          break;

          default:
          value = rawCell
          
        }

        row[columnName] = { model: value }
      }
    });
    return { model: row };
  });

  // Filter out drivers that don't exist
  rows = rows.filter((row) => {
    return !f1p5data.teamsThatDontExist.includes(row.model.team.model.toLowerCase())
  })

  // Recalculate deltas (based on 'time' or 'q3' column)
  if (hasColumn(outputColumns, 'delta')) {
    if (!hasColumn(inputColumns, 'time') && !hasColumn(inputColumns, 'q3') && bestF1Time) {
      // Infer time column from deltas + best F1 time
      let bestDelta = 0
      rows.forEach(row => {
        const parsedDelta = parseDelta(row.model.delta.model)
        if (typeof parsedDelta === 'string') {
          row.model.time = { model: parsedDelta }
          row.model.delta = { model: parsedDelta }
        } else {
          bestDelta = bestDelta || parsedDelta
          row.model.time = { model: bestF1Time! + parsedDelta }
          row.model.delta = { model: parsedDelta - bestDelta }
        }
      })
    }

    else {
      // Set deltas from a reference time column
      const referenceColumnName = hasColumn(inputColumns, 'time') ? 'time' : 'q3'
      let bestTime = 0
      if (hasColumn(inputColumns, referenceColumnName)) {
        rows.map(row => {
          bestTime = bestTime || row.model[referenceColumnName].model
          row.model.delta = { model: row.model[referenceColumnName].model - bestTime }
        })
      }
    }
  }

  // Set rankings, format times and deltas
  const formattedRows = rows.map((row, index) => {
    row.model.ranking = { model: index + 1 }
    outputColumns.forEach(column => {
      const cell = row.model[column.name]
      if (cell && cell.model !== undefined) {
        switch (column.type) {
          case 'time':
          cell.model = formatTime(cell.model)
          break;
          
          case 'delta':
          cell.model = formatDelta(cell.model)
          break;

          default:
        }
      }
    })
    return row
  })

  // Count pit stops
  if (rawTablePits && hasColumn(outputColumns, 'pits')) {
    formattedRows.forEach(row => {
      row.model.pits = { model: 0 }
    })
    rawTablePits.forEach(pitInfo => {
      const driverName = pitInfo[2]
      const driverLines = formattedRows.filter(row => row.model.driver.model === driverName)
      if (driverLines.length > 0) {
        driverLines[0].model.pits.model++
      }
    })
  }

  // Extract target columns
  const targetRows = formattedRows.map((row) => {
    const targetRow: any = { model: {} }
    outputColumns.forEach(columnInfo => {
      if (row.model[columnInfo.name]) {
        targetRow.model[columnInfo.name] = row.model[columnInfo.name]
      } else {
        targetRow.model[columnInfo.name] = { model: '' }
      }
    })
    return targetRow
  })

  return targetRows

}

const parseStringToTable = (rawData: string) => {
  // Parse into a two-dimensional array
  const rawLines = rawData.trim().split(/[\r\n]+/g)
  const rawTable = rawLines.map((line: string) => {
    return line.split(/ ?\t/g)
  })
  if (rawTable[0][0].match(/[^0-9]/g)) {
    // Remove header
    rawTable.splice(0, 1)
  }
  return rawTable
}

const hasColumn = (columnList: Array<any>, name: string) => {
  return columnList.filter(type => type.name === name).length > 0
}

const parseTime = (str: string): number|null => {
  if (!str) {
    return null;
  } else if (str.match(/[^0-9:.]/g)) {
    return parseFloat(str) // Empty or DNF
  }

  const timeTokens = str.split(/[^0-9]/g).map(n => parseInt(n))
  let value = 0
  let minutesIndex = 0
  if (timeTokens.length === 4) {
    value += timeTokens[0] * 3600000
    minutesIndex = 1
  }
  value += timeTokens[minutesIndex] * 60000 + timeTokens[minutesIndex + 1] * 1000 + timeTokens[minutesIndex + 2]
  return value
}

const parseDelta = (str: string) => {
  if (!str) {
    return 0 // Leader
  }

  if (str.match(/[^0-9.+s]+/g)) {
    if (str.includes('lap')) str = '' // you can't be lapped if the cars don't exist
    return str // usually "DNF"
  } else {
    const deltaTokens = str.replace(/[+s]/g, '').split('.').map(n => parseInt(n))
    return deltaTokens[0] * 1000 + deltaTokens[1]
  }
}

const formatTime = (time: number) => {
  if (time > 0) {
    return (Math.floor(time / 60000.) || "0")
      + ":" + digits(Math.floor((time % 60000) / 1000.), 2)
      + "." + digits(time % 1000, 3)
  } else {
    return ""
  }
}

const formatDelta = (delta: number|string) => {
  if (typeof delta === 'number') {
    if (delta > 0) {
      return "+" + Math.floor(delta / 1000.)
        + "." + digits(delta % 1000, 3)
    } else {
      return "";
    }
  } else {
    // DNF, +n lap
    return delta
  }
}

const digits = (number: number, digits: number): string => {
  let str = number.toString()
  while (str.length < digits) {
    str =  "0" + str;
  }
  return str
}
