
const ColumnTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  TEXT: 'text',
  TIME: 'time',
  DELTA: 'delta'
}


// TODO Also list drivers that exist and their teams to display people who didn't join the session
const teamsThatDontExist = [
  'Mercedes',
  'Ferrari',
  'Red Bull Racing TAG Heuer',
]

const parseTable = (rawData, rawDataPits, inputColumns, outputColumns) => {
  if (!rawData || !outputColumns || outputColumns.length === 0) {
    return
  }

  // Parse into a two-dimensional array
  const rawTable = parseStringToTable(rawData)
  const rawTablePits = rawDataPits ? parseStringToTable(rawDataPits) : null

  // Transform each line into an object, parse by column type
  let bestF1Time = null
  let rows = rawTable.map(rawLine => {
    const row = {};
    rawLine.forEach((rawCell, index) => {
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
    return !teamsThatDontExist.includes(row.model.team.model)
  })

  // Recalculate deltas (based on 'time' or 'q3' column)
  if (hasColumn(outputColumns, 'delta')) {
    if (!hasColumn(inputColumns, 'time') && !hasColumn(inputColumns, 'q3') && bestF1Time) {
      // Infer time column from deltas + best F1 time
      let bestDelta = null
      rows.forEach(row => {
        const parsedDelta = parseDelta(row.model.delta.model)
        if (parsedDelta.isSpecialLabel) {
          row.model.time = { model: parsedDelta.Value }
          row.model.delta = { model: parsedDelta.value }
        } else {
          bestDelta = bestDelta || parsedDelta.value
          row.model.time = { model: bestF1Time + parsedDelta.value }
          row.model.delta = { model: parsedDelta.value - bestDelta }
        }
      })
    }

    else {
      // Set deltas from a reference time column
      const referenceColumnName = hasColumn(inputColumns, 'time') ? 'time' : 'q3'
      let bestTime = null
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
    const targetRow = { model: {} }
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

const parseStringToTable = (rawData) => {
  // Parse into a two-dimensional array
  const rawLines = rawData.trim().split(/[\r\n]+/g)
  const rawTable = rawLines.map(line => {
    return line.split(/ ?\t/g)
  })
  if (rawTable[0][0].match(/[^0-9]/g)) {
    // Remove header
    rawTable.splice(0, 1)
  }
  return rawTable
}

const hasColumn = (columnList, name) => {
  return columnList.filter(type => type.name === name).length > 0
}

const parseTime = (str) => {
  if (!str || str.match(/[^0-9:.]/g)) {
    return str // Empty or DNF
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

const parseDelta = (str) => {
  if (!str) {
    return 0 // Leader
  }

  if (str.match(/[^0-9.+s]+/g)) {
    if (str.includes('lap')) str += ' to F1'
    return { isSpecialLabel: true, value: str } // usually "DNF", "+n lap"
  } else {
    const deltaTokens = str.replace(/[+s]/g, '').split('.').map(n => parseInt(n))
    return { isSpecialLabel: false, value: deltaTokens[0] * 1000 + deltaTokens[1] }
  }
}

const formatTime = (time) => {
  if (time > 0) {
    return (Math.floor(time / 60000.) || "0")
      + ":" + digits(Math.floor((time % 60000) / 1000.), 2)
      + "." + digits(time % 1000, 3)
  } else {
    return ""
  }
}

const formatDelta = (delta) => {
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

const digits = (number, digits) => {
  let str = number.toString()
  while (str.length < digits) {
    str =  "0" + str;
  }
  return str
}

// Exports

window.f1p5 = window.f1p5 ||{}
window.f1p5.parser = {
  parseTable
}