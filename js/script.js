/**
 * Treehouse Techdegree:
 * FSJS Project 2 - Data Pagination and Filtering
 */

/**
 * Show page function - shows the selected page with nine students.
 * @param {object} list - List of students to be paginated.
 * @param {number} page - Page number to be shown.
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

/**
 * Add pagination function - adds all buttons and their functionality.
 * @param {object} list - List of students to be paginated.
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

/**
 * Perform search function - contains the search functionality that is later used.
 * @param {string} search - The entered search term that is passed from an event listener.
 * @param {object} list - List of students to be looped through.
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

/**
 * Search function - creates a search bar and displays it to the page. Adds two event listeners, both invoking the search functionality.
 * @param {object} list - List of students to be compared to the search string using the perform search function.
 */
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

   searchButton.addEventListener('click', (e) => {
      const searchBoxEntry = document.querySelector('#search').value;
      const search = searchBoxEntry.toLowerCase();
      performSearch(search, list);
   })

   searchBox.addEventListener('keyup', (e) => {
      const search = e.target.value.toLowerCase();
      performSearch(search, list);
   })
}

/** All functions are called initially when the page is loaded to add the students on the first page, the buttons and the search box. */
showPage(data, 1);
addPagination(data);
search(data);