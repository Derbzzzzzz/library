let formsTitle = document.getElementById("title")
let formAuthor = document.getElementById("author")
let formPages = document.getElementById("pages")

window.onload = () => {
    showTitleError();
    showAuthorError();
    showPagesError();
    formsTitle.oninput = showTitleError;
    formAuthor.oninput = showAuthorError;
    formPages.oninput = showPagesError;
};

function showTitleError(){
    console.log(formsTitle.validity.valueMissing)
    if(formsTitle.validity.valueMissing){
        formsTitle.setCustomValidity("Please Enter the Title of the Book");
    } else{
        formsTitle.setCustomValidity("")
    }
}

function showAuthorError(){
    if(formAuthor.validity.valueMissing){
        formAuthor.setCustomValidity("Please Enter the Author's Name");
    } else{
        formAuthor.setCustomValidity("")
    }
}

function showPagesError(){
    if(formPages.validity.valueMissing){
        formPages.setCustomValidity("Please Enter the Number of Pages");
    } else if(formPages.validity.rangeUnderflow){
        formPages.setCustomValidity("Pages Value must be a Positive Integer");
    } else{
        formPages.setCustomValidity("")
    }
}

form.addEventListener("submit", (event) => {
    newBook();
});



let myLibrary = [];

addBook = document.querySelector(".addBook");

submit = document.querySelector(".submit");

formContainer = document.querySelector(".form");

form = document.getElementById("form");

book1 = new Book("Donald Kraybill", "The Amish Way", "257", false);

book2 = new Book("Dr. Seuss", "Green Eggs & Ham", "34", true);

book3 = new Book("Edgar Allen Poe", "The Raven", "16", false);

main = document.querySelector(".main");

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function updateLibrary() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  myLibrary.forEach(function (book, index) {
    card = document.createElement("div");
    card.classList.add("card");

    title = document.createElement("div");
    title.classList.add("title");
    title.textContent = `"${book.title}"`;
    card.appendChild(title);

    author = document.createElement("div");
    author.classList.add("author");
    author.textContent = "By " + book.author;
    card.appendChild(author);

    pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = "You have read " + book.pages + " pages of this book";
    card.appendChild(pages);

    read = document.createElement("div");
    read.classList.add("read");
    if (book.read === false) {
      read.textContent = "Not Read";
    } else {
      read.textContent = "Read";
      read.style.backgroundColor = "Chartreuse";
    }
    card.appendChild(read);

    read.dataset.index = index;

    removeButton = document.createElement("div");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "Remove";

    removeButton.dataset.index = index;

    card.appendChild(removeButton);

    main.appendChild(card);

    // console.log(card);
  });
  updateButtons();
}

addBook.addEventListener("click", function () {
  formContainer.classList.toggle("displayNone");
  addBook.classList.toggle("displayNone");
});

function newBook() {
  bookx = new Book(
    document.getElementById("author").value,
    document.getElementById("title").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );
  addBookToLibrary(bookx);
  updateLibrary();
  formContainer.classList.toggle("displayNone");
  addBook.classList.toggle("displayNone");
}

updateLibrary();

removeButtons = document.querySelectorAll(".removeButton");

function updateButtons() {
  removeButtons = document.querySelectorAll(".removeButton");

  readButtons = document.querySelectorAll(".read");

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      console.log(button.getAttribute("data-index"));
      myLibrary.splice(button.getAttribute("data-index"), 1);
      updateLibrary();
    });
  });

  readButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.textContent == "Not Read") {
        button.textContent = "Read";
        button.style.backgroundColor = "Chartreuse";
        myLibrary[button.getAttribute("data-index")].read = true;
      } else {
        button.textContent = "Not Read";
        button.style.backgroundColor = "red";
        myLibrary[button.getAttribute("data-index")].read = false;
      }
    });
  });
}

readButtons = document.querySelectorAll(".read");
