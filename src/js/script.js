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
    const bookCovers = booksList.querySelectorAll('.book__image');
    //console.log(bookCovers);

    for(let bookCover of bookCovers){
      bookCover.addEventListener('dblclick', function(event){
        event.preventDefault();

        // add class favorite to clicked book
        bookCover.classList.add('favorite');

        // add this book id to array
        let bookId = bookCover.getAttribute('data-id');
        favoriteBooks.push(bookId);
        //console.log(favoriteBooks);
      });
    }
  }

  function init(){
    render();
    initActions();
  }

  init();

}