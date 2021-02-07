/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
The `showPage` function uses a loop to create and append nine student elements to the current page. When invoked, it is supplied with the arguments
list - which is the full list of students - and page - which represents the current page. Using a for loop, it checks so that there are only
nine students on each page in the correct order. It then grabs data from each object in the list of students, creates an HTML element stored 
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
The `addPagination` function adds all the buttons and their functionality. It first establishes the total number of pages from the list argument, representing
the full list of students. It then uses a foor loop to create and append each button to the DOM tree. Following this the very first button on the page is turned 
blue. Then, using an event listener, a conditional checks if an element is clicked that is a button. If so, the very first blue button it can find is turned 
white and the currently pressed button is turned blue. Last, the showPage function is called passing the list of students and the number of the clicked button 
as arguments. This means that only one button is ever active, or blue, and that the correct page is shown when the button is clicked.
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


//Both functions are called intially when the page is loaded, to show the students on the first page and the buttons below.
showPage(data, 1);
addPagination(data);