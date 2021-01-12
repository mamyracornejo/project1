// Define UI vars
const form = document.querySelector('#comment-form');
const commentList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-comments');
const filter = document.querySelector('#filter');
const commentInput = document.querySelector('#comment');

// Load all event listeners

loadEventListeners();



// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getComments);
  // Add comment event
  form.addEventListener('submit', addComment);
  // Remove comment
  commentList.addEventListener('click', removeComment);
  // Clear comment event
  clearBtn.addEventListener('click', clearComments);
  // Filter comment event
  filter.addEventListener('keyup', filterComments);
  
}

// Get Comments from LS
function getComments() {
  let comments;
  if(localStorage.getItem('comments') === null) {
    comments = [];
  } else {
    comments = JSON.parse(localStorage.getItem('comments'));
  }

  comments.forEach(function(comment) {
  //  Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append tp li
  li.appendChild(document.createTextNode(comment));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-"></i>';
  // Append the link to li
  li.appendChild(link);

 // Append li to ul
  commentList.appendChild(li);

  });
  
  console.log(comments);
}
// Add comment
function addComment(e) {
  if(commentInput.value === '') {
   alert('Add a comment');
  } else {
    // Create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(commentInput.value));
    // Create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    commentList.appendChild(li);
    // Store in LS
    storeCommentInLocalStorage(commentInput.value);
    console.log(li);
    commentInput.value = '';
  }
  e.preventDefault();
}

// Store comment
function storeCommentInLocalStorage(comment) {
  let comments;
  if(localStorage.getItem('comments') === null) {
    comments = [];
  } else {
    comments = JSON.parse(localStorage.getItem('comments'));
  }
  comments.push(comment);

  localStorage.setItem('comments', JSON.stringify(comments));
}

// Remove comment
function removeComment(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
     if(confirm('Are You Sure?')) {
       e.target.parentElement.parentElement.remove();
      //  Remove from Local storage
      removeCommentFromLocalStorage(e.target.parentElement.parentElement);
     }
  }
}
// Remove Comment From LS
function removeCommentFromLocalStorage(commentItem) {
   let comments;
   if(localStorage.getItem('comments') === null) {
    comments = [];
   } else {
     comments = JSON.parse(localStorage.getItem('comments'));
   }

   comments.forEach(function(comment, index) {
    if(commentItem.textContent === comment) {
       comments.splice(index, 1);
    }
   });

   localStorage.setItem('comments', JSON.stringify(comments));
}

// Clear Comments
function clearComments() {
  if(confirm('Are You Sure?')) {
    commentList.innerHTML = '';
    // Clear from LS
    clearCommentsFromLocalStorage();
  }
  
}

// Clear Comments from local storage
function clearCommentsFromLocalStorage() {
  localStorage.clear();
}

// Filter Comments
function filterComments(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = comment.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      comment.style.display = 'block'; 
    } else {
      comment.style.display = 'none';
    }
  });
}