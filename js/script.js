/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//The search functionality. A search bar is created and displayed on the page.

function search(list) {
   const header = document.querySelector('.header');
   const searchBar =
      `<label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`
   header.insertAdjacentHTML('beforeend', searchBar);

/* 
The first part of the search functionality is the search button. Using a click event listener, we begin with an empty array for the search results.
Using a for loop, all 42 student objects are looped through. With a conditional statement, search is checked to see if what is entered is at least 
1 character and if all that is entered matches either first name or last name. If so, that matching student object is pushed into the new results array.
The showpage function is invoked using the new results array to display all search matches.
*/
   const searchButton = document.querySelector('button')

   searchButton.addEventListener('click', (e) => {
      const searchEntry = document.querySelector('#search').value;
      const resultsArray = [];
      const search = searchEntry.toLowerCase();

      for (let i = 0; i < list.length; i++) {
         const firstName = list[i].name.first.toLowerCase();
         const lastName = list[i].name.last.toLowerCase();
         if (searchEntry.length !== 0 && firstName.includes(search) || lastName.includes(search)) {
            resultsArray.push(list[i]);
         }

      }
      showPage(resultsArray, 1);

   })
   
/*
The second part of the search functionality is placed in a second event listener. It is very similar to the first event listener but listens for
a keyup event instead of a click of the search button.
*/
   const searchBox = document.querySelector('.student-search');
   searchBox.addEventListener('keyup', (e) => {
      const resultsArray = [];
      const search = e.target.value.toLowerCase();

      for (let i = 0; i < list.length; i++) {
         const firstName = list[i].name.first.toLowerCase();
         const lastName = list[i].name.last.toLowerCase();
         if (search.length !== 0 && firstName.includes(search) || lastName.includes(search)) {
            resultsArray.push(list[i]);
         }

      }
      showPage(resultsArray, 1);

   })
}

/*
The `showPage` function uses a loop to create and append nine student elements to the current page. When invoked, it is supplied with the arguments
list - which is the full list of students - and page - which represents the current page. Using a for loop, it checks so that there are only
nine students on each page and in the correct order. It then grabs data from each object in the list of students, creates an HTML element stored 
in the studentOnPage variable, and outputs that one element to the DOM tree. This is repeated with each object from the list of students.
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
The `addPagination` function adds all the buttons and their functionality. It first establishes the total number of pages. It then uses a foor 
loop to create and append each button to the DOM tree. Following this the very first button on the page is turned blue. Then, using an event
listener, a conditional checks if an element is clicked that is a button. If so, the one blue button it can find is turned white and the currently
pressed button is turned blue. Last, the showPage function is invoked passing the list of students and the number of the clicked button 
as arguments. This means that only one button is ever active, or blue, and that the correct page is shown when a button is clicked.
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
   }

   document.querySelector('button').className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   })
}


//All functions are called initially when the page is loaded, to add the search box, the students on the first page and the buttons below.
showPage(data, 1);
addPagination(data);
search(data);