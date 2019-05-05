const app = new Vue({
  el: '#app',
  data: {
    userName: 'wulreich99',
    feet: '',
    inches: '',
    pounds: '',
    height: '',
    weight: '',
    bmi: '',
    showBMI: false,
    food: '',
    calories: '',
    date: '',
    month: '',
    day: '',
    year: '',
    formateDate: '',
    foodItem: {},
    foodItems: [],
    totalCals: 0,
    id: ''
  },
  methods: {
    displayBMI: function() {
      this.showBMI = true
      this.height = ((this.feet * 12) + Number(this.inches)) * ((this.feet * 12) + Number(this.inches))
      this.weight = this.pounds * 703
      this.bmi = (this.weight / this.height).toFixed(1)

      this.feet = ''
      this.inches = ''
      this.pounds = ''
    },
    addFoodItem: function() {
      this.month = this.date.substring(5, 7)
      this.day = this.date.substring(8, 10)
      this.year = this.date.substring(0, 4)
      this.formatDate = `${this.month}/${this.day}/${this.year}`

      this.makeID()

      this.foodItem = {
        id: this.id,
        food: this.food,
        calories: this.calories,
        date: this.formatDate,
      }

      this.foodItems.push(this.foodItem)
      localStorage.setItem('foodItems', JSON.stringify(this.foodItems))
      this.totalCals += Number(this.foodItem.calories)
      console.log(this.totalCals)

      this.food = ''
      this.calories = ''
      this.date = ''
    },
    deleteItem: function(id, cals) {
      console.log(id, cals)
      this.foodItems.forEach((item, index) => {
        if(item.id === id) {
          this.foodItems.splice(index, 1)
          this.totalCals -= Number(cals)
        }
      })

      localStorage.setItem('foodItems', JSON.stringify(this.foodItems))
    },
    clearList: function() {
      this.foodItems = []
      localStorage.setItem('foodItems', JSON.stringify(this.foodItems))
      this.totalCals = 0
      this.id = 0
    },
    makeID: function() {
      let result = ''
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for(let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      this.id = result
    }
  },
  created: function() {
    if(JSON.parse(localStorage.getItem('foodItems'))) {
      this.foodItems = JSON.parse(localStorage.getItem('foodItems'))
    }

    if(this.foodItems.length > 0) {
      this.foodItems.forEach((item) => {
        this.totalCals += Number(item.calories)
      })
    }
  }
}).$mount('#app')
