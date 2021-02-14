/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
The `showPage` function creates and appends nine student elements to the current page. When invoked, it is supplied with the full list of students 
and the current page. Using a for loop, it checks so that there are only nine students on each page and in the correct order. It then grabs data 
from each object in the list of students, creates an HTML element and outputs that one element to the DOM tree.
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentOnPage =
            `<li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
            </li>`
         studentList.insertAdjacentHTML('beforeend', studentOnPage);
      }
   }
}

/*
The `addPagination` function adds all the buttons and their functionality. It first establishes the total number of pages. It then uses a for 
loop to create and append each button to the DOM tree. And the very first button that is within an li tag on the page is always turned blue. 
Then, using an event listener, a conditional checks if an element is clicked that is a button. If so, the one blue button it can find is turned 
white and the currently pressed button is turned blue. Last, the showPage function is invoked passing the list of students and the number of the 
clicked button as arguments. This means that only one button is ever active, or blue, and that the correct page is shown when a button is clicked.
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      const button =
      `<li>
      <button type="button">${i}</button>
      </li>`
      linkList.insertAdjacentHTML('beforeend', button);
      document.querySelector('li button').className = 'active';
   }

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   })
}

/*
The `performSearch` function contains the search functionality that is later used. First, 42 student objects are looped through and if the search 
contains at least one character and if it matches partially either first name or last name, the match is pushed to the results array. The `showPage`
function is invoked to display all search matches. The `addPagination` function is invoked to present the corresponding buttons. Finally, if there 
are no search results a message stating this is displayed.
*/
function performSearch(search, list) {
   const resultsArray = [];
   for (let i = 0; i < list.length; i++) {
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();
      if (search.length !== 0 && firstName.includes(search) || lastName.includes(search)) {
         resultsArray.push(list[i]);
      }
   }

   showPage(resultsArray, 1);
   addPagination(resultsArray);
   if (resultsArray.length === 0) {
      document.querySelector('.student-list').innerHTML = 'Sorry, no matches.';
   }
}

//The `search` function creates a search bar and displays it to the page. The search button and the search box are then stored in variables.
function search(list) {
   const header = document.querySelector('.header');
   const searchBar =
      `<label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`
   header.insertAdjacentHTML('beforeend', searchBar);
   const searchButton = document.querySelector('button')
   const searchBox = document.querySelector('.student-search');

   //Using a click event listener, the search functionality is invoked to the search button.
   searchButton.addEventListener('click', (e) => {
      const searchBoxEntry = document.querySelector('#search').value;
      const search = searchBoxEntry.toLowerCase();
      performSearch(search, list);
   })

   //Using a keyup event listener, the search functionality is invoked to the search box.
   searchBox.addEventListener('keyup', (e) => {
      const search = e.target.value.toLowerCase();
      performSearch(search, list);
   })
}

//All functions are called initially when the page is loaded to add the students on the first page, the buttons and the search box.
showPage(data, 1);
addPagination(data);
search(data);