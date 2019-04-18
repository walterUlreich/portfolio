const routes = [
  {
    path: '/',
    component: {
      template: `
        <div class="search">
          <input type="text" id="search" v-model="searchText" v-on:keyup.enter="searchBooks()" class="form-control" placeholder="search books..."/>
          <button class="btn btn-primary btn-block form-control" v-on:click="searchBooks()">Search</button>

          <div v-if="showResults" v-for="book in searchResults" class="results">
            <h3>{{ book.volumeInfo.title }}</h3>
            <p>
              By: {{ book.volumeInfo.authors[0] }}
            </p>
            <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" width="140" height="200" />
            <button class="btn btn-info" v-on:click="getBook(book.id)">Book Info</button>
          </div>

        </div>
      `,
      props: [""],
      data() {
        return {
          searchText: '',
          searchResults: [],
          showResults: false,
        }
      },
      methods: {
        searchBooks: function() {
          fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.searchText}&printType=books&startIndex=0&maxResults=10&key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
            .then(res => res.json())
            .then(data => {
              this.searchResults = data.items
              console.log(this.searchResults)
              this.showResults = true
            })
            .catch(err => console.log(err))
        },
        getBook: function(bookID) {
          this.$router.push({name:'book', params:{id:bookID}})
        }
      },
    }
  },
  {
    path: '/book/:id',
    name: 'book',
    component: {
      template: `
        <div class="book">
          <h3>{{ this.book.volumeInfo.title }}</h3>
          <p>By: {{ this.book.volumeInfo.authors[0] }}</p>
          <img v-bind:src="book.volumeInfo.imageLinks.small" />
          <p class="description">{{ this.book.volumeInfo.description }}</p>
          <router-link to="/" class="btn btn-primary">Back to Search</router-link>
          <button class="btn btn-success" v-on:click="addBookToList(book.id)"><template v-if="!added">Add Book to List <i class="fas fa-plus"></i></template><template v-else>Added to List! <i class="fas fa-check"></i></template></button>
        </div>
      `,
      props: [""],
      data() {
        return {
          bookID: this.$route.params.id,
          book: {},
          bookList: [],
          added: false
        }
      },
      methods: {
        addBookToList: function(bookID) {
          console.log(bookID)

          if(localStorage.getItem('bookList') === null) {
            this.bookList = []
          } else {
            this.bookList = JSON.parse(localStorage.getItem('bookList'))
          }

          this.bookList.push(bookID)

          localStorage.setItem('bookList', JSON.stringify(this.bookList))

          this.added = !this.added
        },
      },
      created: function() {
        console.log('created')

        fetch(`https://www.googleapis.com/books/v1/volumes/${this.bookID}?key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
          .then(res => res.json())
          .then(data => {

          this.book = data
          console.log(this.book)
          })
          .catch(err => console.log(err))
      },
    }
  },
  {
    path: '/book-list',
    component: {
      template: `
        <div class="book-list">
          <h2>Book List</h2>
          <div class="row">
            <div class="col-md-4" v-for="book in books">
              <h4>{{ book.volumeInfo.title }}</h4>
              <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" width="130" height="200" />
              <button class="btn btn-info btn-block" v-on:click="getBook(book.id)">Book Info</button>
              <button class="btn btn-danger btn-block" v-on:click="removeFromList(book.id)">Remove <i class="fas fa-times-circle"></i></button>
            </div>
          </div>
        </div>
      `,
      props: [""],
      data() {
        return {
          bookList: [],
          books: []
        }
      },
      methods: {
        getBook: function(bookID) {
          this.$router.push({name:'book', params:{id:bookID}})
        },
        removeFromList: function(bookID) {
          this.books.forEach((book, index) => {
            if (book.id === bookID) {
              this.books.splice(index, 1)
            }
          })

          this.bookList.forEach((id, index) => {
            if (id === bookID) {
              this.bookList.splice(index, 1)
            }
          })

          localStorage.setItem('bookList', JSON.stringify(this.bookList))
        }
      },
      created: function() {
        console.log('created')
        console.log('display books')
        this.bookList = JSON.parse(localStorage.getItem('bookList'))

        this.bookList.forEach((bookId) => {

          fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBs7uusp-LrsR5H0kpt5Fyoo40xQrlIZuk`)
            .then(res => res.json())
            .then(data => {

              this.books.push(data)
              console.log(this.books)

            })
        })
      },
    }
  },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  el: '#app',
  data: {},
  methods: {},
  computed: {},
  router
}).$mount('#app')
