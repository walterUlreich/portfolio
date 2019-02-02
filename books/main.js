document.addEventListener('DOMContentLoaded', displayBooks())
document.addEventListener('DOMContentLoaded', getBook())

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

function getBook() {
  let bookId = localStorage.getItem('bookId')

  fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
    .then(res => res.json())
    .then(data => {

      let book = data

      let output = `
        <h3 class="book-title">${book["volumeInfo"]["title"]}</h3>
        <p>By: ${book["volumeInfo"]["authors"]}</p>
        <img src="${book["volumeInfo"]["imageLinks"]["thumbnail"]}" class="img-thumbnail">
        <p class="description">${book["volumeInfo"]["description"]}</p>
        <a class="btn btn-primary" href="index.html">Back to Search</a>
        <a class="btn btn-success" onclick="addBookToList('${book.id}')" id="add-book">Add Book to List  <i class="fas fa-plus"></i></a>
      `

      document.getElementById('book-info').innerHTML = output
    })
    .catch(err => console.log(err))
}

function addBookToList(id) {
  let bookList
  if(localStorage.getItem('bookList') === null) {
    bookList = []
  } else {
    bookList = JSON.parse(localStorage.getItem('bookList'))
  }

  bookList.push(id)

  localStorage.setItem('bookList', JSON.stringify(bookList))

  document.getElementById('add-book').innerHTML = 'Added to List! <i class="fas fa-check"></i>'
}

function displayBooks() {
  let bookList = JSON.parse(localStorage.getItem('bookList'))

  bookList.forEach((bookId) => {

    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
      .then(res => res.json())
      .then(data => {

        let book = data

        let html = `
        <tr id="${book["id"]}">
          <td scope="row" class="book-title">${book["volumeInfo"]["title"]}</td>
          <td>${book["volumeInfo"]["authors"]}</td>
          <td>${book["volumeInfo"]["categories"]}</td>
          <td class="text-center">${book["volumeInfo"]["printedPageCount"]}</td>
          <td>${book["volumeInfo"]["publisher"]}</td>
          <td class="text-center">${book["volumeInfo"]["averageRating"]}</td>
          <td class="info-link"><a onclick="bookSelected('${book["id"]}')"><i class="fas fa-book"></i></a></td>
          <td class="text-center"><a class="delete" onclick="deleteBook(this)">X</a></td>
        </tr>
        `
        document.getElementById('table-body').innerHTML += html
      })
  })
}

function deleteBook(item) {
  let bookRow = item.parentElement.parentElement
  bookRow.remove()

  let bookList = JSON.parse(localStorage.getItem('bookList'))
  bookList.forEach(function(book, index) {
    if(book === bookRow.id) {
      bookList.splice(index, 1)
    }
  })

  localStorage.setItem('bookList', JSON.stringify(bookList))
}

function clearFields() {
  let input = document.getElementById('input').value = ''
  let books = document.getElementById('books').innerHTML = ''
}
