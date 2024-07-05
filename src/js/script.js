/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    
  'use strict';

  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');

  function render(){

    for(let book of dataSource.books){
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      //console.log(book);
      const generatedHTML = bookTemplate(book);
      //console.log(generatedHTML);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      //console.log(generatedDOM);
      booksList.appendChild(generatedDOM);
    }

  }

  const favoriteBooks = [];
  const filters = [];
  filters.form = document.querySelector('.filters');

  function initActions(){
    // add event listener to whole book list
    booksList.addEventListener('dblclick', function(event){
      const clickedBook = event.target.closest('a');
      console.log(clickedBook);

      event.preventDefault();

      let bookId = clickedBook.getAttribute('data-id');

      // add books to favorite list
      if (!favoriteBooks.includes(bookId)){
        // add class favorite to clicked book
        clickedBook.classList.add('favorite');
        // add this book id to array
        favoriteBooks.push(bookId);
        console.log(favoriteBooks);
      } else if (favoriteBooks.includes(bookId)) {
        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook, 1);
        clickedBook.classList.remove('favorite');
        console.log(favoriteBooks);
      }
    });

    // filters
    filters.form.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value); // show clicked input value

        if(event.target.checked){ // if clicked add it to filters array
          filters.push(event.target.value);
        } else if(!event.target.checked){ // if not, delete
          filters.splice((filters.indexOf(event.target.value)), 1);
        }
      }
      console.log('filters', filters);

      filterBooks();
    });

  }

  function filterBooks(){ // filter books according to chosen option
    for(let book of dataSource.books){
      let shouldBeHidden = false;

      for(let filter of filters){ // does chosen filter fits to each book details?
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

  function determineRatingBgc(rating){ // determine rating color
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

  function init(){
    render();
    initActions();
  }

  init();

}