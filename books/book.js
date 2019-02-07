document.addEventListener('DOMContentLoaded', getBook())

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
