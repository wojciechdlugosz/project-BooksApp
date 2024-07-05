/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    listOfBooks: '.books-list'
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }
  
    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
    }

    render(){ // for every book render HTML, DOM element and add it to book list
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        
        const booksMenu = document.querySelector(select.listOfBooks);
        booksMenu.appendChild(generatedDOM);

      }
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.dom.booksList = document.querySelector(select.listOfBooks);
      thisBooksList.dom.form = document.querySelector('.filters');

    }

    initActions(){
      const thisBooksList = this;

      thisBooksList.dom.booksList.addEventListener('dblclick', function(event){ // add event listener to whole book list
        const clickedBook = event.target.closest('a');

        event.preventDefault();

        let bookId = clickedBook.getAttribute('data-id');

        if (!thisBooksList.favoriteBooks.includes(bookId)){ // add books to favorite list
          clickedBook.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
          console.log(thisBooksList.favoriteBooks);
        } else if (thisBooksList.favoriteBooks.includes(bookId)) {
          const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(indexOfBook, 1);
          clickedBook.classList.remove('favorite');
          console.log(thisBooksList.favoriteBooks);
        }
      });

      thisBooksList.dom.form.addEventListener('click', function(event){ // filters
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value); // show clicked input value
          
          if(event.target.checked){ // if clicked add it to filters array
            thisBooksList.filters.push(event.target.value);
          } else if(!event.target.checked){ // if not, delete
            thisBooksList.filters.splice((thisBooksList.filters.indexOf(event.target.value)), 1);
          }
        }
        console.log('filters', thisBooksList.filters);

        thisBooksList.filterBooks();
      });
    }

    filterBooks(){ // filter books according to chosen option
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;

        for(let filter of thisBooksList.filters){ // does chosen filter fits to each book details?
          if(!book.details[filter]){
            shouldBeHidden = true; // if it doesnt fit, stop loop and...
            break;
          }
        }

        const filteredBooks = document.querySelector('.book__image[data-id="' + book.id + '"]'); // ...find book with apropriate id...

        if(shouldBeHidden){
          filteredBooks.classList.add('hidden'); // ... and this book class hidden
        } else if(!shouldBeHidden){
          filteredBooks.classList.remove('hidden'); // remove class hidden when filter fits to book
        }
      }
    }

    determineRatingBgc(rating){ // determine rating color
      if(rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  const app = new BooksList();
  console.log(app);
}