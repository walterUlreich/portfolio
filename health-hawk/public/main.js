let totalCals = 0

class BMI {
  constructor(feet, inches, pounds) {
    this.feet = feet
    this.inches = inches
    this.pounds = pounds
  }

  calculateBMI() {
    let height = ((this.feet * 12) + this.inches) * 0.0254
    let weight = this.pounds * 0.45359237
    let bmi = (weight / (height * height)).toFixed(1)

    return bmi
  }
}

class UI {
  displayBMI(bmi) {
    let html = `
      </p>Your BMI</p>
      <h1>${bmi}</h1>

      <span class="badge badge-info">Underweight < 18.5</span>
      <span class="badge badge-success">Normal 18.5 - 24.9</span>
      <span class="badge badge-warning">Overweight 25 - 29.9</span>
      <span class="badge badge-danger">Obese > 30</span>
    `
    document.getElementById('bmi-div').innerHTML = html
  }

  addFoodItem(food) {
    const table = document.getElementById('table-body')
    let html = `
    <tr>
      <td scope="row">${food.name}</td>
      <td>${food.calories}</td>
      <td>${food.date}</td>
      <td><a href="#" class="delete">X</a></td>
    </tr>
    `
    table.innerHTML += html
  }

  displayCalories(food) {
    let cals = Number(food.calories)
    totalCals += cals

    let html = `
      <span class="badge badge-success">Your total calories: ${totalCals}</span>
    `
    document.getElementById('total-calories').innerHTML = html
  }

  updateCalories(cals) {
    totalCals -= cals

    let html = `
      <span class="badge badge-success">Your total calories: ${totalCals}</span>
    `
    document.getElementById('total-calories').innerHTML = html
  }

  clearFields() {
    document.getElementById('feet').value = ''
    document.getElementById('inches').value = ''
    document.getElementById('weight').value = ''

    document.getElementById('food').value = ''
    document.getElementById('calories').value = ''
    document.getElementById('date').value = ''
  }
}

document.getElementById('bmi-form').addEventListener('submit', (e) => {
  e.preventDefault()

  let feet = document.getElementById('feet').value
  let inches = document.getElementById('inches').value
  let weight = document.getElementById('weight').value

  const bmiResult = new BMI(Number(feet), Number(inches), Number(weight))
  const bmi = bmiResult.calculateBMI()

  const ui = new UI()

  if(feet === '' || inches === '' || weight === '') {
    alert("Please fill out the form")
  } else {
    ui.displayBMI(bmi)
    ui.clearFields()
  }

})


/*
  weight(kg) / height(cm) squared
  kg = lbs * 0.45359237
  cm = in * 2.54

  Underweight = < 18.5
  Normal = 18.5 to 24.9
  Overweight = 25 to 29.9
  Obese = > 30
*/

class Food {
  constructor(name, calories, date) {
    this.name = name
    this.calories = calories
    this.date = date
  }
}

class Store {
  static getFood() {
    let foodItems
    if(localStorage.getItem('foodItems') === null) {
      foodItems = []
    } else {
      foodItems = JSON.parse(localStorage.getItem('foodItems'))
    }

    return foodItems
  }

  static displayFood() {
    const foodItems = Store.getFood()

    foodItems.forEach(function(food) {
      const ui = new UI

      ui.addFoodItem(food)
      ui.displayCalories(food)
    })
  }

  static addFood(food) {
    const foodItems = Store.getFood()

    foodItems.push(food)

    localStorage.setItem('foodItems', JSON.stringify(foodItems))
  }

  static removeFood(name) {
    const foodItems = Store.getFood()

    foodItems.forEach(function(food, index) {
      if(food.name === name) {
        foodItems.splice(index, 1)
      }
    })

    localStorage.setItem('foodItems', JSON.stringify(foodItems))
  }

}

document.addEventListener('DOMContentLoaded', Store.displayFood())

document.getElementById('food-form').addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('food').value
  const calories = document.getElementById('calories').value
  const date = document.getElementById('date').value

  const month = date.substring(5, 7)
  const day = date.substring(8, 10)
  const year = date.substring(0, 4)
  const formatDate = `${month}/${day}/${year}`

  const foodItem = new Food(name, calories, formatDate)
  const ui = new UI()

  if(name === '' || calories === '' || date === '') {
    alert("Please fill out the form")
  } else {
    ui.addFoodItem(foodItem)
    Store.addFood(foodItem)
    ui.displayCalories(foodItem)
    ui.clearFields()
  }

})

/*
  month = date.substring(5, 7)
  day = date.substring(8 ,10)
  year = date.substring(0, 4)
  formatDate = month.concat("/").concat(day).concat("/").concat(year)
*/

document.getElementById('table-body').addEventListener('click', (e) => {
  e.preventDefault()

  if(e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove()
    let cals = Number(e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML)
    const ui = new UI()
    Store.removeFood(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML)
    ui.updateCalories(cals)
  }
})
