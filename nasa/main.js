class UI {
  paint(asteroids) {
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''

    asteroids.forEach((asteroid) => {

      let html = `
        <tr class="${asteroid.is_potentially_hazardous_asteroid}">
          <th scope="row">${asteroid.id}</th>
          <td>${asteroid.name}</td>
          <td>${asteroid.estimated_diameter.feet.estimated_diameter_max}</td>
          <td>${asteroid.close_approach_data[0]["relative_velocity"]["miles_per_hour"]}</td>
          <td>${asteroid.close_approach_data[0]["miss_distance"]["miles"]}</td>
          <td>${asteroid.is_potentially_hazardous_asteroid}</td>
        </tr>
      `

      tableBody.innerHTML += html
    })
  }
}




document.addEventListener('submit', (e) => {
  e.preventDefault()

  const asteroidDate = document.getElementById('date').value

  fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${asteroidDate}&end_date=${asteroidDate}&api_key=oVYuYjmTXpNRtt3f4oXMdm8EJGoybo73QLxLycCE`)
    .then(res => res.json())
    .then(data => {
      let asteroidArray = data["near_earth_objects"][asteroidDate]
      const ui = new UI
      ui.paint(asteroidArray)
    })
    .catch(err => console.log(err))
})
