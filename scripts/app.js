const vue = new Vue({
  el: '#app',
  data: {
    tab: 'step1',
    templateName: '',
    template: {
      title: '',
      inputColumns: [],
      outputColumns: []
    },
    
    rawData: '',
    rawDataPits: '',
    parsedData: [],
    columns: [],

    title: 'F1.5 First Practice Classification',
    city: 'Austin',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
    gpName: 'United States GP',

    availableTemplates: f1p5.data.templates,
    supportedTyres: f1p5.data.tyres.join(' '),
    error: ''
  },
  watch: {
    templateName: function (value) {
      this.template = f1p5.data.templates[value]
      this.rawData = this.template.samples || ''
      this.rawDataPits = this.template.samplesPits || ''
      this.title = this.template.defaultHeaderTitle || this.title
      this.runParser()
    }
  },
  methods: {
    runParser: function () {
      try {
        this.error = null
        this.parsedData = f1p5.parser.parseTable(
          this.rawData,
          this.rawDataPits,
          this.template.inputColumns,
          this.template.outputColumns)
      } catch (e) {
        console.error(e)
        this.error = e.message
      }
    },
    tyres: function (tyresString) {
      return tyresString.trim().split(' ').map(rawTyreCode => {
        const tyreCode = rawTyreCode.toUpperCase()
        if (f1p5.data.tyres.includes(tyreCode)) {
          return '<span class="tyre ' + tyreCode + '">('
              + '<span class="letter">' + tyreCode + '</span>'
              + ')</span> '
        } else {
          return ''
        }
      }).join('')
    },
    infographicCellClass: function (column) {
      let classes = {}
      classes['infographic-' + column.name] = true;
      return classes
    }
  },
  filters: {
    json: (data) => {
      return JSON.stringify(data, null, 2)
    },
    firstName: (str) => {
      return str.split(' ')[0]
    },
    lastName: (str) => {
      return str.split(' ')[1]
    },
    shortTeamName: (teamName) => {
      return teams[teamName] ? teams[teamName].shortname : teamName
    },
    stripeStyle: (teamName) => {
      return teams[teamName] ? 'background-color: ' + teams[teamName].color : ''
    }
  }
})

vue.templateName = 'qualifying'

document.getElementById('save').addEventListener('click', async () => {
  domtoimage.toPng(document.getElementsByClassName('infographic')[0])
    .then((blob) => {
      window.saveAs(blob, 'infographic.png')
    })
    .catch((e) => {
      console.error(e)
    })
})
