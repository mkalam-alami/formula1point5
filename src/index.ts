import Vue from 'vue';
import domtoimage from 'dom-to-image';
import 'file-saver';

import * as f1p5data from './f1p5-data-2019';
import * as f1p5parser from './f1p5-parser';

interface Data {
  tab: string;
  templateName: string,
  template: f1p5data.TableFormat,
  rawData: string,
  rawDataPits: string,
  parsedData: any[],
  columns: any[],

  title: string,
  city: string,
  flagUrl: string,
  gpName: string,

  availableTemplates: any,
  supportedTyres: string,
  error: string
}

const defaultData: Data = {
  tab: 'step1',
  templateName: '',
  template: {
    title: '',
    inputColumns: [],
    outputColumns: [],
    samples: '',
    samplesPits: '',
    defaultHeaderTitle: '',
    style: ''
  },
  
  rawData: '',
  rawDataPits: '',
  parsedData: [],
  columns: [],

  title: 'F1.5 First Practice Classification',
  city: 'Austin',
  flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
  gpName: 'United States GP',

  availableTemplates: f1p5data.templates,
  supportedTyres: f1p5data.tyres.join(' '),
  error: ''
}

const vue = new Vue({
  el: '#app',
  data: defaultData,
  watch: {
    templateName: function (value: string) {
      this.template = (f1p5data.templates as any)[value]
      this.rawData = this.template.samples || ''
      this.rawDataPits = this.template.samplesPits || ''
      this.title = this.template.defaultHeaderTitle || this.title
      this.runParser()
    }
  },
  methods: {
    runParser: function () {
      try {
        this.error = null as any
        this.parsedData = f1p5parser.parseTable(
          this.rawData,
          this.rawDataPits,
          this.template.inputColumns,
          this.template.outputColumns)
      } catch (e) {
        console.error(e)
        this.error = e.message
      }
    },
    tyres: function (tyresString: string) {
      return tyresString.trim().split(' ').map(rawTyreCode => {
        const tyreCode = rawTyreCode.toUpperCase()
        if (f1p5data.tyres.includes(tyreCode)) {
          return '<span class="tyre ' + tyreCode + '">('
              + '<span class="letter">' + tyreCode + '</span>'
              + ')</span> '
        } else {
          return ''
        }
      }).join('')
    },
    templateClassNames: function () {
      const classNames = {} as any
      if (this.template.style) {
        classNames[this.template.style] = true
      }
      return classNames
    },
    infographicCellClass: function (column: any) {
      let classes: any = {}
      classes['infographic-' + column.name] = true;
      return classes
    },
    carPicture: (teamName: string) => {
      return f1p5data.teams[teamName.toLowerCase()] ? 'images/' + f1p5data.teams[teamName.toLowerCase()].carPicture : ''
    },
    save: async () => {
      const blob = await domtoimage.toPng(document.getElementsByClassName('infographic')[0])
      try {
        window.saveAs(blob, 'infographic.png')
      } catch(e) {
        console.error(e)
      }
    }
  },
  filters: {
    json: (data: any) => {
      return JSON.stringify(data, null, 2)
    },
    firstName: (str: string) => {
      return str.split(' ')[0]
    },
    lastName: (str: string) => {
      return str.split(' ')[1]
    },
    shortTeamName: (teamName: string) => {
      return f1p5data.teams[teamName.toLowerCase()] ? f1p5data.teams[teamName.toLowerCase()].shortName : teamName
    },
    stripeStyle: (teamName: string) => {
      return f1p5data.teams[teamName.toLowerCase()] ? 'background-color: ' + f1p5data.teams[teamName.toLowerCase()].color : ''
    }
  },
  mounted: function () {
    this.templateName = 'qualifying'
  }
})
