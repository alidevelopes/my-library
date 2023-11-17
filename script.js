const bookContainer = document.querySelector(".book-container");
const userFormInput = document.querySelectorAll("form input");
const submitBtn = document.querySelector(".close-modal-btn");
const xmark = document.querySelector(".fa-xmark ");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

const toggleReadBtn = document.createElement("button");
const myLibrary = [];
let readStatus;

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
  if (checkFormValidity()) displayBookCard();
}

function displayBookCard() {
  const latestBookAdded = myLibrary[myLibrary.length - 1];
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  toggleReadBtn.textContent = readStatus;
  toggleReadBtn.addEventListener("click", (e) => {
    toggleReadBtn.classList.toggle("green-read-btn");
    toggleReadBtn.classList.toggle("red-not-read-btn");
    if (e.target.textContent === "Read") {
      e.target.textContent = "Not Read";
    } else e.target.textContent = "Read";
  });
  // add remove button in book
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove Book";
  removeBtn.addEventListener("click", () => {
    let removeBookCard = removeBtn.parentElement;
    bookContainer.removeChild(removeBookCard);
  });
  for (let info in latestBookAdded) {
    const bookDetail = document.createElement("p");
    bookDetail.textContent = latestBookAdded[info];
    bookCard.appendChild(bookDetail);
  }
  bookCard.appendChild(toggleReadBtn);
  bookCard.appendChild(removeBtn);
  bookContainer.appendChild(bookCard);
}

function checkFormValidity() {
  let allInputs = Array.from(userFormInput);
  const checkBox = allInputs[allInputs.length - 1];
  if (checkBox.checked) {
    toggleReadBtn.classList.add("green-read-btn");
    readStatus = "Read";
  } else {
    toggleReadBtn.classList.add("red-not-read-btn");
    readStatus = "Not read yet";
  }
  let isFormValid = false;
  for (let i = 0; i < 3; i++) {
    if (allInputs[i].value === "") {
      isFormValid = false;
      return;
    } else isFormValid = true;
  }
  return isFormValid;
}
