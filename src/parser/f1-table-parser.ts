import { ColumnType, IColumn } from "../data/columns";
import { Season } from "../data/seasons";

export interface IBindableModel {
  model: string;
}
export interface IBindableRow {
  model: {[key: string]: IBindableModel};
}

export const parseTable = (
      rawData: string,
      rawDataPits: string,
      inputColumns: IColumn[],
      outputColumns: IColumn[],
      season: Season
    ): IBindableRow[] => {
  if (!rawData || !outputColumns || outputColumns.length === 0) {
    return [];
  }

  // Parse into a two-dimensional array
  const rawTable = parseStringToTable(rawData);
  const rawTablePits = rawDataPits ? parseStringToTable(rawDataPits) : null;

  // Transform each line into an object, parse by column type
  let bestF1Time = 0;
  let rows: IBindableRow[] = rawTable.map((rawLine: string[]) => {
    const row: IBindableRow = { model: {} };
    rawLine.forEach((rawCell: string, index: number) => {
      const columnInfo = inputColumns[index];
      if (columnInfo) {
        const columnName = columnInfo.name;
        let value = "";

        if (rawCell) {
          switch (columnInfo.type as ColumnType) {
            case "integer":
            value = parseInt(rawCell, 10).toString();
            break;

            case "float":
            value = parseFloat(rawCell).toString();
            break;

            case "time":
            value = parseTime(rawCell).toString();
            break;

            case "delta":
            if (!bestF1Time && rawCell.includes(":")) {
              bestF1Time = parseTime(rawCell);
            }
            value = rawCell;
            break;

            default:
            value = rawCell;
          }
        }

        row.model[columnName] = { model: value };
      }
    });
    return row;
  });

  // Filter out drivers that don't exist
  rows = rows.filter((row) => {
    if (row.model.team) {
      return !season.teamsThatDontExist.includes(row.model.team.model.toLowerCase());
    } else {
      return true;
    }
  });

  // Recalculate deltas (based on 'time' or 'q3' column)
  if (hasColumn(outputColumns, "delta")) {
    if (!hasColumn(inputColumns, "time") && !hasColumn(inputColumns, "q3") && bestF1Time) {
      // Infer time column from deltas + best F1 time
      let bestDelta = 0;
      rows.forEach((row) => {
        const parsedDelta = parseDelta(row.model.delta.model);
        if (typeof parsedDelta === "string") {
          row.model.time = { model: parsedDelta };
          row.model.delta = { model: parsedDelta };
        } else {
          bestDelta = bestDelta || parsedDelta;
          row.model.time = { model: (bestF1Time! + parsedDelta).toString() };
          row.model.delta = { model: (parsedDelta - bestDelta).toString() };
        }
      });
    } else {
      // Set deltas from a reference time column
      const referenceColumnName = hasColumn(inputColumns, "time") ? "time" : "q3";
      let bestTime = 0;
      if (hasColumn(inputColumns, referenceColumnName)) {
        rows.map((row) => {
          const rowTime = parseFloat(row.model[referenceColumnName].model);
          bestTime = bestTime || rowTime;
          row.model.delta = { model: (rowTime - bestTime).toString() };
        });
      }
    }
  }

  // Set rankings, format times and deltas
  const formattedRows = rows.map((row, index) => {
    row.model.ranking = { model: (index + 1).toString() };
    outputColumns.forEach((column) => {
      const cell = row.model[column.name];
      if (cell && cell.model !== undefined) {
        switch (column.type) {
          case "time":
          cell.model = formatTime(cell.model);
          break;

          case "delta":
          cell.model = formatDelta(cell.model);
          break;

          default:
        }
      }
    });
    return row;
  });

  // Count pit stops
  if (rawTablePits && hasColumn(outputColumns, "pits")) {
    const pitCount = formattedRows.map((_) => 0);
    rawTablePits.forEach((pitInfo) => {
      const driverName = pitInfo[2];
      const driverIndex = formattedRows.findIndex((row) => row.model.driver.model === driverName);
      if (driverIndex !== -1) {
        pitCount[driverIndex]++;
      }
    });
    formattedRows.forEach((row, index) => {
      row.model.pits = {
        model: pitCount[index].toString()
      };
    });
  }

  // Extract target columns
  const targetRows = formattedRows.map((row) => {
    const targetRow: IBindableRow = { model: {} };
    outputColumns.forEach((columnInfo) => {
      if (row.model[columnInfo.name]) {
        targetRow.model[columnInfo.name] = row.model[columnInfo.name];
      } else {
        targetRow.model[columnInfo.name] = { model: "" };
      }
    });
    return targetRow;
  });

  return targetRows;

};

const parseStringToTable = (rawData: string) => {
  // Parse into a two-dimensional array
  const rawLines = rawData.trim().split(/[\r\n]+/g);
  const rawTable = rawLines.map((line: string) => {
    return line.split(/ ?\t/g);
  });
  if (rawTable[0][0].match(/[^0-9]/g)) {
    // Remove header
    rawTable.splice(0, 1);
  }
  return rawTable;
};

const hasColumn = (columnList: IColumn[], name: string) => {
  return columnList.filter((type) => type.name === name).length > 0;
};

const parseTime = (str: string): number => {
  if (!str) {
    throw Error("time is empty");
  } else if (str.match(/[^0-9:.]/g)) {
    return parseFloat(str); // Empty or DNF
  }

  const timeTokens = str.split(/[^0-9]/g).map((n) => parseInt(n, 10));
  let value = 0;
  let minutesIndex = 0;
  if (timeTokens.length === 4) {
    value += timeTokens[0] * 3600000;
    minutesIndex = 1;
  }
  value += timeTokens[minutesIndex] * 60000 + timeTokens[minutesIndex + 1] * 1000 + timeTokens[minutesIndex + 2];
  return value;
};

const parseDelta = (str: string) => {
  if (!str) {
    return 0; // Leader
  }

  if (str.match(/[^0-9.+s]+/g)) {
    if (str.includes("lap")) { str = ""; } // you can't be lapped if the cars don't exist
    return str; // usually "DNF"
  } else {
    const deltaTokens = str.replace(/[+s]/g, "").split(".").map((n) => parseInt(n, 10));
    return deltaTokens[0] * 1000 + deltaTokens[1];
  }
};

const formatTime = (timeString: string) => {
  const time = parseFloat(timeString);
  if (time > 0) {
    return (Math.floor(time / 60000.) || "0")
      + ":" + digits(Math.floor((time % 60000) / 1000.), 2)
      + "." + digits(time % 1000, 3);
  } else {
    return "";
  }
};

const formatDelta = (deltaString: string) => {
  try {
    const delta = parseFloat(deltaString);
    if (delta > 0) {
      return "+" + Math.floor(delta / 1000.)
        + "." + digits(delta % 1000, 3);
    } else {
      return "";
    }
  } catch (e) {
    // Non numeric deltas ("DNF", "+n lap")
    return deltaString;
  }
};

const digits = (value: number, digitsCount: number): string => {
  let str = value.toString();
  while (str.length < digitsCount) {
    str =  "0" + str;
  }
  return str;
};
