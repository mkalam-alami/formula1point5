import domtoimage from "dom-to-image";
import "file-saver";
import Vue, { VNode } from "vue";
import { IColumn } from "./data/columns";
import { Season, season2019 } from "./data/seasons";
import { availableTableFormats, ITableFormat } from "./data/tables";
import * as f1TableParser from "./parser/f1-table-parser";
import { stintToMarkup } from "./parser/stint-parser";

interface IVueData {
  modelVersion: number;
  tab: string;
  tableFormatName: string;
  tableFormat: ITableFormat;
  rawData: string;
  rawDataPits: string;
  parsedData: any[];
  columns: IColumn[];

  title: string;
  city: string;
  flagUrl: string;
  gpName: string;

  currentSeason: Season;
  availableTableFormats: any;
  error: string;
  saveDate?: number;
}

const defaultData: IVueData = {
  modelVersion: 1, // Increment this after every model change to prevent currupted localStorage saves

  tab: "step1",
  tableFormatName: "",
  tableFormat: {
    title: "",
    inputColumns: [],
    outputColumns: [],
    samples: "",
    samplesPits: "",
    defaultHeaderTitle: "",
    style: "",
  },

  rawData: "",
  rawDataPits: "",
  parsedData: [],
  columns: [],

  title: "F1.5 First Practice Classification",
  city: "Austin",
  flagUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
  gpName: "United States GP",

  currentSeason: season2019,
  availableTableFormats,
  error: ""
};

// tslint:disable-next-line: no-unused-expression
new Vue({
  el: "#app",
  data() {
    try {
      const savedDataString = localStorage.getItem("data");
      if (savedDataString) {
        const savedData: IVueData = JSON.parse(savedDataString);
        if (savedData.modelVersion === defaultData.modelVersion
            && Date.now() - savedData.saveDate! < 24 * 3600 * 1000 /* expire after 1 day */) {
          return savedData;
        }
      }
    } catch (e) {
      // NOP
    }
    return deepCopy(defaultData);
  },
  watch: {
    tableFormatName(value: string) {
      this.tableFormat = (availableTableFormats as any)[value];
      this.rawData = this.tableFormat.samples || "";
      this.title = this.tableFormat.defaultHeaderTitle || this.title;
      this.runParser();
    },
  },
  methods: {
    runParser() {
      try {
        this.error = null as any;
        this.parsedData = f1TableParser.parseTable(
          this.rawData,
          this.rawDataPits,
          this.tableFormat.inputColumns,
          this.tableFormat.outputColumns,
          season2019);
      } catch (e) {
        console.error(e);
        this.error = e.message;
      }
    },
    tyres(tyresString: string) {
      return stintToMarkup(tyresString, season2019);
    },
    tableFormatClassNames() {
      const classNames: {[key: string]: boolean} = {};
      if (this.tableFormat.style) {
        classNames[this.tableFormat.style] = true;
      }
      return classNames;
    },
    infographicCellClass(column: any) {
      const classes: any = {};
      classes["infographic-" + column.name] = true;
      return classes;
    },
    carPicture(teamName: string) {
      if (this.currentSeason.teams[teamName.toLowerCase()]) {
        return "images/" + this.currentSeason.teams[teamName.toLowerCase()].carPicture;
      } else {
        return "";
      }
    },
    exportAsPng: async () => {
      const blob = await domtoimage.toPng(document.getElementsByClassName("infographic")[0]);
      try {
        window.saveAs(blob, "infographic.png");
      } catch (e) {
        console.error(e);
      }
    },
    saveState() {
      const save = deepCopy(this.$data as IVueData);
      save.saveDate = Date.now();
      localStorage.setItem("data", JSON.stringify(save));
    },
    discardState() {
      if (confirm("'Reset the page? All filled forms will be discarded.")) {
        localStorage.removeItem("data");
        location.reload();
      }
    }
  },
  filters: {
    json: (data: any) => {
      return JSON.stringify(data, null, 2);
    },
    firstName: (str: string) => {
      return str.split(" ")[0];
    },
    lastName: (str: string) => {
      return str.split(" ")[1];
    },
    shortTeamName: (teamName: string) => {
      return season2019.teams[teamName.toLowerCase()] ? season2019.teams[teamName.toLowerCase()].shortName : teamName;
    },
    stripeStyle: (teamName: string) => {
      if (season2019.teams[teamName.toLowerCase()]) {
        return "background-color: " + season2019.teams[teamName.toLowerCase()].color;
      } else {
        return "";
      }
    }
  },
  computed: {
    supportedTyres() {
      return (this as IVueData).currentSeason.tyres.join(" ");
    }
  },
  mounted() {
    this.tableFormatName = "qualifying";
  },
  beforeUpdate() {
    this.saveState();
  }
});

function deepCopy<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
