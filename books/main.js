document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()

  let inputText = document.getElementById('input').value

  fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputText}&printType=books&startIndex=0&maxResults=40&key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
    .then(res => res.json())
    .then(data => {
      let bookList = data.items

      bookList.forEach((book) => {
        let html = `
          <div class="book">
            <h3 class="book-title">${book["volumeInfo"]["title"]}</h3>
            <p>By: ${book["volumeInfo"]["authors"]}</p>
            <img src="${book["volumeInfo"]["imageLinks"]["thumbnail"]}">
            <a onclick="bookSelected('${book.id}')" class="btn btn-primary" href="#">Book Info</a>
          </div>
        `
        document.getElementById('books').innerHTML += html
      })
    })
    .catch(err => console.log(err))

    clearFields()
})

function bookSelected(id) {
  localStorage.setItem('bookId', id)
  window.location = "book.html"
  return false
}

function clearFields() {
  document.getElementById('input').value = ''
  document.getElementById('books').innerHTML = ''
}
