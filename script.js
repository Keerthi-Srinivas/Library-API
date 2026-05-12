const API = "http://localhost:5000/api/books";

let allBooks = []; // store all books

// LOAD BOOKS
async function loadBooks() {
  const res = await fetch(API);
  const data = await res.json();

  allBooks = data; // store globally
  displayBooks(data);
}

// DISPLAY FUNCTION
function displayBooks(data) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  data.forEach(book => {
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${book.title}</b> - ${book.author}
      <br>
      <button onclick="editBook('${book._id}', '${book.title}', '${book.author}')">✏️</button>
      <button onclick="deleteBook('${book._id}')">❌</button>
    `;

    list.appendChild(li);
  });
}

// SEARCH FUNCTION 🔍
function searchBooks() {
  const searchValue = document.getElementById("search").value.toLowerCase();

  const filtered = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchValue)
  );

  displayBooks(filtered);
}

// ADD BOOK
async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const genre = document.getElementById("genre").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      author,
      publishedYear: year,
      genre
    })
  });

  loadBooks();
}

// DELETE
async function deleteBook(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadBooks();
}

// EDIT
async function editBook(id, oldTitle, oldAuthor) {
  const newTitle = prompt("Edit title:", oldTitle);
  const newAuthor = prompt("Edit author:", oldAuthor);

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newTitle,
      author: newAuthor
    })
  });

  loadBooks();
}

loadBooks();