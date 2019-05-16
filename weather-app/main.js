const app = new Vue({
  el: '#app',
  data: {
    city: '',
    current: {},
    lat: '',
    lon: '',
    temp: '',
    sunrise: '',
    sunset: '',
    description: '',
    humidity: '',
    main: '',
    showWeather: false,
    forecast: [],
    hourly: [],
    uvIndex: ''
  },
  methods: {
    findWeather: function() {

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=4533ef85d046764016e6061b18ad5b08`)
        .then(res => res.json())
        .then(data => {

          this.current = data

          this.lat = this.current.coord.lat
          this.lon = Math.abs(this.current.coord.lon)
          this.temp = ((this.current.main.temp * 9/5) - 459.67).toFixed(0)

          if(new Date(this.current.sys.sunrise * 1000).getMinutes().toString().length === 1) {
            this.sunrise = new Date(this.current.sys.sunrise * 1000).getHours() + ':' + '0' + new Date(this.current.sys.sunrise * 1000).getMinutes() + 'am'
          } else {
            this.sunrise = new Date(this.current.sys.sunrise * 1000).getHours() + ':' + new Date(this.current.sys.sunrise * 1000).getMinutes() + 'am'
          }

          if(new Date(this.current.sys.sunset * 1000).getMinutes().toString().length === 1) {
            this.sunset = new Date(this.current.sys.sunset * 1000).getHours() - 12 + ':' + '0' + new Date(this.current.sys.sunset * 1000).getMinutes() + 'pm'
          } else {
            this.sunset = new Date(this.current.sys.sunset * 1000).getHours() - 12 + ':' + new Date(this.current.sys.sunset * 1000).getMinutes() + 'pm'
          }

          this.description = this.current.weather[0].description

          this.humidity = this.current.main.humidity
          this.main = this.current.weather[0].main

          this.showWeather = true

          this.city = ''


        }).then(
          fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&APPID=4533ef85d046764016e6061b18ad5b08&cnt=8`)
            .then(res => res.json())
            .then(data => {

              this.hourly = []
              this.forecast = data.list
              //console.log(this.forecast)
              this.forecast.forEach((date) => {
                let unit = {
                  day: '',
                  time: '',
                  temp: ((date.main.temp * 9/5) - 459.67).toFixed(0),
                  main: date.weather[0].main
                }

                if(date["dt_txt"].charAt(5) === '0') {
                  unit.day = date["dt_txt"].substring(6, 7) + '/' + date["dt_txt"].substring(8, 10)
                } else {
                  unit.day = date["dt_txt"].substring(5, 7) + '/' + date["dt_txt"].substring(8, 10)
                }

                switch (date["dt_txt"].substring(11, 13)) {
                  case '00' :
                    unit.time = '12 AM'
                    break;
                  case '03' :
                    unit.time =  '3 AM'
                    break;
                  case '06' :
                    unit.time = '6 AM'
                    break;
                  case '09' :
                    unit.time = '9 AM'
                    break;
                  case '12' :
                    unit.time = '12 PM'
                    break;
                  case '15' :
                    unit.time = '3 PM'
                    break;
                  case '18' :
                    unit.time = '6 PM'
                    break;
                  case '21' :
                    unit.time = '9 PM'
                    break;
                }

                this.hourly.push(unit)
              })

              //console.log(this.hourly)
            })

        ).then(() => {
          fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=4533ef85d046764016e6061b18ad5b08&lat=${this.lat}&lon=${this.lon}`)
          .then(res => res.json())
          .then(data => {
            this.uvIndex = data.value.toFixed(0)
            console.log(this.uvIndex)
          })
        }

        )


    }
  },
  computed: {},
}).$mount('#app')
