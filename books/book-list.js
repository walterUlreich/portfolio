document.addEventListener('DOMContentLoaded', displayBooks())

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

function bookSelected(id) {
  localStorage.setItem('bookId', id)
  window.location = "book.html"
  return false
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
