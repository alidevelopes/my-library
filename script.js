const bookContainer = document.querySelector(".book-container");
const userFormInput = document.querySelectorAll("form input");
const submitBtn = document.querySelector(".close-modal-btn");
const xmark = document.querySelector(".fa-xmark ");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
let allInputs = Array.from(userFormInput);
const myLibrary = [];

const title = document.getElementById("title");
const author = document.getElementById("author");
const numOfPages = document.getElementById("num-of-pages");
let checkBox = document.getElementById("checkbox");

submitBtn.addEventListener("click", () => addBookToLibrary());
addBtn.addEventListener("click", () => dialog.showModal());
xmark.addEventListener("click", () => dialog.close());

// Book Constructor
function Book(title, author, numOfPages, readStatus) {
  this.title = title.value;
  this.author = author.value;
  this.pages = numOfPages.value;
  this.isBookRead = readStatus.checked;
}

// add book{} to myLibrary[]
function addBookToLibrary() {
  const book = new Book(title, author, numOfPages, checkBox);
  myLibrary.push(book);
  if (checkFormValidity()) displayBookCard();
}

// create and display book card
function displayBookCard() {
  const latestBookAdded = myLibrary[myLibrary.length - 1];
  const bookCard = document.createElement("div");
  const bookCardId = myLibrary.length - 1;
  bookCard.setAttribute("id", bookCardId);
  bookCard.className = "book-card";
  // add remove button in book
  const readStatusBtn = document.createElement("button");
  readStatusBtn.addEventListener("click", () => {
    if (readStatusBtn.textContent === "Read") {
      readStatusBtn.className = "red-not-read-btn";
      readStatusBtn.textContent = "Not read yet";
    } else if (readStatusBtn.textContent !== "Read") {
      readStatusBtn.className = "green-read-btn";
      readStatusBtn.textContent = "Read";
    }
    return;
  });
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove Book";
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(bookCardId, 1);
    let removeBookCard = removeBtn.parentElement;
    bookContainer.removeChild(removeBookCard);
  });

  for (let info in latestBookAdded) {
    const bookDetail = document.createElement("p");
    if (typeof latestBookAdded[info] === "boolean") {
      if (latestBookAdded[info] === true) {
        readStatusBtn.textContent = "Read";
        readStatusBtn.className = "green-read-btn";
      } else {
        readStatusBtn.textContent = "Not read yet";
        readStatusBtn.className = "red-not-read-btn";
      }
    } else bookDetail.textContent = latestBookAdded[info];
    bookCard.appendChild(bookDetail);
  }
  bookCard.appendChild(readStatusBtn);
  bookCard.appendChild(removeBtn);
  bookContainer.appendChild(bookCard);
}

function checkFormValidity() {
  let isFormValid = false;
  for (let i = 0; i < 3; i++) {
    if (allInputs[i].value === "") {
      isFormValid = false;
      return;
    } else isFormValid = true;
  }
  return isFormValid;
}
