const vue = new Vue({
  el: '#app',
  data: {
    tab: 'step1',
    
    rawData: f1p5.data.demoData,
    parsedData: [],
    columns: [],

    title: 'F1.5 First Practice Classification',
    city: 'Austin',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
    gpName: 'United States GP',

    supportedTyres: 'YUsSMHhIW',
    error: ''
  },
  methods: {
    runParser: function () {
      try {
      this.parsedData = f1p5.parser.parseTable(
        this.rawData,
        f1p5.data.practiceDataColumns,
        f1p5.data.classificationTargetColumns)
      this.columns = f1p5.data.classificationTargetColumns
      } catch (e) {
        console.error(e)
        this.error = e.message
      }
    },
    tyres: function (tyresString) {
      return tyresString.trim().split('').map(letter => {
          if (!this.supportedTyres.includes(letter) && this.supportedTyres.includes(letter.toUpperCase())) {
            letter = letter.toUpperCase()
          }
          return '<span class="tyre ' + letter + '">('
              + '<span class="letter">' + letter.toUpperCase().replace('Y', 'H') + '</span>'
              + ')</span> '
        }).join('')
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

vue.runParser()

document.getElementById('save').addEventListener('click', async () => {
  domtoimage.toPng(document.getElementsByClassName('infographic')[0])
    .then((blob) => {
      console.log(blob)
      window.saveAs(blob, 'infographic.png')
    })
    .catch((e) => {
      console.error(e)
    })
})