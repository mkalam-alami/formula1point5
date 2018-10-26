
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

const parseTable = (rawString, inputColumns, outputColumns) => {
  if (!outputColumns || outputColumns.length === 0) {
    return
  }

  // Parse into a two-dimensional array
  const rawLines = rawString.trim().split(/[\r\n]+/g)
  const rawTable = rawLines.map(line => {
    return line.split(/ ?\t/g)
  })
  if (rawTable[0][0].match(/[^1-9]/g)) {
    // Remove header
    rawTable.splice(0, 1)
  }

  // Transform each line into an object, parse by column type
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
          const timeTokens = rawCell.split(/[^0-9]/g).map(n => parseInt(n))
          value = timeTokens[0] * 60000 + timeTokens[1] * 1000 + timeTokens[2]
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

  // Recalculate rankings and deltas
  const hasDeltaColumn = outputColumns.filter(type => type.name === 'delta').length > 0
  if (hasDeltaColumn) {
    // Find leading time
    let bestTime
    rows.forEach((row) => {
      if (!bestTime || row.model.time.model < bestTime) {
        bestTime = row.model.time.model
      }
    })

    // Set deltas
    rows.map((row) => {
      row.model.delta.model = row.model.time.model - bestTime
    })
  }

  // Set rankings, format times and deltas
  const formattedRows = rows.map((row, index) => {
    row.model.ranking = { model: index + 1 }
    row.model.time.model = formatTime(row.model.time.model)
    row.model.delta.model = formatDelta(row.model.delta.model)
    return row
  })

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

const formatTime = (time) => {
  return (Math.floor(time / 60000.) || "0")
    + ":" + digits(Math.floor((time % 60000) / 1000.), 2)
    + "." + digits(time % 1000, 3)
}

const formatDelta = (delta) => {
  if (delta > 0) {
    return "+" + Math.floor(delta / 1000.)
      + "." + digits(delta % 1000, 3)
  } else {
    return "";
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