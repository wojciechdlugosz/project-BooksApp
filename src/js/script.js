/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    
  'use strict';

  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');

  function render(){

    for(let book of dataSource.books){
      //console.log(book);
      const generatedHTML = bookTemplate(book);
      //console.log(generatedHTML);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      //console.log(generatedDOM);
      booksList.appendChild(generatedDOM);
    }

  }

  // add books to favorites
  const favoriteBooks = [];

  function initActions(){
    // add event listener to whole book list
    booksList.addEventListener('dblclick', function(event){
      const clickedBook = event.target.closest('a');
      console.log(clickedBook);

      event.preventDefault();

      let bookId = clickedBook.getAttribute('data-id');

      // check if book is or is not in favorite array
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
  }

  function init(){
    render();
    initActions();
  }

  init();

}