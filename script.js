const bookContainer = document.querySelector(".book-container");
const submitBtn = document.querySelector(".close-modal-btn");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const xmark = document.querySelector(".fa-xmark ");
const form = document.querySelector("form");
const userFormInput = document.querySelectorAll("form input");
// const allInputs = Array.from(userFormInput);
// const checkBox = allInputs[allInputs.length - 1];

// storing all book objects in myLibrary array
const myLibrary = [];

const title = document.getElementById("title");
const author = document.getElementById("author");
const numOfPages = document.getElementById("num-of-pages");

submitBtn.addEventListener("click", () => addBookToLibrary());
addBtn.addEventListener("click", () => dialog.showModal());
xmark.addEventListener("click", () => dialog.close());

// Book Constructor
function Book(title, author, numOfPages) {
  this.title = title.value;
  this.author = author.value;
  this.pages = numOfPages.value;
}

function addBookToLibrary() {
  const book = new Book(title, author, numOfPages);
  myLibrary.push(book);
  // alert(checkBox.checked);
  if (checkFormValidity()) displayBookCard();
}

function displayBookCard() {
  const latestBookAdded = myLibrary[myLibrary.length - 1];
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove Book";
  removeBtn.addEventListener("click", () => {
    let removeBookCard = removeBtn.parentElement;
    bookContainer.removeChild(removeBookCard);
  });
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  for (let info in latestBookAdded) {
    const bookDetail = document.createElement("p");
    bookDetail.textContent = latestBookAdded[info];
    bookCard.appendChild(bookDetail);
  }
  bookCard.appendChild(removeBtn);
  bookContainer.appendChild(bookCard);
}

function checkFormValidity() {
  let allInputs = Array.from(userFormInput);
  let isFormValid = false;
  for (let i = 0; i < 3; i++) {
    if (allInputs[i].value === "") {
      isFormValid = false;
      return;
    } else isFormValid = true;
  }
  return isFormValid;
}
